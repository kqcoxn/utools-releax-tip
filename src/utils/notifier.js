import { ElMessage } from "element-plus";

export class Message {
  static show(msg, { type = "info" } = {}) {
    ElMessage({
      type: type,
      message: msg,
      grouping: true,
      showClose: true,
    });
  }

  static success(msg) {
    Message.show(msg, { type: "success" });
  }

  static warning(msg) {
    Message.show(msg, { type: "warning" });
  }
}
