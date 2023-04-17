

////// Pagination ///////
const paginationList = document.querySelector('.pagination ul');
const blogContent = document.querySelector('.blog_items');
const bigItemsBlog = document.querySelector('.one')
let notesOnPage;
console.log(bigItemsBlog)
if(bigItemsBlog){
    notesOnPage = 2;
}else{
    notesOnPage = 4;
}

let countItems = Math.ceil(blogPostDate.length / notesOnPage);
for(let index = 1; index <= countItems; index++){
   let li = `<li>${index}</li>`;
    paginationList.insertAdjacentHTML('beforeend', li) 
}


const paginationBtn = document.querySelectorAll('.pagination li');
paginationList.insertAdjacentHTML('beforeend', `<a href="#">›</a>`)


const paginationBtnOne = document.querySelector('.pagination li');
const paginationNext = document.querySelector('.pagination a');
let pageNum;


paginationNext.addEventListener('click', (e) => {
    e.preventDefault();
    if(pageNum == countItems) return;
    paginationBtn.forEach(item => item.classList.remove('activ'))
    paginationBtn[pageNum].classList.add('activ');
   pageNum = Number(pageNum) + Number(1);
    let start = (pageNum - 1) * notesOnPage;
    let end = start + notesOnPage;
    let notes = blogPostDate.slice(start, end)
    blogContent.innerHTML = '';
   
for(let item of notes){
blogContent.insertAdjacentHTML('afterbegin', GeneratBlogCard(item.pictures, item.date, item.title, item.txt))
}  
})

for(let item of paginationBtn){
    item.addEventListener('click', () => {
        paginationBtn.forEach(item => item.classList.remove('activ'))
        item.classList.add('activ')
        pageNum = item.innerHTML;
        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;
        let notes = blogPostDate.slice(start, end)
        blogContent.innerHTML = '';
for(let item of notes){
    blogContent.insertAdjacentHTML('afterbegin', GeneratBlogCard(item.pictures, item.date, item.title, item.txt))
}
    })
}


function GeneratBlogCard(pictures, date, title, txt){
return `<div class="blog_item">
<img src="${pictures}" alt="">
<div class="blog_item_date">${date}</div>
<div class="blog_item_name">${title}</div>
<div class="blog_item_text">${txt}</div>
<div class="blog_item_readmore">Read More</div>
</div>`
}
paginationBtnOne.click();

//////////////////////////////////////////////////////////////////////