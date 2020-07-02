import HelloWorld from './HelloWorld'

const components = [
    HelloWorld
];

const install = function (Vue) {
    if (install.installed) return;
    components.map(component => Vue.component(component.name, component));
};

if (typeof window.Vue !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    HelloWorld
}