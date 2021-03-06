module.exports = function(ret, conf, settings, opt) {
  if (opt.dest == 'preview') {
    return;
  }
  var dependence = [];
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
    if (deploy) {
      addDependence(file);
    }
    function addDependence(file) {
      var requires = file.requires;
      dependence.push(file.getId());
      dependence = dependence.concat(requires);
      requires.forEach(function(key ,index){
        addDependence(ret.ids[key]);
      });
    }
  });

  fis.util.map(ret.src, function(subpath, file) {
    if (dependence.indexOf(file.getId()) < 0 && (file.isHtmlLike || file.isJsLike || file.isCssLike)) {
      file.requires = [];
      file.release = false;
    }
  });
};
