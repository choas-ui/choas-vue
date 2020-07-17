import CCheckbox from './CCheckbox'

// 支持按需引用
CCheckbox.install = function (Vue) {
    Vue.component(CCheckbox.name, CCheckbox);
};

export default CCheckbox;
