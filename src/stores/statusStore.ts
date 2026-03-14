import { defineStore } from "pinia";

import { useHitokotoStore } from "./hitokotoStore";
import type { Panel, PanelKey } from "../types";

const panels: Record<PanelKey, Panel> = {
  main: {
    key: "main",
    name: "主面板",
  },
  config: {
    key: "config",
    name: "设置",
  },
};

interface StatusStoreState {
  isOnWindow: boolean;
  operationPanel: Panel;
}

export const useStatusStore = defineStore("StatusStore", {
  state: (): StatusStoreState => ({
    isOnWindow: false,
    operationPanel: panels.main,
  }),

  getters: {
    // 是否升起窗口
    isUpperPanel(state): boolean {
      return state.operationPanel.key !== "main";
    },
  },

  actions: {
    // 切换面板
    switchPanel(key: PanelKey) {
      if (key === "main") {
        const hitokotoStore = useHitokotoStore();
        hitokotoStore.getHitokoto(false, false);
      }
      this.operationPanel = panels[key];
    },
  },
});
