declare module "kqtk" {
  export class Timer {
    constructor(
      autoStart?: boolean,
      options?: {
        defaultUnit?: string;
        defaultPrecision?: number;
      },
    );
    start(): void;
    end(): number;
    duration(): number;
    static getTimestamp(): number;
    static format(time: number, format: string): string;
  }
}
