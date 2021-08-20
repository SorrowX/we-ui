<template>
  <div class="spec">
    <el-popper
      :offset="0"
      style="width: 350px;"
      effect="light"
      v-model="visible"
      :append-to-body="false"
      trigger="click"
      :stopPopperMouseEvent="true"
      transition="el-zoom-in-top"
      :gpuAcceleration="false"
      :popperOptions="popperOptions"
      :showArrow="false"
      pure
    >
      <template slot="trigger">
        <div class="test-trigger">
          <el-input style="width: 100%;" />
        </div>
      </template>
      <template slot="default">
        <div style="border: 1px solid #ccc; height: 200px; width: 400px">
          {{ msg }}
        </div>
      </template>
    </el-popper>

    <!-- <el-popover
      :offset="30"
      v-model="visible"
      :append-to-body="false"
      :popperOptions="popperOptions"
      trigger="click"
    >
      <template slot="reference">
        <div class="test-trigger" style="width: 250px;">
          <el-input/>
        </div>
      </template>
      <template slot="default">
        <div style="border: 1px solid #ccc; height: 200px; width: 400px">
          {{ msg }}
        </div>
      </template>
    </el-popover> -->
  </div>
</template>

<script>
import ElPopper from '../../packages/popper-v2/index.js'
export default {
  components: { ElPopper },
  data() {
    return {
      visible: false,
      msg: 'Rem is the best girl',
      popperOptions: {
      }
    }
  },
  mounted() {
    window.xx = this

    // document.addEventListener('mouseup', () => {
    //   console.log('document mouseup')
    // })
    // document.addEventListener('mousedown', () => {
    //   console.log('document mousedown')
    // })
  },
}
</script>

<style scoped>
.spec {
  /* height: 100px; */
  /* overflow: hidden; */
  /* border: 1px solid red; */
}
</style>
