<template>
    <CInputTreeModal
            :can-be-edited="canBeEdited"
            :list-data="listData"
            :reflect-key="reflectKey"
            v-model="selectedData"
            title="请选择机构"

            placeholder="请选择机构节点"
            condition-props="type"
            @addTreeNode="addTreeNode"
    />
</template>

<script>

    export default {
        name: 'App',
        components: {},
        data() {
            return{
                canBeEdited: true,
                selectedData: [
                    {
                        label: '十万分之一天平',
                        value: '谢广坤',
                    }
                ],
                reflectKey: {
                    key: 'label',
                    value: 'value'
                },
                listData: [{"title":"十万分之一天平","label":"十万分之一天平","value":"1","type":1},{"title":"干燥箱","label":"干燥箱","value":"2","type":1},{"title":"生化培养箱","label":"生化培养箱","value":"3","type":1},{"title":"马弗炉","label":"马弗炉","value":"4","type":1},{"title":"高压灭菌器","label":"高压灭菌器","value":"5","type":1},{"title":"超净工作台","label":"超净工作台","value":"6","type":1},{"title":"离心机","label":"离心机","value":"7","type":1},{"title":"翻转振荡器","label":"翻转振荡器","value":"8","type":1},{"title":"PH计","label":"PH计","value":"0","type":1},{"title":"水平振荡器","label":"水平振荡器","value":"9","type":1},{"title":"球磨机","label":"球磨机","value":"10","type":1},{"title":"土壤筛分机","label":"土壤筛分机","value":"11","type":1},{"title":"消解器","label":"消解器","value":"12","type":1},{"title":"电热板","label":"电热板","value":"13","type":1},{"title":"旋转蒸发仪","label":"旋转蒸发仪","value":"14","type":1},{"title":"凝胶色谱净化仪","label":"凝胶色谱净化仪","value":"15","type":1},{"title":"氮吹仪","label":"氮吹仪","value":"16","type":1},{"title":"水质采样器","label":"水质采样器","value":"17","type":1},{"title":"空气采样器","label":"空气采样器","value":"18","type":1},{"title":"离子计","label":"离子计","value":"1","type":1},{"title":"烟尘（气）测试仪","label":"烟尘（气）测试仪","value":"19","type":1},{"title":"多路气体采样器","label":"多路气体采样器","value":"20","type":1},{"title":"综合烟气分析仪","label":"综合烟气分析仪","value":"21","type":1},{"title":"烟尘（气）测试校准仪","label":"烟尘（气）测试校准仪","value":"22","type":1},{"title":"孔口流量校准器","label":"孔口流量校准器","value":"23","type":1},{"title":"电子流量计","label":"电子流量计","value":"24","type":1},{"title":"声校准器","label":"声校准器","value":"25","type":1},{"title":"声级计","label":"声级计","value":"26","type":1},{"title":"环境振动分析仪","label":"环境振动分析仪","value":"27","type":1},{"title":"烟度计","label":"烟度计","value":"28","type":1},{"title":"浊度仪","label":"浊度仪","value":"2","type":1},{"title":"pH计","label":"pH计","value":"29","type":1},{"title":"离子计","label":"离子计","value":"30","type":1},{"title":"浊度仪","label":"浊度仪","value":"31","type":1},{"title":"电导率仪","label":"电导率仪","value":"32","type":1},{"title":"溶解氧仪","label":"溶解氧仪","value":"33","type":1},{"title":"水质采样器","label":"水质采样器","value":"34","type":1},{"title":"空气采样器","label":"空气采样器","value":"35","type":1},{"title":"烟尘（气）测试仪","label":"烟尘（气）测试仪","value":"36","type":1},{"title":"多路气体采样器","label":"多路气体采样器","value":"37","type":1},{"title":"综合烟气分析仪","label":"综合烟气分析仪","value":"38","type":1},{"title":"电导率仪","label":"电导率仪","value":"3","type":1},{"title":"烟尘（气）测试校准仪","label":"烟尘（气）测试校准仪","value":"39","type":1},{"title":"孔口流量校准器","label":"孔口流量校准器","value":"40","type":1},{"title":"电子流量计","label":"电子流量计","value":"41","type":1},{"title":"可见光分光光度计","label":"可见光分光光度计","value":"42","type":1},{"title":"紫外可见分光光度计","label":"紫外可见分光光度计","value":"43","type":1},{"title":"水质快速测定仪","label":"水质快速测定仪","value":"44","type":1},{"title":"原子荧光光度计","label":"原子荧光光度计","value":"45","type":1},{"title":"原子吸收分光光度计","label":"原子吸收分光光度计","value":"46","type":1},{"title":"气相色谱仪(ECD检测器)","label":"气相色谱仪(ECD检测器)","value":"47","type":1},{"title":"气相色谱仪(FID检测器)","label":"气相色谱仪(FID检测器)","value":"48","type":1},{"title":"气相色谱仪(NPD检测器)","label":"气相色谱仪(NPD检测器)","value":"49","type":1},{"title":"气相色谱仪(FPD检测器)","label":"气相色谱仪(FPD检测器)","value":"50","type":1},{"title":"气相色色谱-质质谱联用仪","label":"气相色色谱-质质谱联用仪","value":"51","type":1},{"title":"电杆耦合等离子体质谱仪","label":"电杆耦合等离子体质谱仪","value":"52","type":1},{"title":"ICP光谱仪","label":"ICP光谱仪","value":"53","type":1},{"title":"离子色谱仪","label":"离子色谱仪","value":"54","type":1},{"title":"测汞仪","label":"测汞仪","value":"55","type":1},{"title":"冷原子吸收测汞仪","label":"冷原子吸收测汞仪","value":"56","type":1},{"title":"液相色谱仪","label":"液相色谱仪","value":"57","type":1},{"title":"液相色谱质谱仪","label":"液相色谱质谱仪","value":"58","type":1},{"title":"红外分光测油仪","label":"红外分光测油仪","value":"59","type":1},{"title":"测硫仪","label":"测硫仪","value":"60","type":1},{"title":"总有机碳测定仪","label":"总有机碳测定仪","value":"61","type":1},{"title":"可吸附有机卤素","label":"可吸附有机卤素","value":"62","type":1},{"title":"离子色谱仪","label":"离子色谱仪","value":"63","type":1},{"title":"X射线荧光光谱仪","label":"X射线荧光光谱仪","value":"64","type":1},{"title":"全自动烷基汞测定仪","label":"全自动烷基汞测定仪","value":"65","type":1},{"title":"气相分子吸收光谱仪","label":"气相分子吸收光谱仪","value":"66","type":1},{"title":"空气微生物采样器","label":"空气微生物采样器","value":"67","type":1},{"title":"显微镜","label":"显微镜","value":"68","type":1},{"title":"原子荧光形态分析仪","label":"原子荧光形态分析仪","value":"69","type":1},{"title":"红外气体分析仪","label":"红外气体分析仪","value":"70","type":1},{"title":"激光测距仪","label":"激光测距仪","value":"71","type":1},{"title":"面积/流速流量仪","label":"面积/流速流量仪","value":"72","type":1},{"title":"傅立叶红外气体测定仪","label":"傅立叶红外气体测定仪","value":"73","type":1},{"title":"酶底物封口机","label":"酶底物封口机","value":"74","type":1},{"title":"土壤水份测定仪","label":"土壤水份测定仪","value":"75","type":1},{"title":"万分之一天平","label":"万分之一天平","value":"0","type":1}]
            }
        },
        methods:{
            addTreeNode(v){
                console.log(v)
            },
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    body {
        margin: 0;
    }

    button.usr-btn-class {
        background: red;
    }
</style>
