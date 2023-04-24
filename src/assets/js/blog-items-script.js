const commentButoon = document.getElementById('blogCommentsButton');
const form = document.querySelector('.blog_commens_form');
commentButoon.addEventListener('click', (e) => {
  e.preventDefault()
    let formText = form.querySelector('.form_comments_comment');
    let email = form.querySelector('.form_comments_email');
    let name = form.querySelector('.form_comments_name');
    let web = form.querySelector('.form_comments_website');
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
if(formText.value.trim() == ''){
  alert('Comment is empty')
  return
}

let date = String(day) + ' ' + String(month) + ' ' + String(yers);
    document.querySelector('.post_block_comments').insertAdjacentHTML('beforeend', generateComment(formText.value, email.value, name.value, date))
    formText.value = '';
    name.value = '';
    email.value = '';
    web.value = '';
    checkbox.checked = false;
    qualityComment()
    })
 
function generateComment(formText, email, name, date){
  return `
<div class="post_block_comments_comment">
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
                            <div class="post_comments_comment_txt_reply_button"><button onclick="showSubForm(this)">Reply</button></div></div>
                        </div>
                    </div>
                    <div class="post_comments_comment_txt_content">${formText}</div>
                    <div class="reply_block"><div class="reply_block_form"><img src="assets/images/body/blog/avatar/Img 03 (1).png" alt=""><input type="text" placeholder="sometext..."></div><div class="reply_block_button"><button data-subreply="subreply" onclick="sendSubComment(this)">Send</button></div></div>
                    </div></div>
                    <div class="post_subcomments_block"></div>
                </div>

`

}



const validateEmail = (email) => {
  return email.value.match(
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




let reply = document.querySelectorAll('.post_comments_comment_txt_reply_button button');
const subCommentSend = document.querySelectorAll('.reply_block_button button');
subCommentSend.forEach(item => {
  item.addEventListener('click', () => {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let yers = new Date().getFullYear();
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
    
    let date = String(day) + ' ' + String(month) + ' ' + String(yers);
let parent = item.closest('.post_block_comments_comment');
let parentBlockSubComment = parent.querySelector('.post_subcomments_block')
let inputSubComment = parent.querySelector('.reply_block_form input');
  let img = parent.querySelector('.post_comments_comment_img img').src;
  if(item.dataset.subreply){
    let subParent = item.closest('.post_block_comments_comment_subcomment');
    let inputSubComment = subParent.querySelector('.reply_block_form input');
    parentBlockSubComment.insertAdjacentHTML('beforeend',  generatorSubComment(inputSubComment.value, img, date))
    document.querySelectorAll('.reply_block').forEach(item => item.classList.remove('activ'))
    inputSubComment.value = '';
    qualityComment()
  }
  if(item.dataset.subreply) return;
  parentBlockSubComment.insertAdjacentHTML('beforeend',  generatorSubComment(inputSubComment.value, img, date));
  inputSubComment.value = '';
  document.querySelectorAll('.reply_block').forEach(item => item.classList.remove('activ'))
  qualityComment()
  })
})

function showSubForm(element){
  if(element.dataset.reply){
    let parent = element.closest('.post_supcomment_subcomment')
    parent.querySelector('.reply_block').classList.toggle('activ')
  }else{
    let parent = element.closest('.post_supcomment')
    parent.querySelector('.reply_block').classList.toggle('activ');
  }
}
function sendSubComment(element){
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let yers = new Date().getFullYear();
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

  let date = String(day) + ' ' + String(month) + ' ' + String(yers);
  if(element.dataset.subreply){
    let parent = element.closest('.post_block_comments_comment');
    let inputSubComment = parent.querySelector('.reply_block_form input');
    let img = parent.querySelector('.post_comments_comment_img img').src;
    let parentBlockSubComment = parent.querySelector('.post_subcomments_block');
    parentBlockSubComment.insertAdjacentHTML('beforeend',  generatorSubComment(inputSubComment.value, img, date))
    inputSubComment.value = '';
    document.querySelectorAll('.reply_block').forEach(item => item.classList.remove('activ'))
  }else{
    let parent = element.closest('.post_block_comments_comment_subcomment');
    let inputSubComment = parent.querySelector('.reply_block_form input');
    let img = parent.querySelector('.post_comments_subcomment_img img').src;
    let parentBlockSubComment = parent.closest('.post_subcomments_block');
    parentBlockSubComment.insertAdjacentHTML('beforeend',  generatorSubComment(inputSubComment.value, img, date))
    inputSubComment.value = '';
    document.querySelectorAll('.reply_block').forEach(item => item.classList.remove('activ'))
  }
  
}

const generatorSubComment = (text, img, date) => {
return`<div class="post_block_comments_comment_subcomment">
<div class="post_supcomment post_supcomment_subcomment">
<div class="post_comments_subcomment_img"><img src="${img}" alt=""></div>
<div class="post_comments_subcomment_txt">
<div class="post_comments_subcomment_txt_block">
    <div class="post_comments_comment_txt_title">
        <div class="post_comments_comment_txt_title_user">
    <div class="post_comments_comment_txt_title_name">Kate moss</div>
</div>
<div class="post_subcomment_block">
<div class="post_comments_comment_txt_title_date">${date}</div>
    <div class="post_comments_comment_txt_reply_button"><button data-reply="reply" onclick="showSubForm(this)">Reply</button></div></div>
</div>

</div>
<div class="post_comments_subcomment_txt_content">${text}</div>
<div class="reply_block"><div class="reply_block_form">
<img src="assets/images/body/blog/avatar/Img 03 (1).png" alt=""><input type="text" placeholder="sometext..."></div>
<div class="reply_block_button"><button onclick="sendSubComment(this)">Send</button></div></div>
</div></div>
</div>`
}

for(let item of reply){
  item.addEventListener('click', () => {
    if(item.dataset.reply){
     let subParent = item.closest('.post_block_comments_comment_subcomment')
     let subcommentsForm = subParent.querySelector('.reply_block');
     subcommentsForm.classList.toggle('activ')
     }
     if(item.dataset.reply) return;
let parent = item.closest('.post_block_comments_comment');
let commentForm = parent.querySelector('.reply_block')
commentForm.classList.toggle('activ')
  })
}
