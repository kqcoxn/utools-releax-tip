const { ipcRenderer, Notification } = require("electron");

/**
 * 后台计时器状态
 */
let backgroundTimer = null;
let timerEndTime = 0;
let timerInterval = null;

/**
 * 通过 window 对象向渲染进程注入 nodejs 能力
 */
window.services = {
  // ==================== 计时器管理 ====================

  /**
   * 启动后台计时器
   * @param {number} duration - 计时时长（毫秒）
   * @param {number} interval - 检查间隔（毫秒）
   * @param {string} state - 计时状态 ('focus' | 'relax')
   */
  startBackgroundTimer: (duration, interval, state) => {
    // 清除现有计时器
    window.services.stopBackgroundTimer();

    timerEndTime = Date.now() + duration;

    // 设置定时检查
    timerInterval = setInterval(() => {
      const remaining = timerEndTime - Date.now();

      if (remaining <= 0) {
        // 计时结束，发送通知
        window.services.stopBackgroundTimer();
        window.services.onTimerEnd(state);
      }
    }, interval);

    console.log("[BackgroundTimer] Started:", { duration, state });
  },

  /**
   * 停止后台计时器
   */
  stopBackgroundTimer: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerEndTime = 0;
    console.log("[BackgroundTimer] Stopped");
  },

  /**
   * 获取剩余时间
   * @returns {number} 剩余时间（毫秒）
   */
  getRemainingTime: () => {
    return Math.max(timerEndTime - Date.now(), 0);
  },

  /**
   * 计时结束回调（由渲染进程覆盖）
   */
  onTimerEnd: (state) => {
    console.log("[BackgroundTimer] Timer ended:", state);
  },

  // ==================== 通知 ====================

  /**
   * 显示系统通知
   * @param {string} title - 标题
   * @param {string} body - 内容
   */
  showNotification: (title, body) => {
    const notification = new Notification({
      title,
      body,
      silent: false,
    });
    notification.show();
    return notification;
  },

  // ==================== 存储 ====================

  /**
   * 获取存储值
   */
  getStore: (key) => {
    return utools.dbStorage.getItem(key);
  },

  /**
   * 设置存储值
   */
  setStore: (key, value) => {
    utools.dbStorage.setItem(key, value);
  },
};
