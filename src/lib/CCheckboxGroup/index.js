import CCheckboxGroup from './CCheckboxGroup'

// 支持按需引用
CCheckboxGroup.install = function (Vue) {
    Vue.component(CCheckboxGroup.name, CCheckboxGroup);
};

export default CCheckboxGroup;
