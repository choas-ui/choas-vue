import CCascade from './CCascade'

// 支持按需引用
CCascade.install = function (Vue) {
    Vue.component(CCascade.name, CCascade);
};

export default CCascade;
