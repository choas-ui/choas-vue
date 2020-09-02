import CQuickSearchBox from './CQuickSearchBox'

// 支持按需引用
CQuickSearchBox.install = function (Vue) {
    Vue.component(CQuickSearchBox.name, CQuickSearchBox);
};

export default CQuickSearchBox;
