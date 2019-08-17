const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

const path = require("path");
const CopywebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),

      // Needed to compile multiline strings in Cesium
      sourcePrefix: ""
    },
    amd: {
      // Enable webpack-friendly use of require in Cesium
      toUrlUndefined: true
    },
    node: {
      // Resolve node module use of fs
      // (Propably only needing in NodeJS and not in browser)
      fs: "empty"
    },
    resolve: {
      alias: {
        // Cesium module name
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopywebpackPlugin([
        { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" }
      ]),
      new CopywebpackPlugin([
        { from: path.join(cesiumSource, "Assets"), to: "Assets" }
      ]),
      new CopywebpackPlugin([
        { from: path.join(cesiumSource, "Widgets"), to: "Widgets" }
      ]),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify("../")
      })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options['transformAssetUrls'] = {
          img: 'src',
          image: 'xlink:href',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'img-src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src'
        }

        return options
      })
  },

  // publicPath: undefined,
  // outputDir: undefined,
  assetsDir: "src/assets",
  // runtimeCompiler: undefined,
  // productionSourceMap: undefined,
  // parallel: undefined,

  // css: {
  //   modules: true
  // }
};
