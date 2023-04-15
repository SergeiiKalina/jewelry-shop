
const isMobile = {
    Android: function(){
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function(){
        return navigator.userAgent.match(/IEMobike/i);
    },
    any: function(){
        return (isMobile.Android()||
        isMobile.BlackBerry()||
        isMobile.iOS()||
        isMobile.Opera()||
        isMobile.Windows());
    }
};
if(isMobile.any()){
document.body.classList.add('touch');
}else{
    document.body.classList.add('pc')
}


document.addEventListener('DOMContentLoaded', ready)
function ready(){
    for(let i = 0; i < nav.children.length; i++){
        if(nav.children[i].getAttribute('data-sale')){
            nav.children[i].children[0].children[1].style.display = 'flex'
            nav.children[i].children[0].children[1].innerHTML = `- ${nav.children[i].getAttribute('data-sale')}%`;
        }
        // if(!nav.children[i].getAttribute('data-sale')){
        //     nav.children[i].children[0].children[1].style.display = 'none'
        // }
    }
}


const burger = document.querySelector('.menu__icon')
burger.addEventListener('click', () => {
   const menu = document.querySelector('.menu__body')
   document.body.classList.toggle('lock')
   menu.classList.toggle('hidden')
   burger.classList.toggle('activ')
   menu.classList.toggle('activ')
})
const header = document.querySelector('.header__block');
const subMenu = document.querySelector('.menu__sublist_block');
const shop = document.getElementById('shop');
const slider = document.querySelector('.swiper-wrapper');
shop.addEventListener('click', () => {
});

////menu/////
document.addEventListener('click', (e) => {
    let target = e.target;
    if(target.closest('.menu__sublist')){
        subMenu.classList.add('activ')
        header.classList.add('activ')
        slider.classList.add('activ')
        shop.classList.add('activ')
        return
    }
    if(target.closest('.menu__sublist_block')){
        return
    }
    if(!target.closest('.menu__sublist_block')){
        subMenu.classList.remove('activ')
        header.classList.remove('activ')
        slider.classList.remove('activ')
        shop.classList.remove('activ')
        return
        }
})



const listItem = document.querySelectorAll('.target')
const menu = document.getElementById('menu')
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

/////Swiper slider/////
new Swiper('.container-slider', {
    pagination:{
        el: '.swiper-pagination',
        clickable: true,
    },
    autoHeight:true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
    }
});
function cardGeneration(data){
    const card = [];
    for(let i = 0; i < data.length; i++){
        card.push(
            `<div class="product_block_item" data-price="${data[i].price}" data-category="${data[i].category}" data-brands="${data[i].brands}">
            <div class="product__block_img"><img src=${data[i].pictures}>
                <div class="product__hover">
                <button>ADD TO CART</button>
            </div>
            <div class="proudct__focus">
                <div class="product__focus_img">
                 <div class="focus_img_bascet">
                     <img src="assets/images/icon/basket_icon_black.png" alt="">
                     <div class="focus_img_circle">
                         <div class="focus_img_circle1"></div><div class="focus_img_circle1"></div>
                     </div>
                 </div>
                 <a href="product.html"><div class="focus_img_eys">
                    <img src="assets/images/icon/eys.png" alt="">
                        <div class="eys_circle"></div>
                 </div></a>
                 <div class="focus_img_heart">
                    <img src="assets/images/icon/heart.png" alt="">
                 </div>
                </div>
             </div></div>
            <p class="product_block_item_name">${data[i].title}</p>
            <p class="product_block_item_price">${data[i].cost}</p>
        </div>`
        )
    }
    return card;
}
const cardArr = cardGeneration(cardsData);
nav.innerHTML = cardArr.join('')


const basketcardQuantity = document.querySelector('.basket_quantity')
const productBtn = document.querySelectorAll('.product__hover button');
const cardProductList = document.querySelector('.cards_body_block');
const basketcard = document.querySelector('.basket')

