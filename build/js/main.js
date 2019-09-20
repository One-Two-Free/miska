var navButton = document.querySelector('.main-nav__button');
var mainNav = document.querySelector('.main-nav');

var Toggler = function () {
  if(mainNav.classList.contains('main-nav--opened')) {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
    return;
  }

  mainNav.classList.remove('main-nav--closed');
  mainNav.classList.add('main-nav--opened');
};

navButton.addEventListener('click', Toggler);