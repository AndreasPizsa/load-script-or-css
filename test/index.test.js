const test = require('ava')
const {createElement, promiseForElementLoad, loadScript, loadCss} = require('.')

global.document = {
  createElement() {
    const elementAttributes = {}
    const listeners = {}
    return {
      setAttribute(name, value) {
        elementAttributes[name] = value
      },
      getAttribute: name => elementAttributes[name],
      addEventListener(event, handler) {
        listeners[event] = handler
      }
    }
  },
  head: {
    append: () => true
  }
}

test('createElement', t => {
  const attributes = Array.from({length: randomInteger(20) * 2}, randomString)
  const tag = randomString()
  const element = createElement(tag, attributes)

  attributes
    .forEach((attr, index, array) => index % 2 === 0 && t.is(element.getAttribute(attr), array[index + 1]))
})

test('promiseForElementLoad', async t => {
  const createElement = () => {
    const listeners = {}
    return {
      addEventListener(event, handler) {
        listeners[event] = handler
      },
      triggerEvent(event) {
        listeners[event]()
      }
    }
  }

  const successElement = createElement()
  const errorElement = createElement()

  const promises = Promise.all([
    promiseForElementLoad(successElement).then(() => {}),
    promiseForElementLoad(errorElement).catch(() => {})
  ])
  successElement.triggerEvent('load')
  errorElement.triggerEvent('error')
  await promises
  t.pass()
})

test('loadScript and loadCss', t => {
  t.notThrows(() => loadScript('https://www.example.com/'))
  t.notThrows(() => loadCss('https://www.example.com/'))
})

const randomString = () => Math.random().toString(36).slice(2)
const randomInteger = (max = Number.MAX_SAFE_INTEGER, min = 0) => Math.floor(min + (Math.random() * (max - min + 1)))
