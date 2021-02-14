const path = require('path')

const mapToFolder = (dependencies, folder) =>
  dependencies.reduce(
    (acc, dependency) => ({
      [dependency]: path.resolve(`${folder}/${dependency}`),
      ...acc,
    }),
    {}
  )

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@config': path.resolve(__dirname, './src/config'),
      '@api': path.resolve(__dirname, './src/api'),
      '@style': path.resolve(__dirname, './src/style'),
      '@globalTypes': path.resolve(__dirname, './src/globalTypes'),
      ...mapToFolder(
        ['react', 'react-dom', 'styled-components'],
        './node_modules'
      ),
    },
  },
}
