import { onUnmounted } from "vue";
import type { EventMap } from "../types";

type EventKey = keyof EventMap;

type EventCallback<T> = (payload: T) => void;

/**
 * 事件总线
 * 用于解耦 Store 之间的依赖
 */
class EventBus {
  private listeners = new Map<EventKey, Set<EventCallback<unknown>>>();

  /**
   * 订阅事件
   */
  on<K extends EventKey>(
    event: K,
    callback: EventCallback<EventMap[K]>,
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    const callbacks = this.listeners.get(event)!;
    callbacks.add(callback as EventCallback<unknown>);

    // 返回取消订阅函数
    return () => this.off(event, callback);
  }

  /**
   * 取消订阅
   */
  off<K extends EventKey>(
    event: K,
    callback: EventCallback<EventMap[K]>,
  ): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback as EventCallback<unknown>);
    }
  }

  /**
   * 触发事件
   */
  emit<K extends EventKey>(event: K, payload: EventMap[K]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(payload));
    }
  }

  /**
   * 清除所有监听器
   */
  clear(): void {
    this.listeners.clear();
  }
}

// 单例实例
const eventBus = new EventBus();

/**
 * 使用事件总线 Hook
 * 自动管理生命周期
 */
export function useEventBus() {
  const unsubscribers: Array<() => void> = [];

  /**
   * 订阅事件（自动清理）
   */
  function on<K extends EventKey>(
    event: K,
    callback: EventCallback<EventMap[K]>,
  ): void {
    const unsubscribe = eventBus.on(event, callback);
    unsubscribers.push(unsubscribe);
  }

  /**
   * 触发事件
   */
  function emit<K extends EventKey>(event: K, payload: EventMap[K]): void {
    eventBus.emit(event, payload);
  }

  // 组件卸载时自动清理
  onUnmounted(() => {
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  });

  return { on, emit };
}

// 导出原始事件总线（用于非组件场景）
export { eventBus };

// 导出类型
export type { EventKey, EventCallback };
