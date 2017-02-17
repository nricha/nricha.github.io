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

  function setHomePageHeight() {
    var windowHeight = $(window).height();
    // $('#home').css('height', 'calc(' + windowHeight + 'px - calc(50px + 1rem))');
  }


  $().ready(function() {
    setPortfolioPageHeight();
    setAboutPageHeight();
    setHomePageHeight();
  });

  var resizeTimer;

  $(window).resize(function() {
    clearTimeout(resizeTimer);
    setTimeout(function() {
      setPortfolioPageHeight();
      setAboutPageHeight();
      setHomePageHeight();
    }, 250);
  });
}());
