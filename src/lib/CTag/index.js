import CTag from './CTag'

// 支持按需引用
CTag.install = function (Vue) {
    Vue.component(CTag.name, CTag);
};

export default CTag;
