import Selection from './Selection'

// 支持按需引用
Selection.install = function (Vue) {
    Vue.component(Selection.name, Selection);
};

export default Selection;
