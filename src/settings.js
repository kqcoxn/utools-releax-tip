// 判断是否为开发环境
const isDev =
  typeof utools === "undefined" || utools.env?.mode === "development";

const msMulti = 1;

const settings = {
  isDev: isDev,
  timing: {
    msMulti: 1 * msMulti,
    secMulti: 1000 * msMulti,
    minMulti: 60000 * msMulti,
    hourMulti: 3600000 * msMulti,
  },
  hitokoto: {
    apiBaseUrl: "http://hitokoto.codax.site",
    getInterval: 2000, // 2s
  },
};

export default settings;
