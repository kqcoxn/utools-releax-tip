import settings from "../settings";

export default class ut {
  // 回调
  static onEnter(callback) {
    utools.onPluginEnter(callback);
  }
  static onHide(callback) {
    utools.onPluginOut(callback);
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
}
