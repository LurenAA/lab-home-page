// 用来多行显示省略号
// element，选择器字符串或者元素
// options: {
//   clamp: 行数或者px,
//   tail: 默认...，
//   tailHtml： ,
//   useNative: 使用wekit的非标准css特性，但是无法添加tailHtml,
//   lang: En / Ch
// }
// 只能用于元素内部直接是文字的,不能有内嵌标签

(function() {
  function clamp (element, options) {
    let target = element
    typeof element === 'string' &&  (target = document.querySelector(element))
    let nodeValue = target.lastChild.nodeValue
    if(!target.style || !nodeValue || target.lastChild.nodeType !== 3) {
      warn('need a element or a selector in first param and ...')
      return 
    }
    options = {
      clamp: options.clamp || 2,
      tail: options.tail || '...',
      tailHtml: options.tailHtml,
      useNative: options.useNative || false,
      lang: options.lang || 'En'
    }
    if(options.useNative && target.style.webkitLineClamp !== undefined) {
      target.classList.add(`wekit-clamp-native-${options.clamp}`)
      return 
    }
    options = Object.assign({},options, getElementInfo(target))
    let result = computeWords(options, nodeValue)
    target.innerHTML = result
  }

  function computeWords(options, nodeValue) {
    let oneWid = options.lang === 'En' ? options.fontSize / 2 : options.fontSize+ options.letterSpacing
    let rows
    rows = typeof options.clamp === 'string' ? 
    Math.max(Math.floor(parseFloat(options.clamp) / options.lineHeight) , 0) : options.clamp
    let reg = /(?<=<[^>]*>)[^<]*(?=<[^>]*>)/i
    let tailHtml = reg.exec(options.tailHtml)[0]
    let wordsNum = Math.floor(rows * options.width / oneWid - 
      options.textIndent / options.fontSize  - tailHtml.length - options.tail.length / 2)
    return nodeValue.substring(0, wordsNum) + options.tail + options.tailHtml
  }
  
  function warn(info){
    console.error(`[clamp warn]: ${info}`)
  }

  function getElementInfo(target) {
    let compStyle = window.getComputedStyle(target)
    let result = {}
    result.letterSpacing = parseFloat(compStyle.getPropertyValue('letter-spacing'))
    result.fontSize = parseFloat(compStyle.getPropertyValue('font-size'))
    result.lineHeight = parseFloat(compStyle.getPropertyValue('line-height'))
    result.textIndent = parseFloat(compStyle.getPropertyValue('text-indent'))
    result.width = target.clientWidth
    if(isNaN(result.letterSpacing)) {
      result.letterSpacing = 0
    }
    if(isNaN(result.lineHeight)) {
      result.lineHeight = 1.2 * result.fontSize
    }
    return result
  }

  window.$clamp = clamp
})()