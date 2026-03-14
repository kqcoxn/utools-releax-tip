<style lang="scss" scoped>
#TopBar {
  width: 100%;
  position: absolute;
  z-index: 5;

  .right {
    position: absolute;
    right: 12px;
    top: 12px;

    .btn {
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>

<template>
  <div :id="appName">
    <div class="right">
      <el-tooltip class="icon-container" effect="light" content="设置" placement="bottom">
        <div class="btn config" @click="statusStore.switchPanel('config')">
          <svg class="icon" aria-hidden="true" style="font-size: 48px">
            <use xlink:href="#icon-a-080_shezhi"></use>
          </svg>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
/**变量 */
const appName = ref("TopBar");

/**导入 */
// vue
import { ref } from "vue";
// pinia
import { useStatusStore } from "../stores/statusStore";
const statusStore = useStatusStore();
</script>
