import Icon from './Icon'

// 支持按需引用
Icon.install = function (Vue) {
    Vue.component(Icon.name, Icon);
};

export default Icon;
