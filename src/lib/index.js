import Vue from 'vue'
import CButton from './CButton'
import CButtonGroup from './CButtonGroup'
import CCascade from './CCascade'
import CCheckbox from "./CCheckbox";
import CCheckboxGroup from "./CCheckboxGroup";
import CDatePicker from "./CDatePicker";
import CDropdown from "./CDropdown";
import CIcon from './CIcon'
import CInput from './CInput'
import CInputTreeModal from './CInputTreeModal'
import CMenu from './CMenu'
import CMenuItem from './CMenuItem'
import CMenuItemGroup from './CMenuItemGroup'
import CMenuSubItem from './CMenuSubItem'
import CModal from './CModal'
import CProgress from './CProgress'
import CPrompt from "./CPrompt/CPrompt";
import CQuickSearchBox from "./CQuickSearchBox";
import CRadio from './CRadio'
import CRadioGroup from './CRadioGroup'
import CSelection from './CSelection'
import CSwitch from './CSwitch'
import CTag from './CTag'
import CTree from './CTree'
import CTreeModal from './CTreeModal'

import cMessage from './CMessage'
import CInputCascade from "./CInputCascade/CInputCascade";




const components = [
    CButton,
    CButtonGroup,
    CCascade,
    CCheckbox,
    CCheckboxGroup,
    CDatePicker,
    CDropdown,
    CIcon,
    CInput,
    CInputCascade,
    CInputTreeModal,
    CMenu,
    CMenuItem,
    CMenuItemGroup,
    CMenuSubItem,
    CModal,
    CProgress,
    CPrompt,
    CQuickSearchBox,
    CRadio,
    CRadioGroup,
    CSelection,
    CSwitch,
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
    CDropdown,
    CIcon,
    CInput,
    CInputCascade,
    CInputTreeModal,
    CMenu,
    CMenuItem,
    CMenuItemGroup,
    CMenuSubItem,
    CModal,
    CProgress,
    CPrompt,
    CQuickSearchBox,
    CRadio,
    CRadioGroup,
    CSelection,
    CSwitch,
    CTag,
    CTree,
    CTreeModal
}
