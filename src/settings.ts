/**
 * 判断是否为开发环境
 */
export const isDev =
  typeof window === "undefined" ||
  typeof utools === "undefined" ||
  (window as unknown as { utoolsEnv?: string }).utoolsEnv === "development";

/**
 * 时间倍率常量
 */
export const TIMING_CONSTANTS = {
  msMulti: 1,
  secMulti: 1000,
  minMulti: 60000,
  hourMulti: 3600000,
} as const;

/**
 * 应用配置
 */
export const settings = {
  isDev,

  timing: {
    msMulti: 1,
    secMulti: 1000,
    minMulti: 60000,
    hourMulti: 3600000,
  },

  hitokoto: {
    apiBaseUrl: "https://v1.hitokoto.cn",
    getInterval: 2000, // 2s
  },

  /**
   * 默认用户设置
   */
  defaultUserSettings: {
    focusTime: 35, // 分钟
    relaxTime: 5,
    laterTime: 3,
    hitokotoEnabled: true,
    autoStartTiming: true,
  },
} as const;

export default settings;
