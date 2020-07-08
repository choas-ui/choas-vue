<template>
    <div>
        InputTreeModal
    </div>
</template>

<script>
    import classNames from 'classnames'
    export default {
        name: 'InputTreeModal',
    }
</script>

<style lang="scss" scoped>
    @import "../scss/normal-bg";
    @import "../scss/size";
    @import "../scss/variable";
    @import "../scss/functions";
    .btn{
        background: #fff;
        cursor: pointer;
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        color: #666;
        &-block{
            display: block;
            width: 100%;
        }
        &-lg{
            padding: addPX($sm-padding) addPX($lg-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($lg-fs);
        }
        &-df{
            padding: addPX($sm-padding) addPX($df-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($df-fs);
        }
        &-sm{
            padding: addPX($sm-padding) addPX($sm-padding);
            border-radius: addPX($sm-radius);
            font-size: addPX($sm-fs);
        }
        &-primary{
            background: $primary;
            color: $btnFtCr;
        }
        &-success{
            background: $success;
            color: $btnFtCr;
        }
        &-warning{
            background: $warning;
            color: $btnFtCr;
        }
        &-danger{
            background: $danger;
            color: $btnFtCr;
        }
        &-disabled{
            background: $disabled;
            color: $btnFtCr;
        }
        &-ghost{
            background: none;
            color: $info;
            border: 1px dashed $btnGstCr;
            &:hover{
                color: $btnFtCr;
                background: $btnGstCr;
            }
        }
    }
</style>
