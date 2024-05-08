process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  publicPath: "/mafia/",
  filenameHashing: false,
  pluginOptions: {
    i18n: {
      locale: "fa",
      fallbackLocale: "fa",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
