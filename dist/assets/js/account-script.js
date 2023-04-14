const btnAccount = document.querySelectorAll('.account_tabs_item');
btnAccount.forEach(item => {
    item.addEventListener('click', (e) => {
        btnAccount.forEach(item => item.classList.remove('activ'))
        e.preventDefault()
        let target = e.target;
        item.classList.add('activ');
        let registerBlock = document.querySelector('.register')
        let singinBlock = document.querySelector('.singin');
if(target.closest('.singin_tab')){
    registerBlock.classList.remove('activ')
    singinBlock.classList.add('activ');
}
if(target.closest('.register_tab')){
    singinBlock.classList.remove('activ');
    registerBlock.classList.add('activ')   
}
    })
})
document.querySelector('.account_tabs_item').click()

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
const basketcardQuantity = document.querySelector('.basket_quantity')
const bagQuntity = document.querySelector('.bag_footer_itemquantity span');
const bagHeadquntity = document.querySelector('.bag_quantity_item')
const pricequantity = () => {
    let length = document.querySelector('.block__cards').children.length;
    basketcardQuantity.textContent = length;
    bagQuntity.textContent = `(${length} items)`
    bagHeadquntity.textContent = `${length} items`
    length > 0 ? basketcardQuantity.classList.add('activ') : basketcardQuantity.classList.remove('activ')
}
const bagItem = document.querySelector('.block__cards')
bagItem.addEventListener('click', (e) => {
    let target = e.target;
    if(target.className != 'card_block_hidden') return;
let closest = e.target.closest('.basket_card_item');
closest.remove()
updateStorege()
pricequantity()
});
const initialState = () => {
    if(localStorage.getItem('product') !== null){
        document.querySelector('.block__cards').innerHTML = localStorage.getItem('product');
        pricequantity()
    }
    }
    initialState()

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
const searchButton = document.querySelector('.search__img');
searchButton.addEventListener('click', () => {
    document.querySelector('.search_block').classList.toggle('activ')
})

blog.addEventListener('click', () => {

})
const sublistBtn = document.querySelectorAll('.subblist_button');
sublistBtn.forEach(item => {
    item.addEventListener('click', (e) => {
        let target = e.target;
        if(target.closest('.blog_standard')){
            console.log('asfas')
            document.querySelector('.standard_sublist').classList.toggle('activ');
        }
        if(target.closest('.blog_post')){
            console.log('asfas')
            document.querySelector('.post_sublist').classList.toggle('activ');
        }
    })
})

document.querySelector('.fuck_basket').addEventListener('click', init())