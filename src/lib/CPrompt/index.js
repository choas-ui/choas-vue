import CPrompt from './CPrompt'

// 支持按需引用
CPrompt.install = function (Vue) {
    Vue.component(CPrompt.name, CPrompt);
};

export default CPrompt;
