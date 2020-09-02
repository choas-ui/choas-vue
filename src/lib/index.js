import Vue from 'vue'
import CButton from './CButton'
import CButtonGroup from './CButtonGroup'
import CCascade from './CCascade'
import CCheckbox from "./CCheckbox";
import CCheckboxGroup from "./CCheckboxGroup";
import CDatePicker from "./CDatePicker";
import CIcon from './CIcon'
import CInput from './CInput'
import CInputTreeModal from './CInputTreeModal'
import CModal from './CModal'
import CProgress from './CProgress'
import CPrompt from "./CPrompt/CPrompt";
import CQuickSearchBox from "./CQuickSearchBox/CQuickSearchBox";
import CRadio from './CRadio'
import CRadioGroup from './CRadioGroup'
import CSelection from './CSelection'
import CTag from './CTag'
import CTree from './CTree'
import CTreeModal from './CTreeModal'

import cMessage from './CMessage'




const components = [
    CButton,
    CButtonGroup,
    CCascade,
    CCheckbox,
    CCheckboxGroup,
    CDatePicker,
    CIcon,
    CInput,
    CInputTreeModal,
    CModal,
    CProgress,
    CPrompt,
    CQuickSearchBox,
    CRadio,
    CRadioGroup,
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
Vue.prototype.$cMessage = cMessage;

export default {
    install,
    CButton,
    CButtonGroup,
    CCascade,
    CCheckbox,
    CCheckboxGroup,
    CDatePicker,
    CIcon,
    CInput,
    CInputTreeModal,
    CModal,
    CProgress,
    CPrompt,
    CQuickSearchBox,
    CRadio,
    CRadioGroup,
    CSelection,
    CTag,
    CTree,
    CTreeModal
}
