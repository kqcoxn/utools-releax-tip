<style lang="scss" scoped>
#App {
  width: 100%;
  height: 100%;
  position: relative;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.5s ease;
  }

  .hitokoto {
    position: absolute;
    z-index: 5;
    top: 20px;
    left: 0;
  }
}
</style>

<template>
  <div :id="appName">
    <!-- 背景 -->
    <div class="bg" :style="{ backgroundColor: timingStore.isFocus ? '#C9DAFF' : '#a3e8c0' }"></div>
    <!-- 一言 -->
    <Transition>
      <Hitokoto v-if="!statusStore.isUpperPanel" class="hitokoto" />
    </Transition>
    <!-- 顶部栏 -->
    <Transition>
      <TopBar v-if="!statusStore.isUpperPanel" />
    </Transition>
    <!-- 进度条 -->
    <TimingCore class="timing-core" />
    <!-- 信息展示 -->
    <OperationPanel />
  </div>
</template>

<script setup>
/**变量 */
const appName = ref("App");
// 控件
// 状态
const isInited = ref(false);
// 数据

/**属性 */
/**函数 */

/**监听 */
// 挂载
onMounted(async () => {
  init();
});
// 初始化
function init() {
  if (isInited.value) return;
  // 读取数据
  const minMulti = settings.timing.minMulti;
  timingStore.focusTime = ut.load("focusTime", 35) * minMulti;
  timingStore.relaxTime = ut.load("relaxTime", 5) * minMulti;
  timingStore.laterTime = ut.load("laterTime", 3) * minMulti;
  // 监听事件
  ut.onEnter(() => {
    statusStore.isOnWindow = true;
    // 切换为高优先级
    if (timingStore.isTiming) {
      setTimingInterval(500);
    }
    // 更新一言
    hitokotoStore.getHitokoto();
  });
  ut.onHide((isKill) => {
    statusStore.isOnWindow = false;
    // 如果插件被结束运行，清除计时
    if (isKill) {
      timingStore.clearTimingInterval();
      return;
    }
    // 切换为低优先级
    if (timingStore.isTiming) {
      setTimingInterval(2000);
    }
  });
  // 开始计时
  timingStore.startTiming();
  isInited.value = true;
}

/**常量 */
/**参数 */
/**导入 */
// vue
import { ref, computed, onMounted } from "vue";
// pinia
import { useTimingStore } from "./stores/timingStore";
const timingStore = useTimingStore();
import { useStatusStore } from "./stores/statusStore";
const statusStore = useStatusStore();
import { useHitokotoStore } from "./stores/hitokotoStore";
const hitokotoStore = useHitokotoStore();
// utils
import settings from "./settings";
import ut from "./utils/utools";

/**组件 */
import TimingCore from "./components/TimingCore.vue";
import OperationPanel from "./components/operationPanel/OperationPanel.vue";
import Hitokoto from "./components/Hitokoto.vue";
import TopBar from "./components/TopBar.vue";

/** */
</script>
