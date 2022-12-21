let header__burger = document.querySelector('.fullscreen__burger');
let header__menu = document.querySelector('.fullscreen__header');
let back = document.querySelector('body');
let header__list = document.querySelector('.fullscreen__list');
let fullscreen__title = document.querySelector('.fullscreen__title');
let fullscreen__text = document.querySelector('.fullscreen__text');

header__burger.addEventListener('click', function(){
    header__burger.classList.toggle('active');
    header__menu.classList.toggle('active');
	 fullscreen__text.classList.toggle('activeMod');
	 fullscreen__title.classList.toggle('active');
    back.classList.toggle('lock');
})

header__list.onclick = function () {
    header__list.classList.remove('active');
    back.classList.toggle('lock');
}