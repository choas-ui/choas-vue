import CRadio from './CRadio'

// 支持按需引用
CRadio.install = function (Vue) {
    Vue.component(CRadio.name, CRadio);
};

export default CRadio;
