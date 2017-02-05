(function() {

  function setPortfolioPageHeight() {
    var windowHeight = $(window).height();
    $('#portfolio').height(windowHeight);
  }

  function setHomePageHeight() {
    var windowHeight = $(window).height();
    $('#home').css('height', 'calc(' + windowHeight + 'px - calc(50px + 1rem))');
  }


  $().ready(function() {
    setPortfolioPageHeight();
    setHomePageHeight();
  });

  var resizeTimer;

  $(window).resize(function() {
    clearTimeout(resizeTimer);
    setTimeout(function() {
      setPortfolioPageHeight();
      setHomePageHeight();
    }, 250);
  });
  // var $portfolioTopHalf = $('#portfolio-top-half').sticky({
  //   topSpacing: 0,
  //   center: true
  // })
  // var $portfolioJumbotron = $('#portfolio-jumbotron')
  // })
  // .sticky({topSpacing:0});

  // $(window).on('scroll', function() {
   
  // });

}());