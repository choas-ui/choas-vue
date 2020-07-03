import Button from './Button'

// 支持按需引用
Button.install = function (Vue) {
    Vue.component(Button.name, Button);
};

export default Button;
