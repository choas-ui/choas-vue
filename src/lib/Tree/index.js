import CTree from './Tree'
import CTreeModal from "../TreeModal/TreeModal";

// 支持按需引用
CTree.install = function (Vue) {
    Vue.component('C'+CTree.name, CTree);
};

export default CTree;
