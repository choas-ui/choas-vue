import CSelection from './CSelection'

// 支持按需引用
CSelection.install = function (Vue) {
    Vue.component(CSelection.name, CSelection);
};

export default CSelection;
