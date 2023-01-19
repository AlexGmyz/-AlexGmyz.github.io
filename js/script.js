


const text = document.querySelector('.content__preview');

const t = [text.innerHTML];


function typeText() {
	let line = 0;
	let count = 0;
	let out = '';
	let htmlOut = document.querySelector('.content__out');

	function typeLine() {
		let interval = setTimeout(function(){
			out +=t[line][count];
			htmlOut.innerHTML = out + '|';
			count++;

			if(count >= t[line].length) {
				count = 0;
				line++;
				if(line == t.length) {
					clearTimeout(interval);
					htmlOut.innerHTML = out;
					return true;
				}
			}
			typeLine();

		},getRandomInt(150));
	}
	typeLine();
}
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//делаем анимацию по скролу

const animItems = document.querySelectorAll('.anim-items');

if(animItems.length > 0 ) {
	//Навесили событие на скролл
	window.addEventListener('scroll', animOnScroll)
	function animOnScroll(params) {
		for(let i =0; i < animItems.length; i++) {
			const animItem =animItems[i]; //Кладем найденный элемент в переменную
			const animItemHeight = animItem.offsetHeight; //Получаем высоту объекта
			const animItemOffset = offset(animItem).top;//Отправляем переменную в функцию по рассчету относительного положения
			const animStart = 4; // Коэфициент момента старта анимации

			//Настройка момента старта анимации( Высота окна браузера - высота объекта деленного на коэфициент)
			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if(animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			//Пишем условие для добавления класса
			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('active');
			}else {
				//контролирует повторную анимацию
				if(!animItem.classList.contains('anim-break')) {
					animItem.classList.remove('active');
				}
			}
		}
	}
	//Функция для вычисления объекта относительно верха страницы
	function offset(element) {
		const rect = element.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left +scrollLeft}
	}
	//Чтобы сработала сразу после открытия, до момента первого скрола
	setTimeout( () => {
		animOnScroll();
	}, 500);
	
}

//Вычисление прокрученных пикселей
const scroll2 = window.pageYOffset;
// console.log(scroll2);
//Функция прокрутки к конкретному месту 
function setScrollToOptions(){
	window.scrollTo({
		top: 500,
		left:0,
		behavior:"smooth"
	});
}

//Функция скрола к конкретному объекту
//находим объект 
function toScrollObject(top) {
	const scrollObject = document.querySelector('.description__body');
	scrollObject.scrollIntoView({
		block:"center",
		inline:"nearest",
		behavior:"smooth"
	})
}

const scrollBtn = document.querySelector('.fullscreen__btn');
scrollBtn.addEventListener('click', btnScroll);
function btnScroll () {
	toScrollObject(true);
}

//Добавление класса при скроле 

//Ищем элемент, которому добавляется класс

window.addEventListener('scroll', changeToBcg);

function changeToBcg() {
	const scElem = document.querySelectorAll('.background');
	const scChange = 600;
	const scFinish = 3000;
	const scNormal = window.scrollY
	if(scElem.length > 0) {
		for(let i=0; i<scElem.length; i++) {
			const newElem = scElem[i];
			if(scNormal >= scChange && scNormal < scFinish) {
				newElem.classList.add('background__mod');
				newElem.classList.remove('background__modTwo');
			}else if(scNormal >= scFinish )  {
				newElem.classList.add('background__modTwo');
				newElem.classList.remove('background__mod');
			}else {
				newElem.classList.remove('background__mod');
				newElem.classList.remove('background__modTwo');
			}
		}
		
	}


	//Замена бэкграунда на картинку
	const scElemTwo = document.querySelector('.fullscreen__bcg');	
	const scChangeTwo = 1500;
	if(scNormal >= scChangeTwo) {
		scElemTwo.classList.add('fullscreen__mod');
	}else {
		scElemTwo.classList.remove('fullscreen__mod');
	}

}


//Burger

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
	 document.body.classList.toggle("lock");
    header__list.classList.remove('active');
    back.classList.toggle('lock');
}

//Wrong Form

let description__btn = document.querySelector('.description__btn');

let newElem = document.createElement('div');

let textTwo = "Service temporarily unavailable";

description__btn.addEventListener('click', () => {
	newElem.innerHTML = textTwo;
	description__btn.after(newElem);

})

//Плавный скролл 

const menuLinks = document.querySelectorAll('.fullscreen__link[data-goto]');
if(menuLinks.length>0) {
   menuLinks.forEach(element => {
      element.addEventListener("click", function(e) {
         const menuLink = e.target;
         if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            if(header__burger.classList.contains("active")) {
               document.body.classList.remove("lock");
               header__menu.classList.remove("active");
               header__burger.classList.remove("active");
					fullscreen__text.classList.toggle('activeMod');
					fullscreen__title.classList.toggle('active');
            } 
            
            window.scrollTo({
               top:gotoBlockValue,
               behavior:"smooth"
            });
            e.preventDefault();
         }
      })  
   });
}

//Tab's

const tabsBtn = document.querySelectorAll('.tabs__item');
const tabsBlock = document.querySelectorAll('.tabs__block');

tabsBtn.forEach(function(item) {
   item.addEventListener("click", function(){
      let currentBtn = item;
      let tabId = currentBtn.getAttribute("data-tab");
      let currentTab = document.getElementById(tabId);

      if(! currentBtn.classList.contains('active')) {
         tabsBtn.forEach(function(item) {
            item.classList.remove("active");
         }) 
         tabsBlock.forEach(function(item) {
            item.classList.remove("active");
         }) 
   
   
         currentBtn.classList.add("active");
         currentTab.classList.add("active");
      }
   }) 
});

document.querySelector('.tabs__item').click();


//Spoiler

document.querySelectorAll('.accordeon-item__title').forEach((item) =>
   item.addEventListener('click', () => {
      const parent = item.parentNode;

      if(parent.classList.contains('active')) {
         parent.classList.remove('active')
      }else {
         document.querySelectorAll('.accordeon-item').forEach((child) =>
            child.classList.remove('active')
         )

         parent.classList.add('active')
      }

      
   })
) 

//swiper
new Swiper('.image-slider', {
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
   pagination: {
      el: '.swiper-pagination',
      clickable:true,
      dynamicBullets:true,
   },
   grabCursor:true,
   mousewheel: {
      sensitivity: 1,
      eventsTarget: ".image-slider"
   },
});

