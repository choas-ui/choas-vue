import Vue from 'vue'
import _ from 'lodash'
import CMessage from './CMessage'

const createVm = ()=>{
    const divNode = document.createElement('div')
    document.body.append(divNode)
    return new Vue({
        components: {
            CMessage
        },
        data() {
            return {
                listData: []
            }
        },
        render(h) {
            return h(
                'div',
                {
                    class: 'c-message-box',
                    style: {
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0,
                    }
                },
                this.listData.map((props) => {
                    return h('CMessage',
                        {
                            props:{
                                ...props,
                            },
                            key: props.id,
                            on: {
                                changeListData: (id) => {
                                    const index = this.listData.findIndex(item => item.id === id)
                                    if(index>-1){
                                        this.listData.splice(index, 1)
                                    }
                                }
                            }
                        }
                    )
                })
            )
        }
    }).$mount(divNode)
}


const cMessage = {
    vm: null,
    success(msgData) {
        if(!this.vm){
            this.vm = createVm()
        }
        this.vm.listData.push({
            ...msgData,
            noticeType: 'success',
            id: _.uniqueId('msg-')
        })
    },
    info(msgData){
        if(!this.vm){
            this.vm = createVm()
        }
        this.vm.listData.push({
            ...msgData,
            noticeType: 'info',
            id: _.uniqueId('msg-')
        })
    },
    error(msgData){
        if(!this.vm){
            this.vm = createVm()
        }
        this.vm.listData.push({
            ...msgData,
            noticeType: 'error',
            id: _.uniqueId('msg-')
        })
    },
    warning(msgData){
        if(!this.vm){
            this.vm = createVm()
        }
        this.vm.listData.push({
            ...msgData,
            noticeType: 'warning',
            id: _.uniqueId('msg-')
        })
    }
}


export default cMessage
