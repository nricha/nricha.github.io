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

  $('button.navbar-toggler').click((evt) => {
    const $currentTarget = $(evt.currentTarget);
    let ariaExpanded = $currentTarget.attr('aria-expanded');
    ariaExpanded = ariaExpanded === 'true';
    $currentTarget.attr('aria-expanded', !ariaExpanded);
    const $hamburger = $('#navbarNavAltMarkup');
    $hamburger.toggleClass('show');

    $('.nav-link').on('click', () => {
      closeHamburger();
      $('.nav-link').off('click');
    });

    $currentTarget.find('.close-icon').on('click', (event) => {
      closeHamburger();
      event.preventDefault();
      event.stopPropagation();
      $currentTarget.find('.close-icon').off('click');
      return false;
    });
  });

  function closeHamburger() {
    const $menuToggler = $('button.navbar-toggler');
    let ariaExpanded = $menuToggler.attr('aria-expanded');
    ariaExpanded = ariaExpanded === 'true';
    $menuToggler.attr('aria-expanded', !ariaExpanded);
    const $hamburger = $('#navbarNavAltMarkup');
    $hamburger.removeClass('show');
  }
}());
