/** @type {import("@flagly/node").Config } */
module.exports = {
  flagSource: (key, defaultValue) => {
    if (key === 'feature-A') return true;
  },
};
