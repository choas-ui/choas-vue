import CMenuItemGroup from './CMenuItemGroup'

// 支持按需引用
CMenuItemGroup.install = function (Vue) {
    Vue.component(CMenuItemGroup.name, CMenuItemGroup);
};

export default CMenuItemGroup;
