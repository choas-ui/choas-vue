import CModal from './Modal'
import CTreeModal from "../TreeModal/TreeModal";

// 支持按需引用
CModal.install = function (Vue) {
    Vue.component('C'+CModal.name, CModal);
};

export default CModal;
