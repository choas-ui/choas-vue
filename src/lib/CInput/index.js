import CInput from './CInput'

// 支持按需引用
CInput.install = function (Vue) {
    Vue.component(CInput.name, CInput);
};

export default CInput;
