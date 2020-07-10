import CModal from './CModal'

// 支持按需引用
CModal.install = function (Vue) {
    Vue.component(CModal.name, CModal);
};

export default CModal;
