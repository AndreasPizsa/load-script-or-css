const arrayToPairs = array => array.reduce((result, keyOrValue, index) => {
  const isKey = index % 2 === 0
  if (isKey) {
    return [...result, [keyOrValue, undefined]]
  }

  result[result.length - 1][1] = keyOrValue
  return result
}, [])

const createElement = (tag, attrs, {create = tag => document.createElement(tag)} = {}) => {
  const element = create(tag)
  arrayToPairs(attrs)
    .forEach(([attr, value]) => element.setAttribute(attr, value))
  return element
}

const promiseForElementLoad = element => new Promise((resolve, reject) => {
  element.addEventListener('load', resolve)
  element.addEventListener('error', reject)
})

const createElementAndAppendTo = (target, tag, ...attrs) => {
  const element = createElement(tag, attrs)
  // Be sure to add the event listeners before actually appending, because
  // appending triggers loading. If we would add the event listeners _after_
  // appending the element, the scripts _might_ theoretically be appended
  // before the listeners were attached, thus the listerens would never trigger
  const promise = promiseForElementLoad(element)
  target.append(element)
  promise.dontThrow = () => promise.catch(error => error)
  return promise
}

const loadCss = path => createElementAndAppendTo(
  document.head,
  'link',
  'rel', 'stylesheet',
  'href', path
)

const loadScript = path => createElementAndAppendTo(
  document.head,
  'script',
  'src', path
)

module.exports = {
  loadCss,
  loadScript,

  arrayToPairs,
  createElement,
  promiseForElementLoad
}
