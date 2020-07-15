import CProgress from './CProgress'

// 支持按需引用
CProgress.install = function (Vue) {
    Vue.component(CProgress.name, CProgress);
};

export default CProgress;
