import { defineStore } from "pinia";
import { Timer } from "kqtk";

import settings from "../settings";
import { Message } from "../utils/notifier";

export const useHitokotoStore = defineStore("HitokotoStore", {
  state: () => ({
    hitokoto: "",
    author: "",
    from: "",
    lastGetTime: 0,
  }),
  getters: {},
  actions: {
    test() {},

    async getHitokoto(isActive = false, laterSwitch = true) {
      // 防止频繁请求
      let nowTime = Timer.getTimestamp();
      if (nowTime - this.lastGetTime < settings.hitokoto.getInterval) {
        if (isActive) {
          Message.warning("刷新过于频繁，请稍后再试🥺");
        }
        return;
      }
      this.lastGetTime = nowTime;
      // 发送请求
      await fetch(`${settings.hitokoto.apiBaseUrl}?c=i`)
        .then((res) => res.json())
        .then((data) => {
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
        })
        .catch(() => {});
    },
  },
});
