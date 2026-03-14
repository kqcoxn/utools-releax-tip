import { defineStore } from "pinia";

import { useHitokotoStore } from "./hitokotoStore";

const panels = {
  main: {
    key: "main",
    name: "主面板",
  },
};

export const useStatusStore = defineStore("StatusStore", {
  state: () => ({
    isOnWindow: false,
    operationPanel: panels.main,
  }),
  getters: {
    // 是否升起窗口
    isUpperPanel: (state) => {
      switch (state.operationPanel.key) {
        case "main":
          return false;
        default:
          return true;
      }
    },
  },
  actions: {
    // 切换面板
    switchPanel(key) {
      if (key == "main") {
        const hitokotoStore = useHitokotoStore();
        hitokotoStore.getHitokoto(false, false);
      }
      this.operationPanel = panels[key];
    },
  },
});
