import CButtonGroup from './CButtonGroup'

// 支持按需引用
CButtonGroup.install = function (Vue) {
    Vue.component(CButtonGroup.name, CButtonGroup);
};

export default CButtonGroup;
