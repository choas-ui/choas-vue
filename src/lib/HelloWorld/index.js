import HelloWorld from './HelloWorld'

// 支持按需引用
HelloWorld.install = function (Vue) {
    Vue.component(HelloWorld.name, HelloWorld);
};

export default HelloWorld;