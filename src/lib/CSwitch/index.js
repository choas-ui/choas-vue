import CSwitch from './CSwitch'

// 支持按需引用
CSwitch.install = function (Vue) {
    Vue.component(CSwitch.name, CSwitch);
};

export default CSwitch;
