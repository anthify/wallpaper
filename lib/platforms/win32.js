'use strict';

var shell = require('shelljs');
var log4js = require('log4js');

var logger = log4js.getLogger('wallpaper');
var WIN32_WALLPAPER_SETTER = '../bridge/wallpaper.exe';

exports.set = function (options, callback) {
  var command = WIN32_WALLPAPER_SETTER
    + ' ' + options.file
    + ' ' + options.style;

  shell.exec(command, function (code, output) {
    switch (code) {
      case 0:
        if (typeof callback != 'undefined') {
          callback(true);
        }
        break;
      case -1:
        logger.fatal('invalid parameters');
        logger.fatal(output);
        process.exit(-1);
        break;
      case -2:
        logger.fatal('doesn\'t support JPG file. The .jpg wallpapers are not supported before Windows Vista.');
        logger.fatal('please use .bmp instead.');
        process.exit(-1);
        break;
      case -3:
        logger.fatal('doesn\'t support Fit or Fill style. The styles are not supported before Windows 7.');
        logger.fatal('please use other styles instead.');
        process.exit(-1);
        break;
      case -4:
        logger.fatal('cannot set wallpaper for your System.');
        process.exit(-1);
        break;
      default:
        break;
    }
  });
};

// Reference:
//   https://code.msdn.microsoft.com/windowsdesktop/CppSetDesktopWallpaper-eb969505