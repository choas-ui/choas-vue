<template>
    <div class="cascade-wrap">
        <label>
            <input type="text"
                   placeholder="请选择"
                   ref="input"
                   @focus="isDropUlShow=true"
                   @click="isDropUlShow=true"
                   :value="resultPath"
            />
            <Icon type="svg"
                  icon-name="choas-arrow-down"
                  :style="{
                       position: 'absolute',
                       right: '10px',
                       top: '5px',
                       transform: isDropUlShow? 'rotate(180deg)': 'rotate(0)',
                       transition: 'all 0.3s'
                  }"
                  @click="toggle($event)"
            />
        </label>
        <div v-if="isDropUlShow" class="drop-ul">
            <UlLi :options="options"
                  :selectedItems="selectedItems"
                  :reflect-key="reflectKey"
                  :level="0"
                  @click="change"
            />
        </div>

    </div>
</template>

<script>
    import classNames from 'classnames'
    import _ from 'lodash'
    import UlLi from "./CascadeItem";
    export default {
        name: 'Cascade',
        components: {UlLi},
        props:{
            dataList:{
                type: Object,
                default(){
                    return {}
                }
            },
            lv: {
                type: Number,
                default(){
                    return 0
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
                isDropUlShow: false,
                selectedItems: [],
                options:[this.dataList]
            };
        },
        computed:{
            resultPath(){
                return this.selectedItems.map(item=>item[this.reflectKey['key']]).join('/')
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
            close(){
                this.isDropUlShow=false
            },
            toggle(){
                this.isDropUlShow = !this.isDropUlShow
            },
            change(newValue){
                this.selectedItems.splice(newValue.level, 1, newValue.item)
                this.selectedItems.splice(newValue.level+1)
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
        >label{
            display: block;
            flex: 1;
            > input {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid $lineColor;
                border-radius:  addPX($sm-radius);
                &:focus {
                    outline: none;
                    border: 1px solid $primary;
                }
            }
        }
        .drop-ul{
            position: absolute;
            top: 30px;
        }
    }
</style>
