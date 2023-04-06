const mobileSumSubTotal = document.querySelector('.sum__mobile')
const getSubTotalCost = (input) => Number(input.value) * Number(input.dataset.price);
const totaPriceWrapper = document.querySelector('.basket_total_amount')
const ACTION = {
PLUS: 'plus',
MINUS: 'minus',
};

const setTotalPrice = (value) => {
    totaPriceWrapper.textContent = `$${value},00`;
    totaPriceWrapper.dataset.value = value;
    mobileSumSubTotal.textContent = `$${value},00`
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
console.log(document.querySelector('.cards_body_block'))
document.querySelector('.cards_body_block').addEventListener('click', (e) => {
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



const cardBlock = document.querySelector('.cards_body_block');
cardBlock.addEventListener('click', (e) => {
    let target = e.target;
    
    if(target.className != 'card_block_hidden') return;
let closest = e.target.closest('.basket_card_item');
const input = closest.querySelector('.card_quantity')
let value = input.value;
closest.remove()
updateStorege()
setTotalPrice(Number(totaPriceWrapper.dataset.value) - Number(input.dataset.price) * Number(value))
});

const basketcardQuantity = document.querySelector('.basket_quantity')

const mobileCardQuantity = document.querySelector('.veiw__card_quantity span')

const pricequantity = () => {
    let length = document.querySelector('.block__cards').children.length;
    basketcardQuantity.textContent = length;
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

init()