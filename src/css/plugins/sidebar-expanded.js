const plugin = require('tailwindcss/plugin');

module.exports = plugin.withOptions(() => {
  return function({addVariant, e}) {
    addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
    });
  };
})