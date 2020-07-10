import CButton from './Button'
import CTreeModal from "../TreeModal/TreeModal";

// 支持按需引用
CButton.install = function (Vue) {
    Vue.component('C'+CButton.name, CButton);
};

export default CButton;
