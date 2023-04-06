
const rangeFilter = document.querySelector('#sort-desc');
const label = document.querySelector('.filter__price_label')
const filterPage = document.querySelector('.filter')
const filterBlock = document.querySelector('.filter_item')
const filtBurger = document.querySelector('.filter_burger')
const filterOpen = document.querySelector('.filter__block')
const closeFilter = document.querySelector('.button__close');


label.addEventListener('click', () => {
    label.classList.toggle('activ')
});
const labelOne = document.querySelector('.filter__price_label1')
labelOne.addEventListener('click', () => {
    labelOne.classList.toggle('activ')
});
const select = document.querySelectorAll('.filter__select')
for(let item of select){
    item.onclick = function(){
      item.classList.toggle('activ')  
    } 
}

const range = document.querySelectorAll('.range-slider input');
progress = document.querySelector('.range-slider .progress');
let gap = 10;
const inputValue = document.querySelectorAll('.numberVal input');
const veivProduct = document.querySelector('.button__done')


range.forEach(input => {
    input.addEventListener('input', e =>{
        let minrange = parseInt(range[0].value),
        maxrange = parseInt(range[1].value);
        let nav = document.querySelector('#nav');
        if(maxrange - minrange < gap){
           if(e.target.className === "range-min") {
            range[0].value = maxrange - gap;
           }
           else{
            range[1].value = minrange + gap;
           }
        }else{
            progress.style.left = (minrange / range[0].max) * 100 + '%';
            progress.style.right = 100 - (maxrange / range[1].max) * 100 + '%';
            inputValue[0].value = minrange;
            inputValue[1].value = maxrange;
            
       }
    })
});


veivProduct.addEventListener('click', () => {
       filterOpen.classList.add('hidden')
       filtBurger.classList.remove('activ')
       document.body.classList.remove('lock')
});




////////////////////////////////////////////////

const filteItem = document.querySelectorAll('.product_block_item')
const focusItem = document.querySelectorAll('.proudct__focus')
for(let item of filteItem){
    item.addEventListener('click',() => {
        for(let elem of focusItem){
            elem.classList.remove('activ')
        }
        item.children[0].children[3].classList.add('activ')
    })
}

label.addEventListener('click', () =>{
    console.log('Sort')
mySort();
})


labelOne.addEventListener('click', () =>{
    console.log('revers')
    myReversSort();
})
function mySort(){
    let nav = document.querySelector('#nav');
    for(let i = 0; i < nav.children.length; i++){
        for(let j = i; j < nav.children.length; j++){
            if(+nav.children[i].getAttribute('data-price') > +nav.children[j].getAttribute('data-price')){
                replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
                insertAfter(replacedNode, nav.children[i]);
            }
        }
    }
}
function myReversSort(){
    let nav = document.querySelector('#nav');
    for(let i = 0; i < nav.children.length; i++){
        for(let j = i; j < nav.children.length; j++){
            if(+nav.children[i].getAttribute('data-price') < +nav.children[j].getAttribute('data-price')){
                replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
                insertAfter(replacedNode, nav.children[i]);
            }
        }
    }
}

function insertAfter(elem, refElem){
    return refElem.parentNode.insertBefore(elem, refElem.nextSubling);
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const filterHidden = document.querySelector('.filter__block');
const filterItem = document.querySelector('.filter_item');
    filtBurger.addEventListener('click', () => {
        filtBurger.classList.toggle('activ')
        filterOpen.classList.toggle('hidden')
        document.body.classList.toggle('lock')
        filterHidden.classList.add('lock')
        filterItem.classList.add('lock')
        console.log(filtBurger)
    });

    
    closeFilter.addEventListener('click', () => {
        filterOpen.classList.add('hidden')
        filtBurger.classList.remove('activ')
        document.body.classList.remove('lock')
        filterHidden.classList.remove('lock')
        filterItem.classList.remove('lock')
    })
   



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
                     <div class="focus_img_eys">
                     <input type="number" value="1" class="card_quantity card__hidden" data-price="" disabled>1</input>
                        <img src="assets/images/icon/eys.png" alt="">
                            <div class="eys_circle"></div>
                     </div>
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


////// Filter //////////////////////////////////////////////////////////////////////////
const form = document.querySelector('form'); // береш форму
// if(!form) {
//     return;
// } // якщо форми немає, то виходимо з функції
veivProduct.addEventListener('click',(e) => {
    e.preventDefault()
     filterProducts()

})
rangeFilter.addEventListener('click', filterProducts)

// елемент картки продукту має містити атрибути data-price, data-category, data-color, та клас product-item
const filters = {
  priceMin: (item, value) => Number(form.priceMin.value) <= Number(item.dataset.price), // фільтр по мін ціні
  priceMax: (item, value) => Number(form.priceMax.value) >= Number(item.dataset.price), // фільтр по макс ціні
  category: (item, category) => item.dataset.category === category,
 brands: (item, brands) => item.dataset.brands === brands, // фільтр по кольору тощо
};
const products = [...document.querySelectorAll('.product_block_item')];// береш всі продукти на сторінці...
const getFilterValues = (form) => { // функція яка отримує всі значення фільтрів
  const formData = new FormData(form);
  const values = {};

  for (const [key, value] of formData) {
    values[key] = value;  
  }
  return values;
};
function filterProducts() { // функція фільтрації
  const values = getFilterValues(form); // береш всі значення фільтрів
  products.forEach((item) => { // проходишся по всіх продуктах
    const isFiltered = Object.entries(filters)
    .filter(([type]) => values[type])
    .every(([type, cb]) => cb(item, values[type])); 
   // перевіряєш чи вони проходять всі фільтри
    item.style.display = isFiltered ? 'block' : 'none'; 
      // якщо проходять, то показуєш, якщо ні, то ховаєш
  });
}




////// поиск по товарам
let searchValue = '';
const search = document.querySelector('.filter__head_search a');
const searchInput = document.querySelector('.filter__head_search input');
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


document.addEventListener('DOMContentLoaded', ready)
function ready(){
    for(let i = 0; i < nav.children.length; i++){
        if(nav.children[i].getAttribute('data-sale')){
            nav.children[i].children[0].children[1].style.display = 'flex'
            nav.children[i].children[0].children[1].innerHTML = `- ${nav.children[i].getAttribute('data-sale')}%`;
        }
        if(!nav.children[i].getAttribute('data-sale')){
            // nav.children[i].children[0].children[1].style.display = 'none'
            
        }
    }
}