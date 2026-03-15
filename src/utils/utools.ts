/**
 * utools API 封装类
 */
export class Utools {
  // ==================== 回调事件 ====================

  /**
   * 注册进入插件回调
   */
  static onEnter(callback: () => void): void {
    utools.onPluginEnter(callback);
  }

  /**
   * 注册退出插件回调
   */
  static onHide(callback: (isKill: boolean) => void): void {
    utools.onPluginOut(callback);
  }

  // ==================== 本地存储 ====================

  /**
   * 获取存储值
   */
  static get<T>(key: string): T | null {
    return utools.dbStorage.getItem(key) as T | null;
  }

  /**
   * 设置存储值
   */
  static set<T>(key: string, value: T): void {
    utools.dbStorage.setItem(key, value);
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
    utools.dbStorage.removeItem(key);
  }

  // ==================== 窗口控制 ====================

  /**
   * 显示窗口
   */
  static showWindow(_isOnWindow: boolean): void {
    utools.showMainWindow();
  }

  /**
   * 隐藏窗口
   */
  static hideWindow(restorePreWindow = true): void {
    utools.hideMainWindow(restorePreWindow);
  }

  /**
   * 退出插件
   */
  static outPlugin(isKill = false): void {
    utools.outPlugin(isKill);
  }

  // ==================== 通知 ====================

  /**
   * 显示系统通知
   */
  static showNotification(title: string, body?: string): void {
    utools.showNotification(body ? `${title}\n${body}` : title);
  }

  // ==================== 复制 ====================

  /**
   * 复制文本到剪贴板
   */
  static copyText(text: string): void {
    utools.copyText(text);
  }

  // ==================== 窗口类型判断 ====================

  /**
   * 获取窗口类型
   */
  static getWindowType(): "main" | "detach" | "browser" {
    return utools.getWindowType();
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
    return utools.isDarkColors();
  }
}

// 导出默认实例，保持向后兼容
const ut = Utools;
export default ut;
