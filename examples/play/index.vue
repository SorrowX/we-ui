<template>
  <div class="spec">
    <el-form-widgets
  ref="comp"
  :data="data"
  :model="model"
  layout="grid"
  disabled
  :show-action-buttons="false"
/>
  </div>
</template>

<script>
export default {
    data() {
      return {
        model: {
          name: "徐志伟",
          region: "区域1",
          date: "2021-07-23",
          delivery: false,
          type: ["地推活动"],
          resource: "线下场地免费",
          desc: "啥活动形式都可以",
        },
        data: [
          {
            type: "input",
            span: 12,
            placeholder: "请输入活动名称",
            prop: "name",
            label: "活动名称",
          },
          {
            type: "select",
            span: 12,
            placeholder: "请选择活动区域",
            prop: "region",
            label: "活动区域",
            ajaxOptions: {
              localList: [
                {
                  value: "区域1",
                  label: "区域1",
                },
                {
                  value: "区域2",
                  label: "区域2",
                },
              ],
            },
          },
          {
            type: "date-picker",
            span: 12,
            placeholder: "选择日期",
            prop: "date",
            label: "活动时间",
          },
          {
            type: "switch",
            span: 12,
            placeholder: "",
            prop: "delivery",
            label: "即时配送",
          },
          {
            type: "checkbox",
            span: 12,
            placeholder: "请输入活动名称",
            prop: "type",
            label: "活动",
            ajaxOptions: {
              localList: [
                {
                  label: "美食/餐厅线上活动",
                  value: "美食/餐厅线上活动",
                },
                {
                  label: "地推活动",
                  value: "地推活动",
                },
                {
                  label: "线下主题活动",
                  value: "线下主题活动",
                },
                {
                  label: "单纯品牌曝光",
                  value: "单纯品牌曝光",
                },
              ],
            },
          },
          {
            type: "radio",
            span: 12,
            prop: "resource",
            label: "特殊资源",
            ajaxOptions: {
              localList: [
                {
                  label: "线上品牌商赞助",
                  value: "线上品牌商赞助",
                },
                {
                  label: "线下场地免费",
                  value: "线下场地免费",
                },
              ],
            },
          },
          {
            type: "input",
            span: 24,
            placeholder: "活动形式",
            prop: "desc",
            label: "活动形式",
            inputData: {
              props: {
                type: "textarea",
              },
              attrs: {
                rows: 5,
              },
            },
          },
        ],
      };
    },
  };
</script>

<style>
/* .form-widgets-custom-label__text {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #333;
}
.form-widgets-custom-label__wrap {
    margin-left: -7px;
    line-height: 28px;
} */
</style>
