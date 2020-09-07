// 定义五种大小
export const sizeProps = {
  props: {
    size: {
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return !value || ['llarge', 'large', 'default', 'small', 'ssmall'].indexOf(value) !== -1
      },
      default() {
        return 'default'
      }
    },
  },
};

export const heightProps={
  props: {
    height: {
      type: String,
      default(){
        return '0';
      },
    },
  },
};

export const typeProps = {
  props: {
    type: {
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return !value || ['primary', 'success', 'warning', 'danger', 'disabled', 'ghost', 'link'].indexOf(value) !== -1
      },
      default() {
        return 'primary'
      }
    },
  },
};

export const prefixProps = {
  props: {
    prefix: {
      type: String,
      default() {
        return ''
      }
    },
  },
};

export const classNameProps = {
  props: {
    className: {
      type: String,
      default() {
        return ''
      }
    },
  },
};

export const placeholderProps = {
  props: {
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
  },
};

export const reflectKeyProps = {
  props: {
    reflectKey: {
      type: Object,
      default() {
        return {
          key: 'key',
          value: 'value',
        }
      }
    },
  },
};

export const width18Props = {
  props: {
    width: {
      type: String,
      default() {
        return '18'
      }
    },
  }
};

export const height18Props = {
  props: {
    height: {
      type: String,
      default() {
        return '18'
      }
    },
  }
};

export const conditionPropsMix = {
  props: {
    conditionProps: {
      type: String,
      default() {
        return 'node'
      }
    },
  }
};


export const maskProps = {
  props: {
    mask: {
      type: Boolean
    },
  },
};

export const lineProps = {
  props: {
    line: {
      type: Boolean
    },
  },
};

export const multipleProps = {
  props: {
    multiple: {
      type: Boolean
    },
  },
};

export const checkboxProps = {
  props: {
    checkbox: {
      type: Boolean
    },
  },
};

export const draggableProps = {
  props: {
    draggable: {
      type: Boolean
    },
  },
};

export const cancelProps = {
  props: {
    cancel: {
      type: Boolean
    },
  },
};

export const canBeEditedProps = {
  props: {
    canBeEdited: {
      type: Boolean
    },
  },
};

export const controllerColorProps = {
  props: {
    controllerColor: {
      type: Boolean
    },
  },
};

export const activeColorProps = {
  props: {
    activeColor: {
      type: Boolean
    },
  },
};

export const controllersProps = {
  props: {
    controllers: {
      type: Boolean
    },
  },
};

export const normalStyleProps = {
  props: {
    normalStyle: {
      type: Object,
      default() {
        return {}
      }
    },
  },
};

export const activeStyleProps = {
  props: {
    activeStyle: {
      type: Object,
      default() {
        return {}
      }
    },
  },
};

