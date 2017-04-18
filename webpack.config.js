const ngtools = require('@ngtools/webpack');
const path = require('path');

module.exports = {
	resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './src/main.ts',
  output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	target: 'node',
	module: {
		rules: [{
      test: /\.ts$/,
      loader: '@ngtools/webpack',
    }]
	},
  plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig.json',
		})
	]
};
