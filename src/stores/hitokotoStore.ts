import { defineStore } from "pinia";
import { Timer } from "kqtk";

import settings from "../settings";
import { Message } from "../utils/notifier";
import type { HitokotoData } from "../types";

interface HitokotoStoreState {
  hitokoto: string;
  author: string;
  from: string;
  lastGetTime: number;
}

export const useHitokotoStore = defineStore("HitokotoStore", {
  state: (): HitokotoStoreState => ({
    hitokoto: "",
    author: "",
    from: "",
    lastGetTime: 0,
  }),

  getters: {},

  actions: {
    /**
     * 获取一言
     * @param isActive 是否主动触发（用于显示提示）
     * @param laterSwitch 是否延迟切换（用于动画效果）
     */
    async getHitokoto(isActive = false, laterSwitch = true) {
      // 防止频繁请求
      const nowTime = Timer.getTimestamp();
      if (nowTime - this.lastGetTime < settings.hitokoto.getInterval) {
        if (isActive) {
          Message.warning("刷新过于频繁，请稍后再试");
        }
        return;
      }
      this.lastGetTime = nowTime;

      // 发送请求
      try {
        const response = await fetch(`${settings.hitokoto.apiBaseUrl}?c=i`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: HitokotoData = await response.json();

        if (laterSwitch) {
          this.hitokoto = "";
          setTimeout(() => {
            this.hitokoto = data.hitokoto;
            this.from = data.from;
            this.author = data.from_who;
          }, 600);
        } else {
          this.hitokoto = data.hitokoto;
          this.from = data.from;
          this.author = data.from_who;
        }
      } catch (error) {
        console.error("[Hitokoto] 请求失败:", error);
        // 设置默认文案
        this.hitokoto = "休息一下，保护眼睛";
        this.author = "";
        this.from = "";
      }
    },
  },
});
