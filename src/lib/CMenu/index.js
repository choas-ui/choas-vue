import CMenu from './CMenu'

// 支持按需引用
CMenu.install = function (Vue) {
    Vue.component(CMenu.name, CMenu);
};

export default CMenu;
