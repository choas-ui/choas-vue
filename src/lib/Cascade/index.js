import Cascade from './Cascade'
import CacscadeItem from './CascadeItem'

// 支持按需引用
Cascade.install = function (Vue) {
    Vue.component(Cascade.name, Cascade);
};
CacscadeItem.install = function (Vue) {
    Vue.component(CacscadeItem.name, CacscadeItem);
};

export default Cascade;
