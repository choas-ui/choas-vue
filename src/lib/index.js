import CButton from './Button'
import CCascade from './Cascade'
import CIcon from './Icon'
import CInputTreeModal from './InputTreeModal'
import CModal from './Modal'
import CSelection from './Selection'
import CTree from './Tree'
import CTreeModal from './TreeModal'




const components = [
    CButton,
    CCascade,
    CIcon,
    CInputTreeModal,
    CModal,
    CSelection,
    CTree,
    CTreeModal
];

const install = function (Vue) {
    if (install.installed) return;
    components.map(component => Vue.component('C'+component.name, component));
};

if (typeof window.Vue !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    CButton,
    CCascade,
    CIcon,
    CInputTreeModal,
    CModal,
    CSelection,
    CTree,
    CTreeModal
}
