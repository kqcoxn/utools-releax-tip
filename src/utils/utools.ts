/**
 * utools API 封装类
 */

// 检查是否在 uTools 环境中运行
const isUtoolsEnv = typeof window !== "undefined" && "utools" in window;

// 获取 utools 对象
const utoolsObj = isUtoolsEnv
  ? (window as unknown as { utools: typeof utools }).utools
  : null;

export class Utools {
  // ==================== 回调事件 ====================

  /**
   * 注册进入插件回调
   */
  static onEnter(callback: () => void): void {
    if (!utoolsObj) return;
    utoolsObj.onPluginEnter(callback);
  }

  /**
   * 注册退出插件回调
   */
  static onHide(callback: (isKill: boolean) => void): void {
    if (!utoolsObj) return;
    utoolsObj.onPluginOut(callback);
  }

  // ==================== 本地存储 ====================

  /**
   * 获取存储值
   */
  static get<T>(key: string): T | null {
    if (!utoolsObj) return null;
    return utoolsObj.dbStorage.getItem(key) as T | null;
  }

  /**
   * 设置存储值
   */
  static set<T>(key: string, value: T): void {
    if (!utoolsObj) return;
    utoolsObj.dbStorage.setItem(key, value);
  }

  /**
   * 加载存储值，不存在则使用默认值
   */
  static load<T>(key: string, defaultValue: T): T {
    let value = this.get<T>(key);
    if (value === null || value === undefined) {
      value = defaultValue;
      this.set(key, value);
    }
    return value;
  }

  /**
   * 删除存储值
   */
  static remove(key: string): void {
    if (!utoolsObj) return;
    utoolsObj.dbStorage.removeItem(key);
  }

  // ==================== 窗口控制 ====================

  /**
   * 显示窗口
   */
  static showWindow(isOnWindow: boolean): void {
    if (!utoolsObj) return;
    if (isOnWindow && document.visibilityState === "visible") return;
    utoolsObj.showMainWindow();
    (utoolsObj as unknown as { redirect: (label: string) => void }).redirect(
      "休息提醒",
    );
  }

  /**
   * 强制显示窗口
   */
  static forceShowWindow(): void {
    if (!utoolsObj) return;
    utoolsObj.showMainWindow();
    (utoolsObj as unknown as { redirect: (label: string) => void }).redirect(
      "休息提醒",
    );
  }

  /**
   * 隐藏窗口
   */
  static hideWindow(restorePreWindow = true): void {
    if (!utoolsObj) return;
    utoolsObj.hideMainWindow(restorePreWindow);
  }

  /**
   * 退出插件
   */
  static outPlugin(isKill = false): void {
    if (!utoolsObj) return;
    utoolsObj.outPlugin(isKill);
  }

  // ==================== 通知 ====================

  /**
   * 显示系统通知
   */
  static showNotification(title: string, body?: string): void {
    if (!utoolsObj) {
      alert(body ? `${title}\n${body}` : title);
      return;
    }
    utoolsObj.showNotification(body ? `${title}\n${body}` : title);
  }

  // ==================== 复制 ====================

  /**
   * 复制文本到剪贴板
   */
  static copyText(text: string): void {
    if (!utoolsObj) {
      navigator.clipboard?.writeText(text);
      return;
    }
    utoolsObj.copyText(text);
  }

  // ==================== 窗口类型判断 ====================

  /**
   * 获取窗口类型
   */
  static getWindowType(): "main" | "detach" | "browser" {
    if (!utoolsObj) return "browser";
    return utoolsObj.getWindowType();
  }

  /**
   * 是否为主窗口
   */
  static isMainWindow(): boolean {
    return this.getWindowType() === "main";
  }

  /**
   * 是否为分离窗口
   */
  static isDetachWindow(): boolean {
    return this.getWindowType() === "detach";
  }

  // ==================== 主题判断 ====================

  /**
   * 是否为深色主题
   */
  static isDarkColors(): boolean {
    if (!utoolsObj) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return utoolsObj.isDarkColors();
  }
}

// 导出默认实例，保持向后兼容
const ut = Utools;
export default ut;
