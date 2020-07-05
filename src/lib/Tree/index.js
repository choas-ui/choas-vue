import Tree from './Tree'

// 支持按需引用
Tree.install = function (Vue) {
    Vue.component(Tree.name, Tree);
};

export default Tree;
