<script>
    export default {
        name: 'CMessage',
        props:{
            timeSpan: {
                type: Number,
                default(){
                    return 2
                }
            },
            remove:{
                type: Function
            },
            append:{
                type: Function
            }
        },
        data(){
          return{
              timer: null
          }
        },
        methods:{
            removeHandle(){
                this.timer = setTimeout(()=>{
                    this.remove()
                },this.timeSpan*1000)
            }
        },
        mounted(){
            this.append()
            this.removeHandle()
        },
        render(h){
            return h('div',
                [
                    456
                ]
            )
        }
    }
</script>
