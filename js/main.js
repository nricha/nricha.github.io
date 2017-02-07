(function() {

  function setPortfolioPageHeight() {
    var windowHeight = $(window).height();
    $('#portfolio .top-half').height(windowHeight / 2);
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

  $('.project-click-target').click(function(event) {
    var partialUrl = './' + $(this).attr('href').replace('#', '') + '/partial.html' ;
    $.get(partialUrl, function(partialText) {
      $('section').fadeOut();
      $('body').removeClass('show-bg');
      $('.homepage-container').append(partialText);
    });
    event.preventDefault();
  });


  window.closePartial = function(partialId) {
    $('#' + partialId).fadeOut(function() {
      $('section').fadeIn();
      $('body').addClass('show-bg');

    }).remove();
  }
}());