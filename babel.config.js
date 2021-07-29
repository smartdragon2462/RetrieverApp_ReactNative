module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv'
  ],
  plugins: [
    'add-react-displayname',
    './node_modules/@heap/react-native-heap/instrumentor/src/index.js'
  ],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