const randomId = () => {
    return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2, 15);
};
const generateCardProduct = (img, title, price, id, atributPrice) => {
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
        <input type="number" value="1" class="card_quantity" data-price="${atributPrice}" disabled></input>
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
document.querySelector('.block__cards').insertAdjacentHTML('afterbegin', generateCardProduct(img, title, price, id, atributPrice))
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
        input.value = input.value;
        console.log(input.value)
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
let searchValue = '';
const search = document.querySelector('.search_block a');
const searchInput = document.querySelector('.search_block input');
searchInput.oninput = function(e){
searchValue = e.target.value;
}

    search.addEventListener('click', (e) => {
        e.preventDefault()
        fulterSearch()
})

function fulterSearch() {
    
    let fiteretCardsdata = cardsData.filter(card => {
        const rgx = new RegExp(searchValue, 'i')
    if(rgx.test(card.title)){
        return true;
    }else{
        return false;
    }
})
const newFilteredHtml = cardGeneration(fiteretCardsdata);
nav.innerHTML = newFilteredHtml.join('')

}

const searchButton = document.querySelector('.search__img');
searchButton.addEventListener('click', () => {
    document.querySelector('.search_block').classList.toggle('activ')
})

const allImgProduct = document.querySelectorAll('.product_block_item')
allImgProduct.forEach(el => {
    el.addEventListener('click', () => {
       
        allImgProduct.forEach(el => {
            el.querySelector('.proudct__focus').classList.remove('activ')
        })
el.querySelector('.proudct__focus').classList.add('activ')
    })
})

const generateCardProductHtml = function(img, title, price, id, atributPrice){
    return `<div class="slider__swiper_block">
    <div class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide"><img src="${img}" alt=""></div>
          <div class="swiper-slide"><img src="${img}" alt=""></div>
          <div class="swiper-slide"><img src="${img}" alt=""></div>
          <div class="swiper-slide"><img src="${img}" alt=""></div>
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
        <div class="swiper-scrollbar"></div>
      </div>
</div>
<div class="previy__card_block">
    <main class="product_previy" data-price="${atributPrice}" id='${id}'>
        <div class="product_previy_block1">
      <div class="block1__previy">
       <div class="block1__previy_img"><img src="${img}" alt=""></div> 
       <div class="block1__previy_img"><img src="${img}" alt=""></div> 
       <div class="block1__previy_img"><img src="${img}" alt=""></div> 
       <div class="block1__previy_img"><img src="${img}" alt=""></div> 
      </div>
      <div class="block1__img_veiw">
        <div class="gallery-slide"><img src="${img}" alt=""></div>
        <div class="gallery-slide_progres"><div class="gallery_progress"></div></div>
      </div>
            <div class="previy_block1_info">
                <div class="previy_block1_title">${title}</div>
                <div class="previy_block1_price"><div>${price}</div><div><img src="assets/images/icon/free-icon-share-icon-2524284.png" alt="" class="previy_block1_price_img"></div></div>
                <div class="previy_block1_stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><p>1 customer review</p></div>
                <div class="previy_block1_txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat,
                <span class="dots">...</span><span class="more">augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero.
                     Sed quis mauris eget arcu facilisis consequat sed eu felis.</span> </div>
                     <button id="dotsbtn">View more</button>
                <div class="previy_block1_addbasket">
                    <div class="previy_block1_input previy_product_hidden"><button class="card_button minus">-</button>
                        <input type="number" value="1" class="card_quantity" data-price="${atributPrice}" disabled></input>
                        <button class="card_button plus">+</button>
                    
                </div>
                <div class="previy_block1_button"><a href="">ADD TO CART</a></div></div>
                <div class="previy_block1_social">
                    <div><img src="assets/images/icon/miniheart.png" alt=""></div>
                    <div class="previy_block1_social_bordeer"></div>
                    <div><img src="assets/images/icon/Icon color.png" alt=""></div>
                    <div><img src="assets/images/footer/social/facebook.png" alt=""></div>
                    <div><img src="assets/images/footer/social/instagram.png" alt=""></div>
                    <div><img src="assets/images/footer/social/tweter.png" alt=""></div>
                </div>
                <div class="previy_block1_quantity"><p>SKU:</p><span>12</span></div>
                <div class="previy_block1_categoty"><p>Categories:</p><span>Fashion, Style</span></div>
            </div>
        </div>
    </main>

</div>`
}

const eys = document.querySelectorAll('.focus_img_eys')
eys.forEach(el => {
    el.addEventListener('click',(e) => {
        localStorage.removeItem('item')
        let self = e.currentTarget;
        let parent = self.closest('.product_block_item');
        let id = parent.dataset.id;
        let img = parent.querySelector('.product__block_img img').getAttribute('src');
        let title = parent.querySelector('.product_block_item_name').textContent;
        let price = parent.querySelector('.product_block_item_price').textContent;
        let atributPrice = parent.dataset.price;
        document.querySelector('.hidden_product_block').insertAdjacentHTML('afterbegin', generateCardProductHtml(img, title, price, id, atributPrice))
upStorege()
    })
})
const upStorege = () => {
    let parent =  document.querySelector('.hidden_product_block'); 
    let html = parent.innerHTML;
    html = html.trim();
    if(html.length){
    localStorage.setItem('item', html)
    }
};
    
document.querySelector('.fuck_basket').addEventListener('click', init())


