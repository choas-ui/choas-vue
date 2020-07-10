<template>
    <div :class="getSelectWrapClass"
         @mouseleave="leaveHandle"
    >
        <label>
            <input type="text"
                   placeholder="请选择"
                   ref="input"
                   @focus="clearTimeHandle"
                   :value="getSelectedTitle"
            />
            <CIcon icon-name="choas-arrow-down"
                  :style="{
                       position: 'absolute',
                       right: '10px',
                       top: '5px',
                       transform: isDropUlShow? 'rotate(180deg)': 'rotate(0)',
                       transition: 'all 0.3s'
                  }"
                  @click="iconClick($event)"
            />
        </label>
        <ul v-show="isDropUlShow" ref="dropUl" @mouseenter="clearTimeHandle" @mouseleave="leaveHandle">
            <template v-if="listData.length">
                <li v-for="item of listData" :key="item[reflectKey['value']]"
                    :class="item[reflectKey['value']] === getSelectedValue ? 'active': ''"
                    @click="()=>changeHandle([item])"
                >
                    {{item[reflectKey['key']]}}
                </li>
            </template>
            <li v-else>
                暂无数据
            </li>
        </ul>
    </div>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    export default {
        name: 'CSelection',
        props:{
            listData:{
                type: Array,
                default(){
                    return []
                }
            },
            value:{
                type: Array,
                default(){
                    return []
                }
            },
            reflectKey:{
                type: Object,
                default(){
                    return {
                        timer: null,
                        key: 'title',
                        value: 'value'
                    }
                }
            }
        },
        data() {
            return {
                isDropUlShow: false
            };
        },
        computed:{
            getSelectWrapClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    {
                        [prefix+ 'select-wrap']: true
                    }
                )
            },
            getSelectedValue(){
                return _.get(this.value,'0.'+[this.reflectKey['value']], '')
            },
            getSelectedTitle(){
                return _.get(this.value,'0.'+[this.reflectKey['key']], '')
            }
        },
        updated() {
            const oUl = this.$refs.dropUl
            if(oUl){
                // console.dir(this.$refs.dropUl)
                // console.dir(this.$refs.dropUl.getBoundingClientRect())
            }
        },
        methods: {
            clearTimeHandle(){
                clearTimeout(this.timer)
                this.isDropUlShow= true
            },
            changeHandle(v){
                this.$refs.input.focus()
                this.$emit('input', v)
            },
            leaveHandle(){
                this.timer= setTimeout(()=>{
                    this.isDropUlShow= false
                },180)
            },
            iconClick(e){
                e.preventDefault()
                this.isDropUlShow = !this.isDropUlShow
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .select-wrap{
        display: flex;
        height: addPX($sm-height);
        position: relative;
        >label{
            display: block;
            flex: 1;
            > input {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid $lineColor;
                border-radius:  addPX($sm-radius);
                padding:0 0 0 addPX($sm-padding);
                &:focus {
                    outline: none;
                    border: 1px solid $primary;
                }
            }
        }
        ul{
            position: absolute;
            left: 0;
            box-sizing: border-box;
            top: addPX($sm-height + $sm-padding);
            width: 100%;
            max-height: 300px;
            border: 1px solid $lineColor;
            box-sizing: border-box;
            margin: 0;
            z-index: 999;
            background: #fff;
            padding: addPX($sm-padding) 0;
            text-align: left;
            >li{
                list-style: none;
                height: addPX($sxx-height);
                line-height: addPX($sxx-height);
                cursor: pointer;
                box-sizing: border-box;
                padding-left: addPX($lg-padding);
                &:hover{
                    background: $info;
                    color: #fff;
                }
                .active{
                    background: $info;
                    color: #fff;
                }
            }
        }
    }
</style>
