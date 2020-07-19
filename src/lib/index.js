import CButton from './CButton'
import CButtonGroup from './CButtonGroup'
import CCascade from './CCascade'
import CCheckbox from "./CCheckbox";
import CCheckboxGroup from "./CCheckboxGroup";
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
    CButtonGroup,
    CCascade,
    CCheckbox,
    CCheckboxGroup,
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
    CCheckbox,
    CCheckboxGroup,
    CIcon,
    CInputTreeModal,
    CModal,
    CSelection,
    CTree,
    CTreeModal
}
