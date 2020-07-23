import CTree from './CTree'

// 支持按需引用
CTree.install = function (Vue) {
    Vue.component(CTree.name, CTree);
};

export default CTree;
