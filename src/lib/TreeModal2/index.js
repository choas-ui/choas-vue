import TreeModal from './TreeModal'

// 支持按需引用
TreeModal.install = function (Vue) {
    Vue.component(TreeModal.name, TreeModal);
};

export default TreeModal;
