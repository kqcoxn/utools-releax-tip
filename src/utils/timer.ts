/**
 * Timer 工具类
 * 提供时间格式化和时间戳获取功能
 */
export class Timer {
  private startTime: number;

  constructor(autoStart = true) {
    this.startTime = autoStart ? Date.now() : 0;
  }

  /**
   * 启动计时器
   */
  start(): void {
    this.startTime = Date.now();
  }

  /**
   * 结束计时并返回耗时
   */
  end(): number {
    return Date.now() - this.startTime;
  }

  /**
   * 获取当前计时持续时间
   */
  duration(): number {
    return Date.now() - this.startTime;
  }

  /**
   * 获取当前时间戳（毫秒）
   */
  static getTimestamp(): number {
    return Date.now();
  }

  /**
   * 格式化时间
   * @param time 时间（毫秒）
   * @param format 格式字符串，支持 hh:mm:ss 或 mm:ss
   * @returns 格式化后的时间字符串
   */
  static format(time: number, format: string): string {
    // 将毫秒转换为秒
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // 补零函数
    const pad = (num: number): string => num.toString().padStart(2, "0");

    if (format === "hh:mm:ss") {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else if (format === "mm:ss") {
      return `${pad(minutes)}:${pad(seconds)}`;
    }

    // 默认返回 mm:ss 格式
    return `${pad(minutes)}:${pad(seconds)}`;
  }
}
