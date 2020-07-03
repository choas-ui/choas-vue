import Modal from './Modal'

// 支持按需引用
Modal.install = function (Vue) {
    Vue.component(Modal.name, Modal);
};

export default Modal;
