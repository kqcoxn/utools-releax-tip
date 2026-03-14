import { defineStore } from "pinia";

import settings from "../settings";
import ut from "../utils/utools";
import type { UserSettings } from "../types";

const STORAGE_KEY = "userSettings";

interface SettingsStoreState extends UserSettings {}

export const useSettingsStore = defineStore("SettingsStore", {
  state: (): SettingsStoreState => ({
    focusTime: settings.defaultUserSettings.focusTime,
    relaxTime: settings.defaultUserSettings.relaxTime,
    laterTime: settings.defaultUserSettings.laterTime,
    hitokotoEnabled: settings.defaultUserSettings.hitokotoEnabled,
    autoStartTiming: settings.defaultUserSettings.autoStartTiming,
  }),

  getters: {
    // 专注时间（毫秒）
    focusTimeMs(state): number {
      return state.focusTime * settings.timing.minMulti;
    },
    // 休息时间（毫秒）
    relaxTimeMs(state): number {
      return state.relaxTime * settings.timing.minMulti;
    },
    // 稍后提醒时间（毫秒）
    laterTimeMs(state): number {
      return state.laterTime * settings.timing.minMulti;
    },
  },

  actions: {
    /**
     * 加载设置
     */
    loadSettings() {
      const saved = ut.get<UserSettings>(STORAGE_KEY);
      if (saved) {
        this.focusTime = saved.focusTime;
        this.relaxTime = saved.relaxTime;
        this.laterTime = saved.laterTime;
        this.hitokotoEnabled = saved.hitokotoEnabled;
        this.autoStartTiming = saved.autoStartTiming;
      }
    },

    /**
     * 保存设置
     */
    saveSettings() {
      ut.set(STORAGE_KEY, {
        focusTime: this.focusTime,
        relaxTime: this.relaxTime,
        laterTime: this.laterTime,
        hitokotoEnabled: this.hitokotoEnabled,
        autoStartTiming: this.autoStartTiming,
      });
    },

    /**
     * 重置为默认设置
     */
    resetSettings() {
      this.focusTime = settings.defaultUserSettings.focusTime;
      this.relaxTime = settings.defaultUserSettings.relaxTime;
      this.laterTime = settings.defaultUserSettings.laterTime;
      this.hitokotoEnabled = settings.defaultUserSettings.hitokotoEnabled;
      this.autoStartTiming = settings.defaultUserSettings.autoStartTiming;
      this.saveSettings();
    },

    /**
     * 更新单个设置
     */
    updateSetting<K extends keyof UserSettings>(
      key: K,
      value: UserSettings[K],
    ) {
      (this as unknown as Record<K, UserSettings[K]>)[key] = value;
      this.saveSettings();
    },
  },
});
