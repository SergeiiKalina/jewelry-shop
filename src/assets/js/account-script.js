const btnAccount = document.querySelectorAll('.account_tabs_item');
btnAccount.forEach((item) => {
    item.addEventListener('click', (e) => {
        btnAccount.forEach((item) => item.classList.remove('activ'));
        e.preventDefault();
        let target = e.target;
        item.classList.add('activ');
        let registerBlock = document.querySelector('.register');
        let singinBlock = document.querySelector('.singin');
        if (target.closest('.singin_tab')) {
            registerBlock.classList.remove('activ');
            singinBlock.classList.add('activ');
        }
        if (target.closest('.register_tab')) {
            singinBlock.classList.remove('activ');
            registerBlock.classList.add('activ');
        }
    });
});

if (document.querySelector('.account_tabs_item')) {
    document.querySelector('.account_tabs_item').click();
}

const bag = document.querySelector('.basket');
const bagBlock = document.querySelector('.bag');

document.addEventListener('click', (e) => {
    let target = e.target;
    if (target.closest('.fuck_basket')) {
        bagBlock.classList.add('activ');
        return;
    }
    if (target.closest('.card_block_hidden')) {
        return;
    }
    if (!target.closest('.bag')) {
        bagBlock.classList.remove('activ');
        return;
    }
});
const basketcardQuantity = document.querySelector('.basket_quantity');
const bagQuntity = document.querySelector('.bag_footer_itemquantity span');
const bagHeadquntity = document.querySelector('.bag_quantity_item');
const pricequantity = () => {
    let length = document.querySelector('.block__cards').children.length;
    basketcardQuantity.textContent = length;
    bagQuntity.textContent = `(${length} items)`;
    bagHeadquntity.textContent = `${length} items`;
    length > 0
        ? basketcardQuantity.classList.add('activ')
        : basketcardQuantity.classList.remove('activ');
};
const bagItem = document.querySelector('.block__cards');
bagItem.addEventListener('click', (e) => {
    let target = e.target;
    if (target.className != 'card_block_hidden') return;
    let closest = e.target.closest('.basket_card_item');
    closest.remove();
    updateStorege();
    pricequantity();
});
const initialState = () => {
    if (localStorage.getItem('product') !== null) {
        document.querySelector('.block__cards').innerHTML =
            localStorage.getItem('product');
        pricequantity();
    }
};
initialState();

const getSubTotalCost = (input) =>
    Number(input.value) * Number(input.dataset.price);
const totaPriceWrapper = document.querySelector('.bag_footer_totalcost');
const ACTION = {
    PLUS: 'plus',
    MINUS: 'minus',
};

const setTotalPrice = (value) => {
    totaPriceWrapper.textContent = `$${value},00`;
    totaPriceWrapper.dataset.value = value;
};
const init = () => {
    let totalCost = 0;
    [...document.querySelectorAll('.basket_card_item')].forEach((item) => {
        totalCost += getSubTotalCost(item.querySelector('.card_quantity'));
    });

    setTotalPrice(totalCost);
};

const calcSeparItem = (basketItem, action) => {
    const input = basketItem.querySelector('.card_quantity');
    switch (action) {
        case ACTION.PLUS:
            input.value++;
            input.value = input.value;
            setTotalPrice(
                Number(totaPriceWrapper.dataset.value) +
                    Number(input.dataset.price)
            );
            break;
        case ACTION.MINUS:
            input.value--;
            setTotalPrice(
                Number(totaPriceWrapper.dataset.value) -
                    Number(input.dataset.price)
            );
            break;
    }
    basketItem.querySelector(
        '.basket_card_price'
    ).textContent = `$${getSubTotalCost(input)},00`;
};
document.querySelector('.block__cards').addEventListener('click', (e) => {
    if (e.target.classList.contains('minus')) {
        const input = e.target
            .closest('.basket_card_item')
            .querySelector('.card_quantity');
        if (Number(input.value) !== 0) {
            calcSeparItem(e.target.closest('.basket_card_item'), ACTION.MINUS);
        }
    }
    if (e.target.classList.contains('plus')) {
        calcSeparItem(e.target.closest('.basket_card_item'), ACTION.PLUS);
    }
});
const searchButton = document.querySelector('.search__img');
searchButton.addEventListener('click', () => {
    document.querySelector('.search_block').classList.toggle('activ');
});

//////////////USer ///////////////////

function generatorCode(objUser) {
    return `
    <table>
                                <tr>
                                    <th>Name</th>
                                </tr>
                                <tr>
                                    <th>Surname</th>
                                </tr>
                                <tr>
                                    <th>City</th>
                                </tr>
                                <tr>
                                    <th>Street</th>
                                </tr>
                                <tr>
                                    <th>Post Index</th>
                                </tr>
                                <tr>
                                    <th>Tel</th>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td>${objUser[0].name.firstname}</td>
                                </tr>
                                <tr>
                                    <td>${objUser[0].name.lastname}</td>
                                </tr>
                                <tr>
                                    <td>${objUser[0].address.city}</td>
                                </tr>
                                <tr>
                                    <td>${objUser[0].address.street}</td>
                                </tr>
                                <tr>
                                    <td>${objUser[0].address.number}</td>
                                </tr>
                                <tr>
                                    <td>${objUser[0].phone}</td>
                                </tr>
                                <tr>
                                    <td>${objUser[0].email}</td>
                                </tr>
                            </table>
    `;
}

let singin = document.querySelector('#singin');
async function loadData(url, email, pass) {
    const responc = await fetch(url);
    const data = await responc.json();
    let filtered = await filteredBySubField(
        data,
        'email',
        email,
        'password',
        pass
    );
    function filteredBySubField(obj, subField, value, subPass, pass) {
        let result = {};
        for (let k in Object.keys(obj)) {
            if (obj[k][subField] === value && obj[k][subPass] === pass) {
                result[k] = Object.assign({}, obj[k]);
            }
        }
        localStorage.removeItem('user');
        let parent = generatorCode(result);
        parent = parent.trim();
        if (parent.length) {
            localStorage.setItem('user', parent);
        }
    }
}

singin.addEventListener('click', function myFn(e) {
    const url = 'https://fakestoreapi.com/users';
    const email = document.querySelector('#login-email').value;
    const pass = document.querySelector('#login-pass').value;
    loadData(url, email, pass);
});

document.querySelector('.fuck_basket').addEventListener('click', init());
