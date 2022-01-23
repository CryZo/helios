const path = require('path')
const sass = require("sass");
const sassVars = require(__dirname + "/theme.js");

const colors = {
    primary: sassVars.themeColors.primary,
};

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    functions: {
                        "getThemeColors()": function() {
                            if (sassVars.themeColors) {
                                var ret = new sass.types.Map(Object.keys(sassVars.themeColors).length);
    
                                var counter = 0;
                                Object.keys(sassVars.themeColors).forEach(i => {
                                    let curCol = sassVars.themeColors[i];
                                    ret.setKey(counter, new sass.types.String(i));
    
                                    if(sassVars.themeColors[i].substring(0,1) === '#' && sassVars.themeColors[i].length === 7) {
                                        ret.setValue(counter, new sass.types.Color(
                                            parseInt(curCol.substr(1, 2), 16),
                                            parseInt(curCol.substr(3, 2), 16),
                                            parseInt(curCol.substr(5, 2), 16),
                                            1.0
                                        ));
                                    }
                                    else {
                                        ret.setValue(counter, new sass.types.Color(0,0,0,1)) //Fallback
                                    }
    
                                    counter++;
                                })
                                
                                return ret;
                            }

                            return new sass.types.Map(0);
                        }
                    }
                }
            }
        }
    },

    pwa: {
        name: process.env.VUE_APP_TITLE,
        themeColor: colors.primary,
        msTileColor: colors.primary,
        iconPaths: {
            favicon32: 'img/logos/fav_32.png',
            favicon16: 'img/logos/fav_16.png',
            appleTouchIcon: 'img/logos/logo_152h.png',
            maskIcon: null,
            msTileImage: 'img/logos/logo_144h.png'
        },

        manifestOptions: {
            name: process.env.VUE_APP_TITLE,
            short_name: process.env.VUE_APP_TITLE,
            start_url: "./rooms",
            display: "standalone",
            theme_color: colors.primary,
            background_color: colors.primary,
            icons: [
                {
                    src: "./img/logos/logo_32h.png",
                    sizes: "38x32",
                    type: "image/png",
                },
                {
                    src: "./img/logos/logo_64h.png",
                    sizes: "76x64",
                    type: "image/png",
                },
                {
                    src: "./img/logos/logo_144h.png",
                    sizes: "170x144",
                    type: "image/png",
                },
                {
                    src: "./img/logos/logo_152h.png",
                    sizes: "180x152",
                    type: "image/png",
                },
                {
                    src: "./img/logos/logo_256h.png",
                    sizes: "303x256",
                    type: "image/png",
                },
                {
                    src: "./img/logos/logo_512h.png",
                    sizes: "605x512",
                    type: "image/png",
                },
                {
                    src: "./img/logos/logo_1024h.png",
                    sizes: "1211x1024",
                    type: "image/png",
                }
            ],
        },
    },

    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         // mutate config for production...
    //     } else {
    //         // mutate for development...
    //     }
    //     config.resolve.extensions.splice(config.resolve.extensions.indexOf('.json'))
    // },

    // chainWebpack: config => {
    //     config.module
    //         // for i18n resources (json/json5/yaml)
    //         .rule('i18n')
    //         .test(/\.(json5?|ya?ml)$/)
    //         .include
    //             .add(function() {
    //                 return [path.resolve(__dirname, './src/locales')]
    //             })
    //             .end()
    //         .use('@intlify/vue-i18n-loader')
    //             .loader('@intlify/vue-i18n-loader')
    //             .end()
    // }

    pluginOptions: {
        i18n: {
          fallbackLocale: 'en',
          localeDir: 'locales',
          enableInSFC: false,
          enableLegacy: false,
          runtimeOnly: false,
          compositionOnly: false,
          fullInstall: true
        }
    }
}
