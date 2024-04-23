const path = require('path');

module.exports = {
  /*entry: [
    'react-hot-loader/patch', // Add this line as the first item in the entry array
    './src/index.js', // Your main entry file
  ],*/
  resolve: {
    fallback: {
      "url": require.resolve("url/")
    }
  },
  // Other webpack configuration settings...
};