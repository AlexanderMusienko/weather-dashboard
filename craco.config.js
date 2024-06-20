const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
      alias: {
        "@icons": resolvePath("./src/icons"),
        "@utils": resolvePath("./src/utils")
      }
    },
  };