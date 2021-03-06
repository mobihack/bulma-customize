const formatList = list => {
  const listPlugin = [].concat(list)

  // Insert Tooltip if not present and Popover is needed
  if (listPlugin.indexOf('popover') !== -1 && listPlugin.indexOf('tooltip') === -1) {
    const popoverIndex = listPlugin.indexOf('popover')
    listPlugin.splice(popoverIndex, 0, 'tooltip')
  }

  // Tooltip present and Popover present, Tooltip comes first
  const popoverIndex = listPlugin.indexOf('popover')
  const tooltipIndex = listPlugin.indexOf('tooltip')
  if (
    (popoverIndex !== -1 && tooltipIndex !== -1) &&
    popoverIndex < tooltipIndex
  ) {
    listPlugin.splice(tooltipIndex, 1)
    listPlugin.splice(popoverIndex, 0, 'tooltip')
  }

  return listPlugin
}

const uniqArray = array => array.filter((elem, pos, arr) => arr.indexOf(elem) === pos)

const getSassWorkerPath = () => {
  const bsCustomizer = 'bulma-customize'
  const location = window.location
  let origin = location.origin

  if (!origin) {
    const port = location.port ? `:${location.port}` : ''

    origin = `${location.protocol}//${location.hostname}${port}`
  }

  const indexPath = location.pathname
    .split('/')
    .indexOf(bsCustomizer)

  const bsCustomizerPath = indexPath !== -1 ? `/${bsCustomizer}/` : '/'

  return `${origin}${bsCustomizerPath}dist/sass.worker.js`
}

const supportedBrowser = () => {
  const supportBlob = 'Blob' in window
  const supportPromise = 'Promise' in window
  const supportArrayFindIndex = Boolean(Array.prototype.findIndex)

  return supportBlob && supportArrayFindIndex && supportPromise
}

export {
  formatList,
  uniqArray,
  getSassWorkerPath,
  supportedBrowser
}
