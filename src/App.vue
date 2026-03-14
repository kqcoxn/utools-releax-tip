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
      <Hitokoto v-if="!statusStore.isUpperPanel && settingsStore.hitokotoEnabled" class="hitokoto" />
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

<script setup lang="ts">
/**变量 */
const appName = ref("App");
// 状态
const isInited = ref(false);

/**监听 */
// 挂载
onMounted(() => {
  init();
});

// 初始化
function init() {
  if (isInited.value) return;

  // 加载用户设置
  settingsStore.loadSettings();

  // 使用用户设置初始化计时器
  const minMulti = settings.timing.minMulti;
  timingStore.focusTime = settingsStore.focusTime * minMulti;
  timingStore.relaxTime = settingsStore.relaxTime * minMulti;
  timingStore.laterTime = settingsStore.laterTime * minMulti;

  // 初始化后台计时服务
  timerService.initialize((state) => {
    console.log("[App] Timer ended:", state);
    // 显示通知
    timerService.showNotification(
      state === "focus" ? "休息时间到" : "继续工作",
      state === "focus" ? "请休息一下，保护眼睛" : "休息结束，继续加油"
    );
    // 显示窗口
    ut.showWindow(statusStore.isOnWindow);
  });

  // 监听事件
  ut.onEnter(() => {
    statusStore.isOnWindow = true;
    // 切换为高优先级
    if (timingStore.isTiming) {
      setTimingInterval(500);
    }
    // 更新一言
    if (settingsStore.hitokotoEnabled) {
      hitokotoStore.getHitokoto();
    }
  });

  ut.onHide((isKill) => {
    statusStore.isOnWindow = false;
    // 如果插件被结束运行，清除计时
    if (isKill) {
      timingStore.clearTimingInterval();
      timerService.stopBackgroundTimer();
      return;
    }
    // 切换为低优先级
    if (timingStore.isTiming) {
      setTimingInterval(2000);
    }
  });

  // 开始计时
  if (settingsStore.autoStartTiming) {
    timingStore.startTiming();
  }

  isInited.value = true;
}

// 设置计时器间隔
function setTimingInterval(interval: number) {
  timingStore.setTimingInterval(interval);
}

/**导入 */
// vue
import { ref, onMounted } from "vue";
// pinia
import { useTimingStore } from "./stores/timingStore";
const timingStore = useTimingStore();
import { useStatusStore } from "./stores/statusStore";
const statusStore = useStatusStore();
import { useHitokotoStore } from "./stores/hitokotoStore";
const hitokotoStore = useHitokotoStore();
import { useSettingsStore } from "./stores/settingsStore";
const settingsStore = useSettingsStore();
// utils
import settings from "./settings";
import ut from "./utils/utools";
// services
import { timerService } from "./services/timerService";

/**组件 */
import TimingCore from "./components/TimingCore.vue";
import OperationPanel from "./components/operationPanel/OperationPanel.vue";
import Hitokoto from "./components/Hitokoto.vue";
import TopBar from "./components/TopBar.vue";
</script>
