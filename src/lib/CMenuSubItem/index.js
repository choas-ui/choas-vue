import CMenuSubItem from './CMenuSubItem'

// 支持按需引用
CMenuSubItem.install = function (Vue) {
    Vue.component(CMenuSubItem.name, CMenuSubItem);
};

export default CMenuSubItem;
