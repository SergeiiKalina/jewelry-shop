document.addEventListener('DOMContentLoaded', function(){
  setTimeout(() => {
    const swiper = new Swiper('.swiper', {
  })
  }, 1000);
})
const cardInitialState = () => {
  if(localStorage.getItem('item') !== null){
      document.querySelector('.previy__slider__block').innerHTML = localStorage.getItem('item');
  }
  }
  cardInitialState()
  const burger = document.querySelector('.menu__icon')
const previy = document.querySelector('.block1__previy');
const imgVeiw = document.querySelector('.gallery-slide img');
const progressGallery = document.querySelector('.gallery_progress');
function veiwImg(){
  imgVeiw.src = previy.children[0].children[0].src;
}
veiwImg()
previy.addEventListener('click', (e) => {
  if(e.target === previy.children[0].children[0]){
    progressGallery.style.width = 25 + "%";
  }
  if(e.target === previy.children[1].children[0]){
    progressGallery.style.width = 50 + "%";
  }
  if(e.target === previy.children[2].children[0]){
    progressGallery.style.width = 75 + "%";
  }
  if(e.target === previy.children[3].children[0]){
    progressGallery.style.width = 100 + "%";
  }
  let target = e.target;
  if(target.tagName != 'IMG') return;
  let src = target.src;
  imgVeiw.src = src
})

const header = document.querySelector('.header__block');
const subMenu = document.querySelector('.menu__sublist_block');
const shop = document.getElementById('shop');
const previyBlock = document.querySelector('.product_previy');
document.addEventListener('click', (e) => {
  let target = e.target;
  if(target.closest('.menu__sublist')){
      subMenu.classList.add('activ')
      header.classList.add('activ')
      shop.classList.add('activ')
      previyBlock.classList.add('activ')
      return
  }
  if(target.closest('.menu__sublist_block')){
      return
  }
  if(!target.closest('.menu__sublist_block')){
      subMenu.classList.remove('activ')
      header.classList.remove('activ')
      shop.classList.remove('activ')
      previyBlock.classList.remove('activ')
      return
      }
})

burger.addEventListener('click', () => {
  const menu = document.querySelector('.menu__body')
  document.body.classList.toggle('lock')
  menu.classList.toggle('hidden')
  burger.classList.toggle('activ')
  menu.classList.toggle('activ')
})

const getSubTotalCost = (input) => Number(input.value) * Number(input.dataset.price);
const totaPriceWrapper = document.querySelector('.previy_block1_price')
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
[...document.querySelectorAll('.previy_block1_info')].forEach((item) => {
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
basketItem.querySelector('.previy_block1_price').textContent = `$${getSubTotalCost(input)},00`
}

document.querySelector('.previy_block1_info').addEventListener('click', (e) => {
    if(e.target.classList.contains('minus')){
        const input = e.target.closest('.previy_block1_info').querySelector('.card_quantity');
        if(Number(input.value) !== 0){
            calcSeparItem(e.target.closest('.previy_block1_info'), ACTION.MINUS)
        }
        
    }
    if(e.target.classList.contains('plus')){
        calcSeparItem(e.target.closest('.previy_block1_info'), ACTION.PLUS)
    }
})


const basketcardQuantity = document.querySelector('.basket_quantity')
const productBtn = document.querySelectorAll('.previy_block1_button');
const cardProductList = document.querySelector('.cards_body_block');
const basketcard = document.querySelector('.basket')

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
    el.closest('.product_previy').setAttribute('data-id', randomId())
    el.addEventListener('click', (e) => {
        e.preventDefault()
let self = e.currentTarget;
let parent = self.closest('.product_previy');
let id = parent.dataset.id;
let img = parent.querySelector('.gallery-slide img').getAttribute('src');
let title = parent.querySelector('.previy_block1_title').textContent;
let price = parent.querySelector('.previy_block1_price').textContent;
let value = parent.querySelector('.card_quantity').value;
let atributPrice = parent.dataset.price;
document.querySelector('.block__cards').insertAdjacentHTML('afterbegin', generateCardProduct(img, title, price, id, atributPrice, value))
pricequantity()
updateStorege()
self.disabled = true;
    })
})



const star = document.querySelector('.previy_block1_stars');
star.addEventListener('click', (e) => {
  let target = e.target;
 for(let i = 0;i <= 4; i++ ){
  star.children[i].style.color = 'black'
 }
  if(target === star.children[0]){
    star.children[0].style.color = 'gold';
  }
  if(target === star.children[1]){
    for(let i = 0; i <= 1; i++){
      star.children[i].style.color = 'gold';
    }
  }
  if(target === star.children[2]){
    for(let i = 0; i <= 2; i++){
      star.children[i].style.color = 'gold';
    }
  }
  if(target === star.children[3]){
    for(let i = 0; i <= 3; i++){
      star.children[i].style.color = 'gold';
    }
  }
  if(target === star.children[4]){
    for(let i = 0; i <= 4; i++){
      star.children[i].style.color = 'gold';
    }
  }
  
})
////TABS //////


document.querySelectorAll('.tabs-trigger__item').forEach(item => {
  item.addEventListener('click', function(e){
e.preventDefault();
const id = e.target.getAttribute('href').replace('#', '');
document.querySelectorAll('.tabs-trigger__item').forEach(child => child.classList.remove('tabs-trigger__item--activ')
);
document.querySelectorAll('.tabs-content__item').forEach(child => child.classList.remove('tabs-content__item--activ')
);
item.classList.add('tabs-trigger__item--activ')
document.getElementById(id).classList.add('tabs-content__item--activ')
  })
});
document.querySelector('.tabs-trigger__item').click();

const triggerItem = document.querySelectorAll('.tabs-trigger__item');
triggerItem.forEach(item => {
  item.addEventListener('click', (e) => {
    let target = e.target;
    const triggerTxt = document.querySelectorAll('.tabs-txt__item');
    const triggerArr = document.querySelectorAll('.tabs-trigger__block');
    for(let arr of triggerArr){
      arr.classList.remove('activ')
    }
    for(let trig of triggerTxt){
      trig.classList.remove('activ')
    }
    let el = target.closest('.tabs-trigger__block')
    el.querySelector('.tabs-txt__item').classList.add('activ')
    el.classList.add('activ')
    console.log(el)
  })
})

const txtBtn = document.getElementById('dotsbtn');
txtBtn.addEventListener('click', () => {
  const more = document.querySelector('.more');
  const dots = document.querySelector('.dots')
  more.classList.toggle('activ');
  dots.classList.toggle('activ')
})