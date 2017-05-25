var Webpack_isomorphic_tools_plugin = require( 'webpack-isomorphic-tools/plugin');

module.exports= {
  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif'],
      parser: Webpack_isomorphic_tools_plugin.url_loader_parser
    },
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'eot'],
      parser: Webpack_isomorphic_tools_plugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      parser: Webpack_isomorphic_tools_plugin.url_loader_parser
    },
    styles: {
      extensions: ['css', 'less', 'sass', 'scss'],
      filter(module, regex, options, log) {
        return options.development
          ? Webpack_isomorphic_tools_plugin.style_loader_filter(module, regex, options, log)
          : regex.test(module.name);
      },
      path(module, options, log) {
        return options.development
          ? Webpack_isomorphic_tools_plugin.style_loader_path_extractor(module, options, log)
          : module.name;
      },
      parser(module, options, log) {
        return options.development
          ? Webpack_isomorphic_tools_plugin.css_modules_loader_parser(module, options, log)
          : module.source;
      }
    }
  }
};
