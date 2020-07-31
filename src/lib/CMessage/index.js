import Vue from 'vue'
import _ from 'lodash'
import CMessage from './CMessage'


const cMessage = {
    vm: null,
    success(msgData) {
        if (!this.vm) {
            const divNode = document.createElement('div')
            document.body.append(divNode)
            this.vm = new Vue({
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
                                        ...props
                                    },
                                    on: {
                                        changeListData: (id) => {
                                            console.log(id)
                                        }
                                    }
                                }
                            )
                        })
                    )
                }
            }).$mount(divNode)
        }
        this.vm.listData.push({
            ...msgData,
            noticeType: 'success',
            id: _.uniqueId('msg-')
        })
    },
    info(msgData){
        if (!this.vm) {
            const divNode = document.createElement('div')
            document.body.append(divNode)
            this.vm = new Vue({
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
                                    on: {
                                        changeListData: (id) => {
                                            console.log(id)
                                        }
                                    }
                                }
                            )
                        })
                    )
                }
            }).$mount(divNode)
        }
        this.vm.listData.push({
            ...msgData,
            noticeType: 'info',
            id: _.uniqueId('msg-')
        })
    },
    error: () => {

    },
    warning: () => {

    }
}


export default cMessage
