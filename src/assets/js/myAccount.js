const tabs = document.querySelectorAll('.myaccount_nav a');
const contents = document.querySelectorAll('.nav_block_content section');
tabs.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        contents.forEach((item) => item.classList.remove('item_content_activ'));
        tabs.forEach((item) => item.classList.remove('activ'));
        let target = event.target;
        if (target.tagName !== 'A') return;
        const id = event.target.getAttribute('href').replace('#', '');
        document.getElementById(id).classList.add('item_content_activ');
        item.classList.add('activ');
    });
});

const initUserInfo = () => {
    if (localStorage.getItem('user') !== null) {
        if (document.querySelector('.cont4_data_block')) {
            document.querySelector('.cont4_data_block').innerHTML =
                localStorage.getItem('user');
        }
    }
};
initUserInfo();

const form = document.querySelector('.billing_form');
const formData = new FormData(form);
const submitForm = document.querySelector('.cont4_form_submit');

submitForm.addEventListener('click', (e) => {
    e.preventDefault();
    let a = {};
    for (let [key, value] of formData) {
        a.key = value;
    }
});

const arrTabs = document.querySelector('.nav_arrow_block');
arrTabs.addEventListener('click', (e) => {
    let sum = 0;
    let target = e.target;
    const allLi = document.querySelector('.myaccount_nav ul').clientWidth;

    const nav = document.querySelector('.myaccount_nav');
    console.log(allLi);
    if (target.closest('.nav_arr-left')) {
        nav.scrollLeft -= allLi / 3;
        console.log(nav.scrollLeft);
    }
    if (target.closest('.nav_arr-right')) {
        if (nav.scrollLeft < 400) {
            nav.scrollLeft += allLi / 3;
        }
        if (nav.scrollLeft > 600) {
            nav.scrollLeft = 600;
            console.log(nav.scrollLeft);
        }
    }
});

document.querySelectorAll('.myaccount_nav a')[1].click();
