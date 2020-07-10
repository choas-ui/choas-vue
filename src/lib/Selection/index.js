import CSelection from './Selection'
import CTreeModal from "../TreeModal/TreeModal";

// 支持按需引用
CSelection.install = function (Vue) {
    Vue.component('C'+CSelection.name, CSelection);
};

export default CSelection;
