

let header__burger = document.querySelector('.fullscreen__burger');
let header__menu = document.querySelector('.fullscreen__header');
let back = document.querySelector('body');
let header__list = document.querySelector('.fullscreen__list');
let fullscreen__title = document.querySelector('.fullscreen__title');
let fullscreen__text = document.querySelector('.fullscreen__text');

if(header__burger) {
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
}


////

let codeInput = document.querySelector('.codeBtn');
const newElemFirst = document.createElement('div');
const elemParent = document.querySelector('.btnModFirst');
let inputWrong = newElemFirst.innerHTML="Значение введено неверно";



if(codeInput) {
	codeInput.addEventListener('click', () => {
        let valueInput = document.querySelector('.valueBtn').value;
		
        if(valueInput == "12345") {
            elemParent.previousSibling.remove();
            let inputWrong = newElemFirst.innerHTML="Успешно!";
            elemParent.before(inputWrong);
            setTimeout( 'location="course.html";', 1000 );
        }else {
            if(elemParent.classList.contains('active')) {
                
            }else {
                elemParent.before(inputWrong);
                elemParent.classList.add("active");
            }
            
        }
	})
}

