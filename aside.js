const ASIDE_LAYOUT = document.querySelector('.aside__layout');
let burgerBtn = document.querySelector('.header__burger')

burgerBtn.addEventListener('click', function(){
    ASIDE_LAYOUT.style.transform = 'translateX(0)';
})

ASIDE_LAYOUT.addEventListener('click',function(evt){
let target = evt.target;
    
    if(target.classList.contains('aside__layout') && (window.innerWidth > 360) && (window.innerHeight < 1120)){
        ASIDE_LAYOUT.style.transform = 'translateX(-100vw)';
    }
    if(target.classList.contains('header__close')){
        ASIDE_LAYOUT.style.transform = 'translateX(-100vw)';
    }

})