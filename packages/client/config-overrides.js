const CircularDependencyPlugin = require('circular-dependency-plugin')
const { merge } = require('lodash')

const customConfig = require('./webpack.config')

module.exports = (defaultConfig) => {
  let config = merge({}, defaultConfig, customConfig)

  config.plugins.forEach((plugin) => {
    if (plugin.options?.failOnError) {
      plugin.options.failOnError = false
    }
  })

  config.plugins.push(
    new CircularDependencyPlugin({
      onDetected({ paths, compilation }) {
        compilation.errors.push(new Error(paths.join(' -> ')))
      },
      exclude: /node_modules/,
    })
  )

  return config
}
