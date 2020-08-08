import CDatePicker from './CDatePicker'

// 支持按需引用
CDatePicker.install = function (Vue) {
    Vue.component(CDatePicker.name, CDatePicker);
};

export default CDatePicker;
