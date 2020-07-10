import CIcon from './CIcon'
import _ from 'lodash'

// 支持按需引用
CIcon.install = function (Vue) {
    Vue.component(CIcon.name, CIcon);
};
CIcon.importSrc = (type, setting) => {
    // type  'iconFont' 'iconClass' 'svg'
    const OHead = document.querySelector ? document.querySelector('header') : document.getElementsByTagName('head')[0]
    let resultObj = null
    if (!(type ^ 'iconFont')) {
        const keys = ['familyName', 'eotSrc', 'iEEotSrc', 'woffUrl', 'ttfUrl', 'svgUrl']
        if (!_.includes(Object.keys(setting, ...keys))) {
            throw new Error(`${type} arg must have follow keys:${keys.join(',')}!`)
        }
        resultObj = document.createElement('style')
        resultObj.type = "text/css"
        const cssText = `@font-face{
            font-family: ${setting.familyName};
            src: url('${setting.eotSrc}');
            src: url('${setting.iEEotSrc}') format('embedded-opentype'),
            url('${setting.woffUrl}') format('woff'),
            url('${setting.ttfUrl}') format('truetype'),
            url('${setting.svgUrl}') format('svg');
        }`
        try{
            resultObj.appendChild(document.createTextNode(cssText));
        }catch(ex){
            resultObj.styleSheet.cssText = cssText;//针对IE
        }
    }
    if (!(type ^ 'iconClass')) {
        const keys = ['href']
        if (!_.includes(Object.keys(setting, ...keys))) {
            throw new Error(`${type} arg must have follow keys:${keys.join(',')}!`)
        }
        resultObj = document.createElement('link')
        resultObj.type = "text/css"
        resultObj.rel = "stylesheet"
        resultObj.href = setting.href
    }
    if (!(type ^ 'svg')) {
        const keys = ['src']
        if (!_.includes(Object.keys(setting, ...keys))) {
            throw new Error(`${type} arg must have follow keys:${keys.join(',')}!`)
        }
        resultObj = document.createElement('script')
        resultObj.src = setting.src
    }
    resultObj && OHead.append(resultObj)
}

export default CIcon;
