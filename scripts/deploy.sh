#!/bin/bash

# Script de déploiement sécurisé pour TMG — copie dist/ sans toucher content/

set -e  # Exit si erreur

# Couleurs pour terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Charger la config de déploiement
# Usage : ./scripts/deploy.sh              → utilise .deployrc (site de secours)
#         ./scripts/deploy.sh .deployrc.prod → utilise .deployrc.prod (production)
CONFIG_FILE="${1:-.deployrc}"

if [ ! -f "$CONFIG_FILE" ]; then
  echo -e "${RED}❌ Erreur: fichier $CONFIG_FILE introuvable${NC}"
  echo -e "${YELLOW}Crée-le à partir de .deployrc.example :${NC}"
  echo "  cp .deployrc.example $CONFIG_FILE"
  echo "  Puis édite $CONFIG_FILE avec tes identifiants SiteGround"
  exit 1
fi

echo -e "${YELLOW}⚙️  Config: $CONFIG_FILE${NC}"
source "$CONFIG_FILE"

# Vérifier que les variables nécessaires sont définies
if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_PATH" ]; then
  echo -e "${RED}❌ Erreur: vérifie les variables dans .deployrc${NC}"
  echo "   DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH doivent être définis"
  exit 1
fi

DEPLOY_PORT="${DEPLOY_PORT:-22}"
DEPLOY_KEY_PATH="${DEPLOY_KEY_PATH:-$HOME/.ssh/id_ed25519}"

# Construire la commande SSH selon la méthode d'authentification
if [ -n "$DEPLOY_PASSPHRASE" ]; then
  # Clé SSH protégée par passphrase (sshpass répond au prompt "passphrase")
  export SSHPASS="$DEPLOY_PASSPHRASE"
  SSH_CMD="sshpass -e -P passphrase ssh -i $DEPLOY_KEY_PATH -p $DEPLOY_PORT -o StrictHostKeyChecking=accept-new"
elif [ -n "$DEPLOY_PASSWORD" ]; then
  # Mot de passe SSH classique
  export SSHPASS="$DEPLOY_PASSWORD"
  SSH_CMD="sshpass -e ssh -p $DEPLOY_PORT -o StrictHostKeyChecking=accept-new"
else
  # Clé SSH sans passphrase
  SSH_CMD="ssh -i $DEPLOY_KEY_PATH -p $DEPLOY_PORT -o StrictHostKeyChecking=accept-new"
fi

# Vérifier que sshpass est installé si nécessaire
if [[ "$SSH_CMD" == sshpass* ]] && ! command -v sshpass >/dev/null 2>&1; then
  echo -e "${RED}❌ Erreur: sshpass n'est pas installé${NC}"
  echo "   Installe-le avec: sudo apt-get install sshpass"
  exit 1
fi

echo -e "${YELLOW}📦 Déploiement de TMG${NC}"
echo "   Host: $DEPLOY_HOST"
echo "   User: $DEPLOY_USER"
echo "   Port: $DEPLOY_PORT"
echo "   Path: $DEPLOY_PATH"
echo ""

# Vérifier que dist/ existe
if [ ! -d "dist" ]; then
  echo -e "${RED}❌ Erreur: dossier dist/ introuvable${NC}"
  echo "   Lance d'abord: npm run build"
  exit 1
fi

# Vérification du contenu admin en prod (informatif, non bloquant)
echo -e "${YELLOW}📋 Vérification du contenu admin en prod...${NC}"
$SSH_CMD "$DEPLOY_USER@$DEPLOY_HOST" \
  "ls -lh $DEPLOY_PATH/content/site-content.json 2>/dev/null || echo 'content/site-content.json absent en prod'" \
  || echo -e "${YELLOW}⚠️  Vérification impossible, on continue quand même${NC}"

# Déployer avec rsync — les données serveur (contenu admin, comptes partenaires,
# config admin) sont exclues : jamais uploadées, jamais supprimées
echo -e "${YELLOW}⬆️  Upload des fichiers (rsync)...${NC}"
rsync -avz -e "$SSH_CMD" \
  --exclude='content/' \
  --exclude='api/private/' \
  --exclude='api/admin-config.php' \
  --exclude='api/anthropic-config.php' \
  --exclude='api/gemini-config.php' \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.env' \
  --delete-during \
  dist/ \
  "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

# Déduire l'URL du site déployé depuis le chemin (ex. .../www/mon-site.com/public_html)
SITE_DOMAIN=$(basename "$(dirname "$DEPLOY_PATH")")

echo -e "${GREEN}✅ Déploiement réussi !${NC}"
echo ""
echo "   Site: https://$SITE_DOMAIN"
echo "   Admin: https://$SITE_DOMAIN/admin"
echo ""
echo -e "${YELLOW}ℹ️  Contenu du site (content/site-content.json) préservé${NC}"
