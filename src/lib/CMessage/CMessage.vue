<script>
import classNames from 'classnames'

export default {
  name: 'CMessage',
  props: {
    noticeType: {
      validate(v) {
        return ['info', 'success', 'warning', 'error'].indexOf(v) > 0
      },
      default() {
        return 'info'
      }
    },
    message: {
      type: String,
      default() {
        return ''
      }
    },
    timeSpan: {
      type: Number,
      default() {
        return 2
      }
    },
    callback:{
      type: Function
    },
    width: {
      type: String,
      default() {
        return '500';
      }
    },
    prefix: {
      type: String,
      default() {
        return ''
      }
    },
    id: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      timer: null
    }
  },
  computed: {
    getMessageWrapClass() {
      const prefix = this.prefix ? this.prefix + '-' : ''
      return classNames(
          {
            [prefix + 'message-wrap']: true,
            [prefix + 'message-info']: this.noticeType === 'info',
            [prefix + 'message-success']: this.noticeType === 'success',
          }
      )
    },
  },
  methods: {
    removeHandle() {
      this.timer = setTimeout(() => {
        this.$emit('changeListData', this.id)
        this.callback && this.callback()
      }, this.timeSpan * 1000)
    }
  },
  mounted() {
    this.removeHandle()
  },
  render(h) {
    return h('transition',
        {
          props:{
            name: 'slide-fade'
          }
        },
        [
          h('div',
              {
                class: this.getMessageWrapClass,
                style: {
                  width: this.width + 'px',
                  marginLeft: `calc(50vw - ${(this.width / 2).toFixed(0)}px)`
                },
                on: {
                  mouseenter: () => {
                    clearTimeout(this.timer)
                  },
                  mouseleave: () => {
                    this.removeHandle()
                  }
                },
              },
              [
                this.message
              ]
          )
        ]
    )
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/functions";
@import "../scss/size";
@import "../scss/normal-bg";
@import "../scss/variable";
@import "../scss/comm-class";

.message {
  &-wrap {
    padding: addPX($ssm-padding);
    box-sizing: border-box;
    border-radius: addPX($df-radius);
    color: #ffffff;
    margin: addPX($sm-margin) 0;
    font-size: addPX($df-fs);
  }

  &-info {
    border: 2px solid darkColor20($info);
    background: weakColor80($info);
  }

  &-success {
    border: 2px solid darkColor20($success);
    background: weakColor80($success);
  }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}
</style>
