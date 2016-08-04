module.exports = function(ret, conf, settings, opt) {
  fis.util.map(ret.src, function(subpath, file) {
    var fileId = file.getId();
    var include = settings.include;
    var deploy = false;
    if (typeof include == 'string') {
      var regexp = new RegExp('^' + include + '$');
      regexp.test(fileId) && (deploy = true);
    } else if (typeof include == 'object' && include instanceof Array) {
      include.forEach(function(src, index) {
        var regexp = new RegExp('^' + src + '$');
        regexp.test(fileId) && (deploy = true);
      })
    }
    if (!deploy) {
      file.requires = [];
      file.release = false;
    }
  });

};
