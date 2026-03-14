<style lang="scss" scoped>
#MainPanel {
  width: 100%;
  height: 100%;

  .operations {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    display: flex;

    .icon-container {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:not(:first-child) {
        margin-left: 8px;
      }

      &:hover {
        transform: scale(1.1);
      }

      .iconfont {
        font-size: 32px;
        text-shadow: 1px 1px 4px rgba(black, 0.1);
      }
    }
  }
}
</style>

<template>
  <div :id="appName">
    <!-- 操作按钮 -->
    <div class="operations">
      <el-tooltip class="icon-container" effect="light" content="结束计时" placement="bottom">
        <div class="icon-container" @click="
          timingStore.endTiming(timingStore.isFocus ? 'relax' : 'focus')
          ">
          <span class="iconfont icon-zhongxinkaishi" :style="{ color: '#37a70f' }"></span>
        </div>
      </el-tooltip>
      <el-tooltip v-if="timingStore.isTiming" class="icon-container" effect="light" content="暂停计时" placement="bottom">
        <div class="icon-container" @click="timingStore.pauseTiming">
          <span class="iconfont icon-shuyi_zanting" :style="{ color: '#c24645', fontSize: '30px' }"></span>
        </div>
      </el-tooltip>
      <el-tooltip v-else class="icon-container" effect="light" content="继续计时" placement="bottom">
        <div class="icon-container" @click="timingStore.continueTiming">
          <span class="iconfont icon-jixu" :style="{ color: '#c24645' }"></span>
        </div>
      </el-tooltip>
      <el-tooltip class="icon-container" effect="light" content="稍后提醒" placement="bottom">
        <div class="icon-container" @click="timingStore.laterRemind">
          <span class="iconfont icon-yanchi" :style="{ color: '#114fff' }"></span>
        </div>
      </el-tooltip>
    </div>
    <!-- 问候 -->
    <div class="greet">{{}}</div>
  </div>
</template>

<script setup lang="ts">
/**变量 */
const appName = ref("MainPanel");

/**导入 */
// vue
import { ref } from "vue";
// pinia
import { useTimingStore } from "../../stores/timingStore";
const timingStore = useTimingStore();
</script>
