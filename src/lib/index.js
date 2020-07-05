import TreeModal from './TreeModal'
import Modal from './Modal'
import Button from './Button'
import Icon from './Icon'
import Tree from './Tree'

const components = [
    Icon,
    Button,
    Modal,
    Tree,
    TreeModal
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
    TreeModal
}
