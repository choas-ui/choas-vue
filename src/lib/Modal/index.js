import CModal from './Modal'

// 支持按需引用
CModal.install = function (Vue) {
    Vue.component(CModal.name, CModal);
};

export default CModal;
