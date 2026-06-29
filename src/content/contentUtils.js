export function cloneContent(content) {
  return JSON.parse(JSON.stringify(content))
}

export function mergeContent(defaultContent, remoteContent) {
  if (!remoteContent || typeof remoteContent !== 'object') {
    return cloneContent(defaultContent)
  }

  if (Array.isArray(defaultContent)) {
    return Array.isArray(remoteContent) ? remoteContent : cloneContent(defaultContent)
  }

  return Object.entries(defaultContent).reduce((merged, [key, value]) => {
    if (Array.isArray(value)) {
      merged[key] = Array.isArray(remoteContent[key]) ? remoteContent[key] : cloneContent(value)
      return merged
    }

    if (value && typeof value === 'object') {
      merged[key] = mergeContent(value, remoteContent[key])
      return merged
    }

    merged[key] = remoteContent[key] ?? value
    return merged
  }, {})
}

export function getContentValue(content, path) {
  return path.split('.').reduce((current, segment) => {
    if (current == null) {
      return ''
    }

    return current[segment]
  }, content)
}

export function setContentValue(content, path, value) {
  const nextContent = cloneContent(content)
  const segments = path.split('.')
  let current = nextContent

  segments.slice(0, -1).forEach((segment, index) => {
    if (current[segment] == null) {
      const nextSegment = segments[index + 1]
      current[segment] = Number.isInteger(Number(nextSegment)) ? [] : {}
    }

    current = current[segment]
  })

  current[segments[segments.length - 1]] = value
  return nextContent
}
