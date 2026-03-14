import { defineStore } from "pinia";
import { Timer } from "kqtk";

import settings from "../settings";
import ut from "../utils/utools";
import { useStatusStore } from "./statusStore";
import type { TimingState, TimingStateKey } from "../types";

const timer = new Timer(false, { defaultUnit: "ms", defaultPrecision: 0 });

const timingStates: Record<TimingStateKey, TimingState> = {
  focus: {
    key: "focus",
    tip: "剩余时间",
  },
  relax: {
    key: "relax",
    tip: "休息时间",
  },
};

interface TimingStoreState {
  timingState: TimingState;
  timingInterval: ReturnType<typeof setInterval> | null;
  focusTime: number;
  relaxTime: number;
  laterTime: number;
  passedTime: number;
  roundTime: number;
}

export const useTimingStore = defineStore("TimingStore", {
  state: (): TimingStoreState => ({
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
    isFocus(state): boolean {
      return state.timingState.key === "focus";
    },
    isRelax(state): boolean {
      return state.timingState.key === "relax";
    },
    isTiming(state): boolean {
      return state.timingInterval !== null;
    },

    // 过去总时间
    passTime(state): number {
      return state.roundTime + state.passedTime;
    },

    // 剩余时间
    restTime(state): number {
      return Math.max(
        state.focusTime - (state.roundTime + state.passedTime),
        0,
      );
    },
  },

  actions: {
    // 切换状态
    changeState(key: TimingStateKey) {
      this.timingState = timingStates[key];
    },

    // 设置计时器间隔
    setTimingInterval(interval = 500) {
      if (this.isTiming) {
        clearInterval(this.timingInterval!);
      }
      this.timingInterval = setInterval(() => {
        this.roundTime = timer.duration();
        // 结束
        if (this.passTime >= this.focusTime && this.isFocus) {
          this.endTiming("relax");
        }
        // 防止忽略
        else if (this.isRelax && Math.round(this.passTime / 1000) % 10 === 0) {
          const statusStore = useStatusStore();
          ut.showWindow(statusStore.isOnWindow);
        }
      }, interval);
    },

    // 开始计时
    startTiming(passed = 0) {
      this.passedTime = passed;
      this.roundTime = 0;
      timer.start();
      this.setTimingInterval();
    },

    // 清除计时器
    clearTimingInterval() {
      if (!this.isTiming) return;
      clearInterval(this.timingInterval!);
      this.timingInterval = null;
    },

    // 暂停计时
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
    endTiming(toState: TimingStateKey | null = null) {
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
