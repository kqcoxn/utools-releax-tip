import { defineStore } from "pinia";
import { Timer } from "kqtk";

import settings from "../settings";
import ut from "../utils/utools";
import { useStatusStore } from "./statusStore";

const timer = new Timer(false, { defaultUnit: "ms", defaultPrecision: 0 });

const timingStates = {
  focus: {
    key: "focus",
    tip: "剩余时间",
  },
  relax: {
    key: "relax",
    tip: "休息时间",
  },
};

export const useTimingStore = defineStore("TimingStore", {
  state: () => ({
    timingState: timingStates.focus,
    timingInterval: null,
    focusTime: 35 * settings.timing.minMulti,
    relaxTime: 5 * settings.timing.minMulti,
    laterTime: 3 * settings.timing.minMulti,
    passedTime: 0,
    roundTime: 0,
  }),
  getters: {
    // 当前状态
    isFocus(state) {
      return state.timingState.key == "focus";
    },
    isRelax(state) {
      return state.timingState.key == "relax";
    },
    isTiming(state) {
      return state.timingInterval != null;
    },

    // 过去总时间
    passTime(state) {
      return state.roundTime + state.passedTime;
    },

    // 剩余时间
    restTime(state) {
      return Math.max(state.focusTime - state.passTime, 0);
    },
  },
  actions: {
    // 切换状态
    changeState(key) {
      this.timingState = timingStates[key];
    },

    // 开始计时
    setTimingInterval(interval = 500) {
      if (this.isTiming) {
        clearInterval(this.timingInterval);
      }
      this.timingInterval = setInterval(() => {
        this.roundTime = timer.duration();
        // 结束
        if (this.passTime >= this.focusTime && this.isFocus) {
          this.endTiming("relax");
        }
        // 防止忽略
        else if (this.isRelax && Math.round(this.passTime / 1000) % 10 == 0) {
          const statusStore = useStatusStore();
          ut.showWindow(statusStore.isOnWindow);
        }
      }, interval);
    },
    startTiming(passed = 0) {
      this.passedTime = passed;
      this.roundTime = 0;
      timer.start();
      this.setTimingInterval();
    },

    // 暂停计时
    clearTimingInterval() {
      if (!this.isTiming) return;
      clearInterval(this.timingInterval);
      this.timingInterval = null;
    },
    pauseTiming() {
      this.passedTime += timer.end();
      this.roundTime = 0;
      this.clearTimingInterval();
    },

    // 继续计时
    continueTiming() {
      timer.start();
      this.setTimingInterval();
    },

    // 结束计时
    endTiming(toState = null) {
      this.clearTimingInterval();
      const statusStore = useStatusStore();
      ut.showWindow(statusStore.isOnWindow);
      if (toState) {
        this.changeState(toState);
      }
      this.startTiming();
    },

    // 稍后提醒
    laterRemind() {
      this.clearTimingInterval();
      this.changeState("focus");
      this.startTiming(this.focusTime - this.laterTime);
    },
  },
});
