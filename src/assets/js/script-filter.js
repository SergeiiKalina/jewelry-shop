const basketcardQuantity = document.querySelector('.basket_quantity')
const productBtn = document.querySelectorAll('.product__hover button');
const cardProductList = document.querySelector('.cards_body_block');
const basketcard = document.querySelector('.basket')
const menu = document.getElementById('menu')
const burger = document.querySelector('.menu__icon')
const listItem = document.querySelectorAll('.target')
const header = document.querySelector('.filter__header')
const headBasket = document.querySelector('.head_card')
const head = document.querySelector('.header__block');
const subMenu = document.querySelector('.menu__sublist_block');
const shop = document.getElementById('shop');
const basket = document.querySelector('.basket');



const randomId = () => {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2, 15);
};
const generateCardProduct = (img, title, price, id, atributPrice, value) => {
    return `
    <div class="basket_card_item" data-id="${id}">
    <div class="basket_card_img"><img src="${img}" alt="" width='136' hight='136'></div>
    <div class="basket_card_nameandvalue">
    <div class="basket_card_value">
        <div class="basket_card_name">${title}</div>
        <div class="basket_card_params">Black / Medium</div>
        <div class="basket_card_price">${price}</div>
    </div>
    <div class="basket-card_quantity">
    <div class="bag_qty">QTY:</div>
        <button class="card_button minus">-</button>
        <input type="number" value="${value}" class="card_quantity" data-price="${atributPrice}" disabled></input>
        <button class="card_button plus">+</button>
    </div></div>
    <div class="card_block_hidden">✖</div>
    </div>
    `
    
}
const bagQuntity = document.querySelector('.bag_footer_itemquantity span');
const bagHeadquntity = document.querySelector('.bag_quantity_item')
console.log()
const pricequantity = () => {
    let length = document.querySelector('.block__cards').children.length;
    basketcardQuantity.textContent = length;
    bagQuntity.textContent = `(${length} items)`
    bagHeadquntity.textContent = `${length} items`
    length > 0 ? basketcardQuantity.classList.add('activ') : basketcardQuantity.classList.remove('activ')
}

const initialState = () => {
if(localStorage.getItem('product') !== null){
    document.querySelector('.block__cards').innerHTML = localStorage.getItem('product');
    pricequantity()
}
}
initialState()


const updateStorege = () => {
  let parent =  document.querySelector('.block__cards'); 
  let html = parent.innerHTML;
  html = html.trim();
  if(html.length){
  localStorage.setItem('product', html)
  }else{
    localStorage.removeItem('product')
  }
}
productBtn.forEach(el => {
    el.closest('.product_block_item').setAttribute('data-id', randomId())
    el.addEventListener('click', (e) => {
        e.preventDefault()
let self = e.currentTarget;
let parent = self.closest('.product_block_item');
let id = parent.dataset.id;
let img = parent.querySelector('.product__block_img img').getAttribute('src');
let title = parent.querySelector('.product_block_item_name').textContent;
let price = parent.querySelector('.product_block_item_price').textContent;
let atributPrice = parent.dataset.price;
let value = parent.querySelector('.card_quantity').value;
document.querySelector('.block__cards').insertAdjacentHTML('afterbegin', generateCardProduct(img, title, price, id, atributPrice, value))
pricequantity()
updateStorege()
self.disabled = true;
    })
})




const bag = document.querySelector('.basket');
const bagBlock = document.querySelector('.bag');

document.addEventListener('click', (e) => {
    let target = e.target;
   if(target.closest('.fuck_basket')){
    bagBlock.classList.add('activ')
    return
   }if(target.closest('.card_block_hidden')){
    return
   }
if(!target.closest('.bag')){
    bagBlock.classList.remove('activ')
    return
}
})
const bagItem = document.querySelector('.block__cards')
bagItem.addEventListener('click', (e) => {
    let target = e.target;
    if(target.className != 'card_block_hidden') return;
let closest = e.target.closest('.basket_card_item');
closest.remove()
updateStorege()
pricequantity()
});
const getSubTotalCost = (input) => Number(input.value) * Number(input.dataset.price);
const totaPriceWrapper = document.querySelector('.bag_footer_totalcost')
const ACTION = {
PLUS: 'plus',
MINUS: 'minus',
};

const setTotalPrice = (value) => {
    totaPriceWrapper.textContent = `$${value},00`;
    totaPriceWrapper.dataset.value = value;
}
const init = () => {
let totalCost = 0;
[...document.querySelectorAll('.basket_card_item')].forEach((item) => {
totalCost += getSubTotalCost(item.querySelector('.card_quantity'));

})

setTotalPrice(totalCost)
}

const calcSeparItem = (basketItem, action) => {
const input = basketItem.querySelector('.card_quantity')
switch(action){
    case ACTION.PLUS:
        input.value++
        setTotalPrice(Number(totaPriceWrapper.dataset.value) + Number(input.dataset.price))
        break;
        case ACTION.MINUS:
            input.value--
            setTotalPrice(Number(totaPriceWrapper.dataset.value) - Number(input.dataset.price))
            break
}
basketItem.querySelector('.basket_card_price').textContent = `$${getSubTotalCost(input)},00`
}
document.querySelector('.block__cards').addEventListener('click', (e) => {
    if(e.target.classList.contains('minus')){
        const input = e.target.closest('.basket_card_item').querySelector('.card_quantity');
        if(Number(input.value) !== 0){
            calcSeparItem(e.target.closest('.basket_card_item'), ACTION.MINUS)
        }
        
    }
    if(e.target.classList.contains('plus')){
        calcSeparItem(e.target.closest('.basket_card_item'), ACTION.PLUS)
    }
})

document.querySelector('.fuck_basket').addEventListener('click', init())

document.addEventListener('click', (e) => {
    let target = e.target;
    if(target.closest('.menu__sublist')){
        header.classList.add('activ')
        subMenu.classList.add('activ')
        head.classList.add('activ')
        shop.classList.add('activ')
        return
    }
    if(target.closest('.menu__sublist_block')){
        return
    }
    if(!target.closest('.menu__sublist_block')){
        header.classList.remove('activ')
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
