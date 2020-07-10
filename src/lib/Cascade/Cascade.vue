<template>
    <div :class="getSelectWrapClass">
        <label>
            <input type="text"
                   :placeholder="placeholder"
                   ref="input"
                   @focus="isDropUlShow = true"
                   :value="getSelectedTitle"
            />
            <Icon con-name="choas-arrow-down"
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
        <div v-if="isDropUlShow"
             class="collapse-box"
             :style="{
                width: 60+ 150* floorX +'px',
                height: 60+ 40* floorY +'px'
             }"
        >
            <Icon :style="{
                position: 'absolute',
                 top: '-5px',
                  right: '-5px'
            }"  width="40" height="40" icon-name="choas-close" @click="iconClick" active-color="#ff5e5c" />
            <template v-for="item in copyData">
                <CascadeItem
                        :item-data="item"
                        :reflect-key="reflectKey"
                        @change="change"
                        :lv="0" :conditionProps="conditionProps" />
            </template>

        </div>
    </div>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    import CascadeItem from "./CascadeItem";
    export default {
        name: 'Cascade',
        comments:{
            CascadeItem
        },
        props:{
            listData:{
                type: Array,
                default(){
                    return []
                }
            },
            cascadeData:{
                type:Array,
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
            },
            placeholder:{
                type:String,
                default(){
                    return '请要新增到的机构'
                }
            },
            conditionProps:{
                type:String,
                default(){
                    return 'node'
                }
            }
        },
        data() {
            return {
                isDropUlShow: false,
                copyData: [],
                floorX:1,
                floorY:1,
                result: []
            };
        },
        mounted() {
            this.copyData = this.addInfo(_.clone(this.listData), '0')
            this.copyData.forEach((item, index)=>{
                this.$set(this.copyData, index, {...item, isOpen: true})

            })
        },
        computed:{
            getSelectWrapClass(){
                const prefix =  this.prefix? this.prefix + '-': ''
                return classNames(
                    {
                        [prefix+ 'cascade-wrap']: true
                    }
                )
            },
            getSelectedTitle(){
                return this.value.reduce((a,b)=>{
                    return a=b[this.reflectKey['key']] + (a? ' / '+a: '')
                },'')
            }
        },
        updated() {
            const oUl = this.$refs.dropUl
            if(oUl){
                // 出现位置判断
                // console.dir(this.$refs.dropUl)
                // console.dir(this.$refs.dropUl.getBoundingClientRect())
            }
        },
        methods: {
            addInfo(data, parentId){
                data.forEach((item, index)=>{
                    if(!item[this.conditionProps]){
                        data[index] = undefined
                    }
                    item.parentId=parentId;
                    item.id=parentId+'-'+index;
                    if((item.children || []).length){
                        this.addInfo(item.children,item.id)
                        item.children=item.children.filter(Boolean)
                    }
                })
                return data
            },
            iconClick(e){
                e.preventDefault()
                this.floorX=1
                this.floorY=1
                this.isDropUlShow = !this.isDropUlShow
                const f=(data)=>{
                    data.forEach((item,index)=>{
                        this.$set(data, index, {...item, isOpen: false})
                        if((item.children ||[]).length){
                            f(item.children)
                        }
                    })
                }
                if(!this.isDropUlShow){
                    f(this.copyData)
                }
            },
            change(item){
                const path = item.id.slice(2).split('-').join('.children.').split('.')
                const parentPath = item.parentId.slice(2).split('-').join('.children.').split('.')
                // 获取父元素值
                const parentValue =parentPath !== ''? _.get(this.copyData, parentPath,{}): this.copyData

                // 获取自身值
                const selfValue =  item
                // 获取自身序数
                const selfIndex = parseInt(item.id.slice(item.id.length-1), 10)
                // 关闭所有同级及子集目录
                const fClose=(data,selfIndex)=>{
                    (data || []).forEach((item,index)=>{
                        if(selfIndex!==null){
                            if(index !== selfIndex){
                                data.splice(index,1,{...item, isOpen: false})
                            }
                        }else{
                            data.splice(index,1,{...item, isOpen: false})
                        }
                        if((item.children || []).length){
                            fClose(item.children, null)
                        }
                    })
                }
                fClose(parentValue.children, selfIndex)
                // 打开自身
                this.$set(item, 'isOpen', true)
                // 动态调整宽度
                this.floorX = path.filter(item=>item!=='children').length+1
                let pathStr = path.join('.')
                this.floorY=0
                let count=0
                // 动态调整高度
                do {
                    const children = _.get(this.copyData,pathStr+'.children',[])
                    this.floorY=this.floorY + (children.length ? children.length-1: 0)
                    count+=2;
                    pathStr=path.slice(0,path.length-count).join('.')
                }while (pathStr)
                const p =_.get(this.copyData,path.splice(0,path.length-2).join('.'),{})
                const findIndex =  this.result.findIndex((res)=>{
                    if(!p[this.reflectKey['value']]){
                        return 0
                    }
                    return res[this.reflectKey['value']] === p[this.reflectKey['value']]
                })
                if(findIndex>-1){
                    this.result.splice(findIndex+1,this.result.length)
                }
                const key=this.reflectKey['key']
                const value=this.reflectKey['value']
                this.result.push({[key]: item[key],[value]: item[value]})
            }
        },
        watch:{
            result:{
                handler(v){
                    this.$emit('input', v)
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .cascade-wrap{
        display: flex;
        height: addPX($sm-height);
        position: relative;
        width: 100%;
        background: #fff;
        >label{
            display: block;
            flex: 1;
            > input {
                height: 100%;
                width: 100%;
                padding-left: addPX($lg-padding);
                box-sizing: border-box;
                border: 1px solid $lineColor;
                border-radius:  addPX($sm-radius);
                &:focus {
                    outline: none;
                    border: 1px solid $primary;
                }
            }
        }
        .collapse-box{
            position: absolute;
            top: addPX($df-height);
            z-index: 999;
            background: #fff;
            border: 1px solid #ccc;
            box-shadow: 1px 1px 3px $shadowCr;
            border-radius: addPX($sm-radius);
        }
    }
</style>
