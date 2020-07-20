import CRadioGroup from './CRadioGroup'

// 支持按需引用
CRadioGroup.install = function (Vue) {
    Vue.component(CRadioGroup.name, CRadioGroup);
};

export default CRadioGroup;
