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
}());
