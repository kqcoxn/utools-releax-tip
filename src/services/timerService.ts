import type { TimingStateKey } from "../types";

/**
 * 后台服务接口（由 preload 注入）
 */
interface BackgroundServices {
  startBackgroundTimer: (
    duration: number,
    interval: number,
    state: TimingStateKey,
  ) => void;
  stopBackgroundTimer: () => void;
  getRemainingTime: () => number;
  onTimerEnd: (state: TimingStateKey) => void;
  showNotification: (title: string, body: string) => void;
  getStore: (key: string) => unknown;
  setStore: (key: string, value: unknown) => void;
}

/**
 * 计时服务
 * 封装前台/后台计时逻辑
 */
export class TimerService {
  private static instance: TimerService;
  private isInitialized = false;

  private constructor() {}

  /**
   * 获取单例实例
   */
  static getInstance(): TimerService {
    if (!TimerService.instance) {
      TimerService.instance = new TimerService();
    }
    return TimerService.instance;
  }

  /**
   * 获取后台服务
   */
  private get services(): BackgroundServices | null {
    return (
      (window as unknown as { services?: BackgroundServices }).services || null
    );
  }

  /**
   * 是否支持后台服务
   */
  get hasBackgroundSupport(): boolean {
    return this.services !== null;
  }

  /**
   * 初始化后台服务
   */
  initialize(onTimerEnd: (state: TimingStateKey) => void): void {
    if (this.isInitialized || !this.services) return;

    // 设置计时结束回调
    this.services.onTimerEnd = (state: TimingStateKey) => {
      console.log("[TimerService] Background timer ended:", state);
      onTimerEnd(state);
    };

    this.isInitialized = true;
    console.log("[TimerService] Initialized with background support");
  }

  /**
   * 启动后台计时器
   */
  startBackgroundTimer(
    duration: number,
    state: TimingStateKey,
    interval = 1000,
  ): void {
    if (!this.services) {
      console.warn("[TimerService] Background services not available");
      return;
    }
    this.services.startBackgroundTimer(duration, interval, state);
  }

  /**
   * 停止后台计时器
   */
  stopBackgroundTimer(): void {
    if (!this.services) return;
    this.services.stopBackgroundTimer();
  }

  /**
   * 获取后台计时器剩余时间
   */
  getRemainingTime(): number {
    if (!this.services) return 0;
    return this.services.getRemainingTime();
  }

  /**
   * 显示系统通知
   */
  showNotification(title: string, body: string): void {
    if (this.services) {
      this.services.showNotification(title, body);
    } else {
      // 降级使用 utools API
      utools.showNotification(`${title}\n${body}`);
    }
  }

  /**
   * 存储数据
   */
  setStore(key: string, value: unknown): void {
    if (this.services) {
      this.services.setStore(key, value);
    } else {
      utools.dbStorage.setItem(key, value);
    }
  }

  /**
   * 获取存储数据
   */
  getStore<T>(key: string): T | null {
    if (this.services) {
      return this.services.getStore(key) as T | null;
    }
    return utools.dbStorage.getItem(key) as T | null;
  }
}

// 导出单例
export const timerService = TimerService.getInstance();
