import CInputTreeModal from './CInputTreeModal'

// 支持按需引用
CInputTreeModal.install = function (Vue) {
    Vue.component(CInputTreeModal.name, CInputTreeModal);
};

export default CInputTreeModal;
