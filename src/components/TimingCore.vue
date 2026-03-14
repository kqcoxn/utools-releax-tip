<style lang="scss" scoped>
#TimingCore {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 50%;
    color: white;
    transition: all 0.5s ease;

    .text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 42px;
      font-size: 14px;
    }

    .leftTime {
      font-family: "dejavu";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 64px;
      font-weight: bold;
      font-size: 38px;
    }
  }
}
</style>

<template>
  <div :id="appName">
    <el-progress
      type="dashboard"
      :width="300"
      :stroke-width="10"
      :percentage="timingStore.isFocus ? focusPercentage : relaxPercentage"
      :color="timingStore.isFocus ? '#114fff' : '#15d26c'"
    >
      <template>
        <span></span>
      </template>
    </el-progress>
    <div
      class="center"
      :style="{ backgroundColor: timingStore.isFocus ? '#114fff' : '#15d26c' }"
    >
      <div class="text">
        {{ `- ${timingStore.timingState.tip} -` }}
      </div>
      <div class="leftTime">
        {{ timingStore.isFocus ? restTimeStr : relaxTimeStr }}
      </div>
    </div>
  </div>
</template>

<script setup>
/**变量 */
const appName = ref("TimingCore");
// 控件
// 状态
// 数据

/**属性 */

// 剩余时间
const restTimeStr = computed(() => {
  return timingStore.restTime > settings.timing.hourMulti
    ? Timer.format(timingStore.restTime, "hh:mm:ss")
    : Timer.format(timingStore.restTime, "mm:ss");
});

// 休息时间
const relaxTimeStr = computed(() => {
  return timingStore.passTime > settings.timing.hourMulti
    ? Timer.format(timingStore.passTime, "hh:mm:ss")
    : Timer.format(timingStore.passTime, "mm:ss");
});

// 百分比
const focusPercentage = computed(() => {
  return (timingStore.restTime / timingStore.focusTime) * 100;
});
const relaxPercentage = computed(() => {
  return Math.min(timingStore.passTime / timingStore.relaxTime, 1) * 100;
});

/**函数 */

/**监听 */
// 挂载
onMounted(async () => {
});

/**常量 */
/**参数 */
/**导入 */
// vue
import { ref, computed, onMounted } from "vue";
// pinia
import { useTimingStore } from "../stores/timingStore";
const timingStore = useTimingStore();
// utils
import settings from "../settings";
import { Timer } from "kqtk";

/**组件 */

/** */
</script>
