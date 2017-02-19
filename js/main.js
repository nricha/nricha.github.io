(function() {

  function setPortfolioPageHeight() {
    var windowHeight = $(window).height();
    $('#portfolio .top-half').height(windowHeight / 2);
  }

  function setAboutPageHeight() {
    var windowHeight = $(window).height();
    $('#about .top-half').height(windowHeight / 2);
    $('#about .bottom-half').height(windowHeight / 2);
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
    $('nav').addClass('navbar fixed-top navbar-toggleable-sm navbar-light bg-faded')
    if (activated.relatedTarget === '#home') {

    } else if (activated.relatedTarget === '#portfolio') {
      $('nav').addClass('project-details');
    } else if(activated.relatedTarget === '#about') {
      $('nav').addClass('about-page-nav')
    }
  });
}());
