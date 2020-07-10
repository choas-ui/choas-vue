import CInputTreeModal from './InputTreeModal'
import CTreeModal from "../TreeModal/TreeModal";

// 支持按需引用
CInputTreeModal.install = function (Vue) {
    Vue.component('C'+CInputTreeModal.name, CInputTreeModal);
};

export default CInputTreeModal;
