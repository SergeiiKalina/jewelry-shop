
const menu = document.getElementById('menu')
const burger = document.querySelector('.menu__icon')
const listItem = document.querySelectorAll('.target')
const header = document.querySelector('.filter__header')
const headBasket = document.querySelector('.head_card')
const head = document.querySelector('.header__block');
const subMenu = document.querySelector('.menu__sublist_block');
const shop = document.getElementById('shop');
const basket = document.querySelector('.basket');



document.addEventListener('click', (e) => {
    let target = e.target;
    if(target.closest('.menu__sublist')){
        headBasket.classList.add('activ')
        subMenu.classList.add('activ')
        head.classList.add('activ')
        shop.classList.add('activ')
        return
    }
    if(target.closest('.menu__sublist_block')){
        return
    }
    if(!target.closest('.menu__sublist_block')){
        headBasket.classList.remove('activ')
        subMenu.classList.remove('activ')
        head.classList.remove('activ')
        shop.classList.remove('activ')
        return
        }
})

menu.addEventListener('click', (e) => {
    for(let item of listItem){
        item.classList.remove('underline')
    }
    let target = e.target;
    if(e.target.tagName != 'SPAN') return;
    target.classList.add('underline'); 
})
document.addEventListener('click', (e) => {
    if(e.target.tagName != 'SPAN'){
    for(let item of listItem){
        item.classList.remove('underline')
    }}
})




///////////////////////////Burger////////////
burger.addEventListener('click', () => {
    const menu = document.querySelector('.menu__body')
    document.body.classList.toggle('lock')
    menu.classList.toggle('hidden')
    burger.classList.toggle('activ')
    menu.classList.toggle('activ')
 })