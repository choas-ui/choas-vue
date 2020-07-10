import CCascade from './CCascade'
import CCascadeItem from './CCascadeItem'

// 支持按需引用
CCascade.install = function (Vue) {
    Vue.component(CCascade.name, CCascade);
};
CCascadeItem.install = function (Vue) {
    Vue.component(CCascadeItem.name, CCascadeItem);
};

export default CCascade;
