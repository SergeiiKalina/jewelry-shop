const commentButoon = document.getElementById('blogCommentsButton');
const form = document.querySelector('.blog_commens_form');
commentButoon.addEventListener('click', (e) => {
  e.preventDefault()
    let formText = form.querySelector('.form_comments_comment').value;
    let email = form.querySelector('.form_comments_email').value;
    let name = form.querySelector('.form_comments_name').value;
    let day = new Date().getDate();
let month = new Date().getMonth();
let yers = new Date().getFullYear();
let checkbox = document.getElementById('checkboxComment');
if(!checkbox.checked){
alert('Need to agree')
return;
}

if(name == ''){
   alert('Enter Name')
  }

if(validateEmail(email)){
email = email;
}
if(!validateEmail(email)){
  alert('wrong email')
return;
}else{
  form.querySelector('.form_comments_email').style.borderColor = 'red'
}
if(month == 0){
  month = "January,";
}
if(month == 1){
  month = "February,";
}
if(month == 2){
  month = "March,";
}
if(month == 3){
  month = "April,";
}
if(month == 4){
  month = "May,";
}
if(month == 5){
  month = "June,";
}
if(month == 6){
  month = "July,";
}
if(month == 7){
  month = "August,";
}
if(month == 8){
  month = "September,";
}
if(month == 9){
  month = "October,";
}
if(month == 10){
  month = "November,";
}
if(month == 11){
  month = "December,";
}
if(formText.trim() == ''){
  alert('Comment is empty')
  return
}

let date = String(day) + ' ' + String(month) + ' ' + String(yers);
    document.querySelector('.post_block_comments').insertAdjacentHTML('beforeend', generateComment(formText, email, name, date))
    qualityComment()
    })
 
function generateComment(formText, email, name, date){
  return `<div class="post_block_comments_comment">
  <div class="post_supcomment">
  <div class="post_comments_comment_img"><img src="assets/images/body/blog/avatar/Img 03 (1).png" alt=""></div>
  <div class="post_comments_comment_txt">
      <div class="post_comments_comment_txt_block">
          <div class="post_comments_comment_txt_title">
              <div class="post_comments_comment_txt_title_user">
          <div class="post_comments_comment_txt_title_name">${name}</div>
         
      </div>
      <div class="post_subcomment_block">
      <div class="post_comments_comment_txt_title_date">${date}</div>
          <div class="post_comments_comment_txt_reply_button"><button>Reply</button></div></div>
      </div>
  </div>
  <div class="post_comments_comment_txt_content">${formText}</div>
  </div></div>
</div>`

}



const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const qualityComment = () =>{
let comentsBlock = document.querySelector('.post_block_comments');
  let coments = comentsBlock.querySelectorAll('.post_block_comments_comment');
  let subComments = comentsBlock.querySelectorAll('.post_block_comments_comment_subcomment')
  let quantity = document.querySelector('.post_block_comments_quantity span')
  quantity.textContent = coments.length + subComments.length;
}
qualityComment()
const formName = document.querySelector('.form_comments_name');
formName.oninput = function (){
    this.value = this.value.substr(0, 15)
}

const reply = document.querySelector('.post_comments_comment_txt_reply_button button');
reply.addEventListener('click', () => {
let replyBlock = document.querySelector('.reply_block');
replyBlock.classList.toggle('activ')
})
const subCommentSend = document.querySelector('.reply_block_button button');
subCommentSend.addEventListener('click', (e) => {
  let target = e.currentTarget;
  let parent = target.closest('.post_supcomment');
  let parentBlock = parent.closest('.post_block_comments_comment');
  let parentBlockSubComment = parentBlock.querySelector('.post_block_comments_comment_subcomment')
  let inputSubComment = parent.querySelector('.reply_block_form input').value;
  let img = parent.querySelector('.post_comments_comment_img img').src;
  parentBlockSubComment.insertAdjacentHTML('beforeend',  generatorSubComment(inputSubComment, img))

})
const generatorSubComment = (text, img) => {
return` <div class="post_supcomment post_supcomment_subcomment">
<div class="post_comments_subcomment_img"><img src="${img}" alt=""></div>
<div class="post_comments_subcomment_txt">
<div class="post_comments_subcomment_txt_block">
    <div class="post_comments_comment_txt_title">
        <div class="post_comments_comment_txt_title_user">
    <div class="post_comments_comment_txt_title_name">Kate moss</div>
</div>
<div class="post_subcomment_block">
<div class="post_comments_comment_txt_title_date">6 May, 2020</div>
    <div class="post_comments_comment_txt_reply_button"><button>Reply</button></div></div>
</div>

</div>
<div class="post_comments_subcomment_txt_content">${text} </div>
</div></div>`
}