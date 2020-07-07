import Cascade from './Cascade'

// 支持按需引用
Cascade.install = function (Vue) {
    Vue.component(Cascade.name, Cascade);
};

export default Cascade;
