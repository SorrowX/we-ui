<template>
  <fixed-size-list 
    ref="comp"
    class-name="vr-list"
    :width="200"
    :height="200"
    :item-size="25"
    :total="100"
    :cache="3"
    direction="ltr"
    layout="horizontal"
  >
    <template slot="default" slot-scope="slotProps">
      <div :style="slotProps.style">{{ slotProps.index }}</div>
    </template>
    <p>siushdius</p>
  </fixed-size-list>
</template>

<script>
  import { FixedSizeList } from 'packages/virtual-list/index'
  export default {
    components: {
      FixedSizeList,
    },
    data() {
      return {
        value: {},
      };
    },
    mounted() {
      window.xxx = this.$refs.comp
    },
  };
</script>

<style>
.vr-list {
  border: 1px solid green;
}
</style>
