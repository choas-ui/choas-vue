<script>
import classNames from 'classnames'
export default {
  name: 'CMessage',
  props: {
    noticeType:{
      validate(v){
        return ['info', 'success', 'warning', 'error'].indexOf(v)>0
      },
      default(){
        return 'info'
      }
    },
    timeSpan: {
      type: Number,
      default() {
        return 2
      }
    },
    width:{
      type: String,
      default() {
        return '500';
      }
    },
    prefix:{
      type: String,
      default(){
        return ''
      }
    },
    id: {
      type: String,
      default(){
        return ''
      }
    }
  },
  data() {
    return {
      timer: null
    }
  },
  computed:{
    getMessageWrapClass(){
      const prefix =  this.prefix? this.prefix + '-': ''
      return classNames(
          {
            [prefix+ 'message-wrap']: true,
            [prefix+ 'message-info']: this.noticeType === 'info',
            [prefix+ 'message-success']: this.noticeType === 'success',
          }
      )
    },
  },
  methods: {
    removeHandle() {
      this.timer = setTimeout(() => {
        this.$emit('changeListData', this.id)
      }, this.timeSpan * 1000)
    }
  },
  mounted() {
    this.removeHandle()

  },
  render(h) {
    return h('div',
        {
          class: this.getMessageWrapClass,
          style: {
            textAlign: 'center',
            width: this.width+'px',
            marginLeft: `calc(50vw - ${(this.width/2).toFixed(0)}px)`
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
          Math.random()
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
.message{
  &-wrap {
    padding: addPX($sm-padding);
    box-sizing: border-box;
    border-radius: addPX($df-radius);
    color: #ffffff;
  }
  &-info{
    border: 2px solid darkColor20($info);
    background: weakColor80($info);
  }
  &-success{
    border: 2px solid darkColor20($success);
    background: weakColor80($success);
  }
}
</style>
