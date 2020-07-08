import InputTreeModal from './InputTreeModal'

// 支持按需引用
InputTreeModal.install = function (Vue) {
    Vue.component(InputTreeModal.name, InputTreeModal);
};

export default InputTreeModal;
