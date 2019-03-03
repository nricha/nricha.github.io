((window) => {
  const setAboutPageHeight = () => {
    const windowHeight = $(window).height();
    $('#about').height(windowHeight + 'px');
  };

  $().ready(() => {
    setAboutPageHeight();
  });

  let resizeTimer;

  $(window).resize(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setAboutPageHeight();
    }, 250);
  });

  $('button.navbar-toggler').click((evt) => {
    const $currentTarget = $(evt.currentTarget);
    const ariaExpanded = ($currentTarget.attr('aria-expanded') === 'true');
    $currentTarget.attr('aria-expanded', !ariaExpanded);
    const $hamburger = $('#navbarNav');
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

  const closeHamburger = () => {
    const $menuToggler = $('button.navbar-toggler');
    const ariaExpanded = ($menuToggler.attr('aria-expanded') === 'true');
    $menuToggler.attr('aria-expanded', !ariaExpanded);
    const $hamburger = $('#navbarNav');
    $hamburger.removeClass('show');
  }
})(window);
