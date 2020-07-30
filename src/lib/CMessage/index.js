import Vue from 'vue'
import CMessage from './CMessage'

const cMessage = {
    success: (props) => {
        new Vue({
            components: {
                CMessage
            },
            data(){
              return {
                  successPropsLists: []
              }
            },
            render(h) {
                return h('CMessage',
                    {
                        data: {
                            timer: null
                        },
                        props:{
                            ...props,
                            append: ()=>{
                                document.body.appendChild(this.$el)
                            },
                            remove: ()=>{
                                document.body.removeChild(this.$el)
                                this.$destroy()
                            },
                        },
                    })
            }
        }).$mount()

    },
    info: () => {

    },
    error: () => {

    },
    warning: () => {

    }
}


export default cMessage
