/** @type {import('next').NextConfig} */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true,
  },
  styles: {
    css: [
      'trumbowyg/dist/ui/trumbowyg.min.css',
      'trumbowyg/dist/plugins/upload/trumbowyg.upload.min.css',
    ],
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce"),
            to: path.join(__dirname, "public/assets/libs/tinymce"),
          },
        ],
      })
    );
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
}

module.exports = nextConfig
