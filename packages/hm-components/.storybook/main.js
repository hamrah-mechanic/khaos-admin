const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    'storybook-css-modules-preset',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        }
      },
    },
  ],
  
  webpackFinal: config => {
    config.resolve.modules.push(path.resolve(__dirname, '..'), 'node_modules');
    config.resolve.roots = [path.resolve(__dirname, '../public')];
    return config;
  },
}