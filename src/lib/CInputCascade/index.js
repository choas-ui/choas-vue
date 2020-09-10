import CInputCascade from './CInputCascade'

// 支持按需引用
CInputCascade.install = function (Vue) {
    Vue.component(CInputCascade.name, CInputCascade);
};

export default CInputCascade;
