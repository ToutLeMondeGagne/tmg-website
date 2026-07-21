export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || ''

export function createPartnerCalendlyUrl(partner) {
  if (!CALENDLY_URL) {
    return ''
  }

  try {
    const url = new URL(CALENDLY_URL)

    if (partner?.company) {
      url.searchParams.set('name', partner.company)
    }

    if (partner?.email) {
      url.searchParams.set('email', partner.email)
    }

    url.searchParams.set('hide_gdpr_banner', '1')

    return url.toString()
  } catch {
    return CALENDLY_URL
  }
}
