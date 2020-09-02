<template>
    <div :class="quickSearchBox">
        <div v-for="(options, index) in getCopyOptionsData"
             :key="index" :style="{width: ((100/col).toFixed(2))+'%'}"
        >
            <span class="search-title">{{options.label}}:</span>
            <template v-if="options.tagName ==='CInput'">
                <CInput :size="size"
                        v-model="options.value"
                        :placeholder="options.placeholder"
                />
            </template>
            <template v-if="options.tagName ==='CSelection'">
                <CSelection :size="size"
                            :list-data="options.listData"
                            v-model="options.value"
                            :placeholder="options.placeholder"
                            :reflect-key="options.reflectKey"
                />
            </template>
            <template v-if="options.tagName ==='CCheckboxGroup'">
                <CCheckboxGroup :size="size"
                                :list-data="options.listData"
                                v-model="options.value"
                                :placeholder="options.placeholder"
                                :reflect-key="options.reflectKey"
                />
            </template>
            <template v-if="options.tagName ==='CRadioGroup'">
                <CRadioGroup :size="size"
                             :list-data="options.listData"
                             v-model="options.value"
                             :placeholder="options.placeholder"
                             :reflect-key="options.reflectKey"
                />
            </template>
        </div>
        <div :style="{
          width: (col - (getCopyOptionsData || []).length%col) *(100/col).toFixed(2) + '%',
        }">
            <CButton @click="searchHandle"
                     type="primary"
                     :size="size"
            >
                查询
            </CButton>
            <CButton @click="toggleAdvance"
                     :type="advanceSearchModel?'ghost':'success'"
                     :size="size"
                     :style="{marginLeft: '10px'}"
            >
                高级搜索
                <CIcon :icon-name="advanceSearchModel?'choas-arrow-top':'choas-arrow-down'"
                       :color="advanceSearchModel? '#aaa': '#fff'" />
            </CButton>
        </div>
    </div>
</template>

<script>
  import classNames from 'classnames';
  import _ from 'lodash';

  export default {
    name: 'CQuickSearchBox',
    props: {
      optionsData: {
        type: Array,
        default() {
          return []
        }
      },
      // 默认列数
      col: {
        type: Number,
        default() {
          return 3
        }
      },
      // 高度
      size: {
        validate(v) {
          return !v || ['ssmall', 'small', 'default', 'large', 'llarge'].includes(v)
        },
        default() {
          return 'small'
        }
      },
    },
    data() {
      return {
        copyOptionsData: [],
        advanceSearchModel: false,
      };
    },
    computed: {
      quickSearchBox() {
        const prefix = this.prefix ? this.prefix + '-' : '';
        return classNames(
            {
              [prefix + 'quick-search-box']: true
            }
        )
      },
      getCopyOptionsData() {
        if (this.advanceSearchModel) {
          return this.copyOptionsData;
        } else {
          return this.copyOptionsData.filter(item => item.model !== 'advance');
        }
      }
    },
    methods: {
      searchHandle() {
        console.log(this.copyOptionsData);
        const params = {};
        this.$emit('@searchHandle', params)
      },
      toggleAdvance() {
        this.advanceSearchModel = !this.advanceSearchModel
      }
    },
    watch: {
      optionsData: {
        handler(v) {
          const copyValue = _.cloneDeep(v || []).map(item => {
            if (item.tagName === 'CInput' && !item.value) {
              item.value = ''
            }
            if (item.tagName === 'CSelection' && !item.value) {
              item.value = [{}]
            }
            if (item.tagName === 'CCheckboxGroup' && !item.value) {
              item.value = [{}]
            }
            if (item.tagName === 'CRadioGroup' && !item.value) {
              item.value = [{}]
            }
            return item;
          });
          this.$set(this, 'copyOptionsData', copyValue);
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../scss/functions";
    @import "../scss/size";
    @import "../scss/normal-bg";
    @import "../scss/variable";
    @import "../scss/comm-class";

    .quick-search-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        & > div {
            margin: 6px 0;
            display: flex;
            word-break: keep-all;
            align-items: center;
            font-size: 14px;
            padding: 0 10px;
            box-sizing: border-box;
            justify-content: space-between;

            > span.search-title {
                margin-right: 10px;
            }

            &:last-of-type {
                justify-content: flex-end;
            }
        }
    }
</style>
