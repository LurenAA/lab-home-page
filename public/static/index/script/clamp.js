// 用来多行显示省略号
// element，选择器字符串或者元素
// options: {
//   clamp: 行数或者css长度,
//   tail: 默认...，
//   tailHtml： ,
//   useNative: 使用wekit的非标准css特性，但是无法添加tailHtml
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
      useNative: options.useNative || false
    }
    if(options.useNative && target.style.webkitLineClamp !== undefined) {
      target.classList.add(`wekit-clamp-native-${options.clamp}`)
      return 
    }
    let info = getElementInfo(target)
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