(function() {

  function setPortfolioPageHeight() {
    var windowHeight = $(window).height();
    // $('#portfolio .top-half').height('170px');
  }

  function setAboutPageHeight() {
    var windowHeight = $(window).height();
    // $('#about .top-half').height('170px');
    $('#about').height(windowHeight + 'px');
  }

  $().ready(function() {
    setPortfolioPageHeight();
    setAboutPageHeight();
  });

  var resizeTimer;

  $(window).resize(function() {
    clearTimeout(resizeTimer);
    setTimeout(function() {
      setPortfolioPageHeight();
      setAboutPageHeight();
    }, 250);
  });

  $(window).on('activate.bs.scrollspy', function (evt, activated) {
    // make nav bg green
    $('nav').removeClass();
    $('#portfolio-top-half').removeClass('fixed-top-half');
    $('#portfolio-bottom-half').removeClass('fixed-top-half');
    $('#about-top-half').removeClass('fixed-top-half');
    $('#about-bottom-half').removeClass('fixed-top-half');
    
    $('nav').addClass('navbar fixed-top navbar-toggleable-sm navbar-light bg-faded')
    if (activated.relatedTarget === '#home') {

    } else if (activated.relatedTarget === '#portfolio' || activated.relatedTarget === '#about') {
      $('#portfolio-top-half').addClass('fixed-top-half');
      $('#portfolio-bottom-half').addClass('fixed-top-half');
      $('#about-top-half').addClass('fixed-top-half');
      $('#about-bottom-half').addClass('fixed-top-half');
    }
  });
}());
