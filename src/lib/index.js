import CButton from './CButton'
import CCascade from './CCascade'
import CIcon from './CIcon'
import CInputTreeModal from './CInputTreeModal'
import CModal from './CModal'
import CProgress from './CProgress'
import CSelection from './CSelection'
import CTag from './CTag'
import CTree from './CTree'
import CTreeModal from './CTreeModal'




const components = [
    CButton,
    CCascade,
    CIcon,
    CInputTreeModal,
    CModal,
    CProgress,
    CSelection,
    CTag,
    CTree,
    CTreeModal
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
    CButton,
    CCascade,
    CIcon,
    CInputTreeModal,
    CModal,
    CSelection,
    CTree,
    CTreeModal
}
