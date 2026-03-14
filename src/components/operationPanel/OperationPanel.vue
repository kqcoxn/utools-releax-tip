<style lang="scss" scoped>
#OperationPanel {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;

  .panel {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    // 固定最大高度，通过 transform 控制显示区域
    height: 90%;
    border-radius: 20px 20px 0 0;
    // 背景透明度随模糊值变化
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 -2px 5px 1px rgba(white, 0.3);
    // 始终启用模糊，通过 blur 值变化实现平滑过渡
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    // 关键优化：使用 transform 代替 height 动画，避免重排
    transform: translateY(calc(100% - 50%));
    transform-origin: bottom center;
    will-change: transform;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      backdrop-filter 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      -webkit-backdrop-filter 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      background 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    // 展开状态
    &.expanded {
      transform: translateY(0);
    }

    // 动画过程中降低模糊值，提升性能
    &.blur-reduced {
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      background: rgba(255, 255, 255, 0.92);
    }

    .bar {
      position: absolute;
      width: 140px;
      height: 14px;
      background-color: rgba($color: #000, $alpha: 0.08);
      border-radius: 20px;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background-color: rgba($color: #000, $alpha: 0.12);
        width: 200px;

        .iconfont {
          color: rgba($color: #000, $alpha: 0.6);
        }
      }

      .iconfont {
        color: rgba($color: #000, $alpha: 0.3);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
    }

    // 内容容器
    .content-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;

      // 面板内容淡入淡出动画
      .panel-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        // 强制 GPU 加速
        backface-visibility: hidden;

        &.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      }
    }
  }
}
</style>

<template>
  <div :id="appName">
    <div class="panel" :class="{ expanded: statusStore.isUpperPanel, 'blur-reduced': blurReduced }">
      <Transition>
        <div v-if="statusStore.isUpperPanel" class="bar" @click="handleCollapse">
          <span class="iconfont icon-xiajiantou"></span>
        </div>
      </Transition>
      <!-- 面板 - 始终渲染内容，带淡入淡出 -->
      <div class="content-container">
        <div class="panel-content" :class="{ active: currentPanelKey === 'main' }">
          <MainPanel />
        </div>
        <div class="panel-content" :class="{ active: currentPanelKey === 'config' }">
          <ConfigPanel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**导入 */
// vue
import { ref, watch } from "vue";
// pinia
import { useStatusStore } from "../../stores/statusStore";
const statusStore = useStatusStore();

/**变量 */
const appName = ref("OperationPanel");
const blurReduced = ref(false);
// 当前显示的面板 key，下拉过程中保持不变
const currentPanelKey = ref(statusStore.operationPanel.key);

// 处理下拉收起
function handleCollapse() {
  // 记录当前面板
  const prevPanelKey = statusStore.operationPanel.key;
  // 切换到 main（这会让 isUpperPanel 变为 false）
  statusStore.switchPanel('main');
  // 但内容保持为之前的面板
  currentPanelKey.value = prevPanelKey;
  // 动画结束后再切换内容到 main
  setTimeout(() => {
    currentPanelKey.value = 'main';
  }, 350);
}

// 监听面板状态变化，只有下拉时才变化模糊
watch(() => statusStore.isUpperPanel, (newVal, oldVal) => {
  // 只在下拉（收起）时变化模糊：true → false
  if (oldVal === true && newVal === false) {
    // 动画过程中降低模糊
    blurReduced.value = true;
    // 动画结束后恢复模糊
    setTimeout(() => {
      blurReduced.value = false;
    }, 350);
  }
});

// 监听面板展开，立即同步内容
watch(() => statusStore.isUpperPanel, (newVal) => {
  if (newVal) {
    currentPanelKey.value = statusStore.operationPanel.key;
  }
});

/**组件 */
import MainPanel from "./MainPanel.vue";
import ConfigPanel from "./ConfigPanel.vue";
</script>
