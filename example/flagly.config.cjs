/** @type {import("@flagly/node").Config } */
module.exports = {
  flagSource: (key, defaultValue) => {
    if (key === 'feature-A') {
      return false;
    } else if (key === 'feature-B') {
      return true;
    } else {
      return true;
    }
  },
};
