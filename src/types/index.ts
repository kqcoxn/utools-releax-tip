/**
 * 计时状态类型
 */
export type TimingStateKey = "focus" | "relax";

export interface TimingState {
  key: TimingStateKey;
  tip: string;
}

/**
 * 用户设置类型
 */
export interface UserSettings {
  focusTime: number; // 专注时间（分钟）
  relaxTime: number; // 休息时间（分钟）
  laterTime: number; // 稍后提醒时间（分钟）
  hitokotoEnabled: boolean; // 是否启用一言
  autoStartTiming: boolean; // 是否自动开始计时
}

/**
 * 一言数据类型
 */
export interface HitokotoData {
  hitokoto: string;
  from: string;
  from_who: string;
}

/**
 * 面板类型
 */
export type PanelKey = "main" | "config";

export interface Panel {
  key: PanelKey;
  name: string;
}

/**
 * 计时事件数据
 */
export interface TimingEndEvent {
  state: TimingStateKey;
}

export interface PanelSwitchEvent {
  panel: PanelKey;
}

/**
 * 事件映射
 */
export interface EventMap {
  "timing:end": TimingEndEvent;
  "panel:switch": PanelSwitchEvent;
  "hitokoto:refresh": void;
}

/**
 * 计时器状态
 */
export interface TimerStatus {
  isRunning: boolean;
  state: TimingStateKey;
  remainingTime: number; // 剩余时间（毫秒）
  totalTime: number; // 总时间（毫秒）
}

/**
 * 后台计时消息
 */
export interface BackgroundTimerMessage {
  type: "start" | "stop" | "tick" | "end";
  payload?: {
    duration?: number;
    interval?: number;
    remaining?: number;
    state?: TimingStateKey;
  };
}
