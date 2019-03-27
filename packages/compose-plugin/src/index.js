/* 
this plugin should compose a standard plugin call for example
// maleo.config.js
module.exports = tsPlugin(cssPlugin(options));

into
module.exports = compose(
  [
    [tsPlugin, tsOptions],
    [cssPlugin, cssOptions],
  ],
  // user option
  {
    webpack(config, context, next) {
      // user's custom config
      return next()
    }
  }
)

*/
import chalk from 'chalk';

module.exports = function compose(plugins = [], userConfig = {}, index = 0) {
  !index &&
    console.log(
      '-',
      chalk.underline.green('Applying'),
      chalk.underline.green.bold('[@airy/maleo-compose-plugin]'),
    );

  const [plugin, option] = plugins[index];

  if (typeof plugin !== 'function') {
    console.log(
      chalk.bgRed('\n\nERROR'),
      chalk.red.underline.bold('[@airy/maleo-compose-plugin]'),
      chalk.red.bold('\nPlugin index: ' + index),
      chalk.red('\nThe first index must be an Array'),
    );
    throw new Error();
  }

  // if it doesn't have any plugin left, use user config instead
  let nextPlugin = userConfig;
  if (plugins[++index]) {
    nextPlugin = compose(
      plugins,
      userConfig,
      index,
    );
  }

  return plugin({
    ...option,
    ...nextPlugin,
  });
};
