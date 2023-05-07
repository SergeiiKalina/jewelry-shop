const menu = document.getElementById('menu');
const burger = document.querySelector('.menu__icon');
const listItem = document.querySelectorAll('.target');
const header = document.querySelector('.filter__header');
const headBasket = document.querySelector('.head_card');
const head = document.querySelector('.header__block');
const subMenu = document.querySelector('.menu__sublist_block');
const shop = document.getElementById('shop');
const basket = document.querySelector('.basket');
const accountHeader = document.querySelector('.account');

document.addEventListener('click', (e) => {
    let target = e.target;
    if (target.closest('.menu__sublist')) {
        if (headBasket) {
            headBasket.classList.add('activ');
        }
        if (accountHeader) {
            accountHeader.classList.add('activ');
        }
        subMenu.classList.add('activ');
        head.classList.add('activ');
        shop.classList.add('activ');
        return;
    }
    if (target.closest('.menu__sublist_block')) {
        return;
    }
    if (!target.closest('.menu__sublist_block')) {
        if (headBasket) {
            headBasket.classList.remove('activ');
        }

        if (accountHeader) {
            accountHeader.classList.remove('activ');
        }
        subMenu.classList.remove('activ');
        head.classList.remove('activ');
        shop.classList.remove('activ');
        return;
    }
    // if (target.id == 'shop') {
    //     subMenu.classList.remove('activ');
    //     shop.classList.remove('activ');
    //     console.log('asf');
    // }
});

menu.addEventListener('click', (e) => {
    for (let item of listItem) {
        item.classList.remove('underline');
    }
    let target = e.target;
    if (e.target.tagName != 'SPAN') return;
    target.classList.add('underline');
});
document.addEventListener('click', (e) => {
    if (e.target.tagName != 'SPAN') {
        for (let item of listItem) {
            item.classList.remove('underline');
        }
    }
});

///////////////////////////Burger////////////
burger.addEventListener('click', () => {
    const menu = document.querySelector('.menu__body');
    document.body.classList.toggle('lock');
    menu.classList.toggle('hidden');
    burger.classList.toggle('activ');
    menu.classList.toggle('activ');
});

///////Blog /////

blog.addEventListener('click', () => {
    const blogSubList = document.querySelector('.blog_sublist');
    blogSubList.classList.toggle('activ');
});
const sublistBtn = document.querySelectorAll('.subblist_button');
sublistBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        let target = e.target;
        if (target.closest('.blog_standard')) {
            document.querySelector('.post_sublist').classList.remove('activ');
            document.querySelector('.standard_sublist').classList.add('activ');
        }
        if (target.closest('.blog_post')) {
            document
                .querySelector('.standard_sublist')
                .classList.remove('activ');
            document.querySelector('.post_sublist').classList.add('activ');
        }
    });
});

////Generator content blog/////////

rightSideBar.addEventListener('click', () => {
    localStorage.removeItem('blog');
    let parent = generatorContentBlogRight();
    parent = parent.trim();
    if (parent.length) {
        localStorage.setItem('blog', parent);
    }
});

leftSideBar.addEventListener('click', () => {
    localStorage.removeItem('blog');
    let parent = generatorContentBlogLeft();
    parent = parent.trim();
    if (parent.length) {
        localStorage.setItem('blog', parent);
    }
});

blogMasonry.addEventListener('click', () => {
    localStorage.removeItem('blog');
    let parent = generatorContentBlogMasonry();
    parent = parent.trim();
    if (parent.length) {
        localStorage.setItem('blog', parent);
    }
});

withoutSidebar.addEventListener('click', () => {
    localStorage.removeItem('blog');
    let parent = generatorContentBlogwithoutSidebar();
    parent = parent.trim();
    if (parent.length) {
        localStorage.setItem('blog', parent);
    }
});

const initialBlog = () => {
    if (localStorage.getItem('blog') !== null) {
        if (document.querySelector('.blog_body')) {
            document.querySelector('.blog_body').innerHTML =
                localStorage.getItem('blog');
        }
    }
};
initialBlog();

function generatorContentBlogwithoutSidebar() {
    return `
        <div class="sidebar">
        <h3>Blog</h3>
        <nav class="sidebar_none">
        <div class="filter__head_search"><input type="search" placeholder="Search..."><a href="#" class="search_Button"></a></div>
        <ul>
            <li>Categories</li>
            <li>Fashion</li>
            <li>Style</li>
            <li>Accessories</li>
            <li>Season</li>
        </ul></nav>
    </div>
        <div class="blog_content">
        <div class="blog_items one">
            
        </div>
        <div class="pagination">
            <ul>
                
                
            </ul>
        </div>
        </div>
     
        `;
}

function generatorContentBlogMasonry() {
    return `
        <div class="sidebar">
        <h3>Blog</h3>
        <nav>
        <div class="filter__head_search"><input type="search" placeholder="Search..."><a href="#" class="search_Button"></a></div>
        <ul>
            <li>Categories</li>
            <li>Fashion</li>
            <li>Style</li>
            <li>Accessories</li>
            <li>Season</li>
        </ul></nav>
    </div>
        <div class="blog_content">
        <div class="blog_items">
            
        </div>
        <div class="pagination">
            <ul>
                
                
            </ul>
        </div>
        </div>
     
        `;
}

function generatorContentBlogLeft() {
    return `
        <div class="sidebar">
        <h3>Blog</h3>
        <nav>
        <div class="filter__head_search"><input type="search" placeholder="Search..."><a href="#" class="search_Button"></a></div>
        <ul>
            <li>Categories</li>
            <li>Fashion</li>
            <li>Style</li>
            <li>Accessories</li>
            <li>Season</li>
        </ul></nav>
    </div>
        <div class="blog_content">
        <div class="blog_items one">
            
        </div>
        <div class="pagination">
            <ul>
                
                
            </ul>
        </div>
        </div>
     
        `;
}

function generatorContentBlogRight() {
    return `
    <div class="blog_content">
    <div class="blog_items one">
        
    </div>
    <div class="pagination">
        <ul>
            
            
        </ul>
    </div>
    </div>
    <div class="sidebar_right">
        <h3>Blog</h3>
        <nav>
        <div class="filter__head_search"><input type="search" placeholder="Search..."><a href="#" class="search_Button"></a></div>
        <ul>
            <li>Categories</li>
            <li>Fashion</li>
            <li>Style</li>
            <li>Accessories</li>
            <li>Season</li>
        </ul></nav>
    </div>
    `;
}