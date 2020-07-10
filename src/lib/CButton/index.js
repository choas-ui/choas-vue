import CButton from './CButton'
import CTreeModal from "../CTreeModal/CTreeModal";

// 支持按需引用
CButton.install = function (Vue) {
    Vue.component(CButton.name, CButton);
};

export default CButton;
