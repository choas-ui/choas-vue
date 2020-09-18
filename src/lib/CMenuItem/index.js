import CMenuItem from './CMenuItem'

// 支持按需引用
CMenuItem.install = function (Vue) {
    Vue.component(CMenuItem.name, CMenuItem);
};

export default CMenuItem;
