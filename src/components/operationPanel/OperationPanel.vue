<style lang="scss" scoped>
#OperationPanel {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;

  .panel {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    border-radius: 20px 20px 0 0;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(30px);
    box-shadow: 0 -2px 5px 1px rgba(white, 0.3);
    transition: all 0.4s ease;

    .bar {
      position: absolute;
      width: 140px;
      height: 14px;
      background-color: rgba($color: white, $alpha: 0.2);
      border-radius: 20px;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba($color: white, $alpha: 0.4);
        width: 200px;

        .iconfont {
          color: rgba($color: white, $alpha: 1);
        }
      }

      .iconfont {
        color: rgba($color: white, $alpha: 0.4);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>

<template>
  <div :id="appName">
    <div class="panel" :style="{ height: statusStore.isUpperPanel ? '90%' : '50%' }">
      <Transition>
        <div v-if="statusStore.isUpperPanel" class="bar" @click="statusStore.switchPanel('main')">
          <span class="iconfont icon-xiajiantou"></span>
        </div>
      </Transition>
      <!-- 面板 -->
      <Transition>
        <MainPanel v-if="statusStore.operationPanel.key === 'main'" />
        <ConfigPanel v-else-if="statusStore.operationPanel.key === 'config'" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
/**变量 */
const appName = ref("OperationPanel");

/**导入 */
// vue
import { ref } from "vue";
// pinia
import { useStatusStore } from "../../stores/statusStore";
const statusStore = useStatusStore();

/**组件 */
import MainPanel from "./MainPanel.vue";
import ConfigPanel from "./ConfigPanel.vue";
</script>
