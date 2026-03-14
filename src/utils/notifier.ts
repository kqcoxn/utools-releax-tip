import { ElMessage } from "element-plus";

/**
 * 消息通知类型
 */
type MessageType = "info" | "success" | "warning" | "error";

/**
 * 消息通知选项
 */
interface MessageOptions {
  type?: MessageType;
  duration?: number;
}

/**
 * 消息通知类
 */
export class Message {
  /**
   * 显示消息
   */
  static show(msg: string, options: MessageOptions = {}): void {
    const { type = "info", duration = 3000 } = options;
    ElMessage({
      type,
      message: msg,
      grouping: true,
      showClose: true,
      duration,
    });
  }

  /**
   * 成功消息
   */
  static success(msg: string): void {
    this.show(msg, { type: "success" });
  }

  /**
   * 警告消息
   */
  static warning(msg: string): void {
    this.show(msg, { type: "warning" });
  }

  /**
   * 错误消息
   */
  static error(msg: string): void {
    this.show(msg, { type: "error" });
  }

  /**
   * 信息消息
   */
  static info(msg: string): void {
    this.show(msg, { type: "info" });
  }
}
