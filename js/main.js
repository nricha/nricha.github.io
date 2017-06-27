(function() {

  function setAboutPageHeight() {
    var windowHeight = $(window).height();
    $('#about').height(windowHeight + 'px');
  }

  $().ready(function() {
    setAboutPageHeight();
  });

  var resizeTimer;

  $(window).resize(function() {
    clearTimeout(resizeTimer);
    setTimeout(function() {
      setAboutPageHeight();
    }, 250);
  });

  $(window).on('activate.bs.scrollspy', function (evt, activated) {
  });
}());
