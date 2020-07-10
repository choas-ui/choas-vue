import CButton from './Button'

// 支持按需引用
CButton.install = function (Vue) {
    Vue.component(CButton.name, CButton);
};

export default CButton;
