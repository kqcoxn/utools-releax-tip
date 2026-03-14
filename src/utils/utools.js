import settings from "../settings";

export default class ut {
  // 回调
  static onEnter(callback) {
    utools.onPluginEnter(callback);
  }
  static onHide(callback) {
    utools.onPluginOut((isKill) => {
      callback(isKill);
    });
  }

  // 本地存储
  static get(key) {
    return utools.dbStorage.getItem(key);
  }
  static set(key, value) {
    utools.dbStorage.setItem(key, value);
  }
  static load(key, defaultValue) {
    let value = ut.get(key);
    if (!value) {
      value = defaultValue;
      ut.set(key, value);
    }
    return value;
  }

  // 窗口显示
  static showWindow(isOnWindow) {
    if (isOnWindow) {
      utools.showMainWindow();
    } else {
      utools.redirect("休息提醒");
    }
  }

  // 复制文本
  static copyText(text) {
    utools.copyText(text);
  }

  // 窗口类型判断
  static getWindowType() {
    return utools.getWindowType();
  }
  static isMainWindow() {
    return utools.getWindowType() === "main";
  }
  static isDetachWindow() {
    return utools.getWindowType() === "detach";
  }

  // 深色主题判断
  static isDarkColors() {
    return utools.isDarkColors();
  }
}
