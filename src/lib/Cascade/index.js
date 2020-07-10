import CButton from './Cascade'
import CacscadeItem from './CascadeItem'
import CTreeModal from "../TreeModal/TreeModal";

// 支持按需引用
CButton.install = function (Vue) {
    Vue.component('C'+CButton.name, CButton);
};
CacscadeItem.install = function (Vue) {
    Vue.component('C'+CacscadeItem.name, CacscadeItem);
};

export default CButton;
