import Button from './Button'
import Cascade from './Cascade'
import Icon from './Icon'
import InputTreeModal from './InputTreeModal'
import Modal from './Modal'
import Selection from './Selection'
import Tree from './Tree'
import TreeModal from './TreeModal'




const components = [
    Button,
    Cascade,
    Icon,
    InputTreeModal,
    Modal,
    Selection,
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
