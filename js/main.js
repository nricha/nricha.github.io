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
    // $('#portfolio-top-half').removeClass('fixed-top-half');
    // $('#portfolio-bottom-half').removeClass('fixed-top-half');
    // $('#about-top-half').removeClass('fixed-top-half');
    // $('#about-bottom-half').removeClass('fixed-top-half');
    // if (activated.relatedTarget === '#home') {

    // } else if (activated.relatedTarget === '#portfolio' || activated.relatedTarget === '#about') {
    //   $('#portfolio-top-half').addClass('fixed-top-half');
    //   $('#portfolio-bottom-half').addClass('fixed-top-half');
    //   $('#about-top-half').addClass('fixed-top-half');
    //   $('#about-bottom-half').addClass('fixed-top-half');
    // }
  });
}());
