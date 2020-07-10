import CButton from './Cascade'
import CacscadeItem from './CascadeItem'

// 支持按需引用
CButton.install = function (Vue) {
    Vue.component(CButton.name, CButton);
};
CacscadeItem.install = function (Vue) {
    Vue.component(CacscadeItem.name, CacscadeItem);
};

export default CButton;
