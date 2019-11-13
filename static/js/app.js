// getting buttons
let btnLogin = document.getElementById('btnLogin');
let btnRegister = document.getElementById('btnRegister');
let btnCancel = document.getElementById('btnCancel');
let btnAdd = document.getElementById('btnAdd');
let btnEdit = document.getElementById('btnEdit');
let btnLogout = document.getElementById('btnLogout');
let checkOutBtn = document.getElementById('checkOutBtn');
let cartDiv = document.getElementById('cartDiv');
let prodDiv = document.getElementById('prodDiv');


if(btnAdd!=null)
btnAdd.addEventListener('click',addProduct);
if(btnCancel!=null)
btnCancel.addEventListener('click',()=>{window.location.href="/";});
if(btnEdit!=null)
btnEdit.addEventListener('click',editProduct);
if(btnLogin!=null)
btnLogin.addEventListener('click',login);
if(btnRegister!=null)
btnRegister.addEventListener('click',register);
if(checkOutBtn!=null){
checkOutBtn.addEventListener('click',checkOut);
// document.querySelector('body').addEventListener('beforeunload',updateQty);
}
if(prodDiv!=null){
prodDiv.addEventListener('click',prodFunc);
prodDiv.addEventListener('keyup',checkQuantity);
}
if(cartDiv!=null)
cartDiv.addEventListener('click',cartFunc);
if(btnLogout!=null)
btnLogout.addEventListener('click',logout);

//getting forms
let loginForm = document.getElementById('loginForm');
let registerForm = document.getElementById('registerForm');
let addProductForm = document.getElementById('addProductForm');
let editProductForm = document.getElementById('editProductForm');

function login(e){
  e.preventDefault();
  console.log("okk");
  $.ajax({
    type:"POST", 
    url:"/user/login",
    data:{
      email:loginForm.email.value,
      password:loginForm.password.value
    },
    success :(data,status)=>{
      if(data.error==null)
      {
          window.location.href= '/';
      }
      else
      {
        $('#errorDiv').html(data.error);
        $('#errorDiv').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#errorDiv').removeClass('d-block').addClass('d-none');
        },5000);
      }
    }
  })
}

function register(e){
  e.preventDefault();
  if(registerForm.password.value!=registerForm.cpassword.value){
    $('#errorDiv').html("Password doesn't match");
    $('#errorDiv').removeClass('d-none').addClass('d-block');
    setTimeout(()=>{
      $('#errorDiv').removeClass('d-block').addClass('d-none');
    },5000);
  }
  else{
    $.ajax({
      type:'POST',
      url:'/user/register',
      data:{
        name:registerForm.name.value,
        email:registerForm.email.value,
        password:registerForm.password.value,
        mobileno:registerForm.mobile.value,
        address:registerForm.address.value
      },
      success:(data,status)=>{
        if(data.error==null)
        {
          window.location.href= '/';
        }
        else
        {
          $('#errorDiv').html(data.error);
          $('#errorDiv').removeClass('d-none').addClass('d-block');
          setTimeout(()=>{
            $('#errorDiv').removeClass('d-block').addClass('d-none');
          },5000);
        }  
      }
    })
  }
}

function logout(){
  $.ajax({
    type:'POST',
    url:'/user/logout',
    success:(data,status)=>{
      if(data.error==null)
      {
        window.location.href='/';
      }
      else
      console.log(data.error);
    }
  })
}

function addProduct(e)
{
  e.preventDefault();
  $.ajax({
    type:'POST',
    url:'/prod/addProduct',
    data:{
      name:addProductForm.name.value,
      desc:addProductForm.desc.value,
      quan:addProductForm.quan.value,
      price:addProductForm.price.value
    },
    success:(data,status)=>{
      if(data.error==null)
      {
        $('#successAdd').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#successAdd').addClass('d-none').removeClass('d-block');
          window.location.href="/";
        },750);
      }
      else
      {
        $('#errorAdd').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#errorAdd').addClass('d-none').removeClass('d-block');
        },2000);
      }
    }
  })
}

function editProduct(e)
{
  e.preventDefault();
  $.ajax({
    type:'POST',
    url:'/prod/editProduct',
    data:{
      id:editProductForm.pid.value,
      name:editProductForm.name.value,
      desc:editProductForm.desc.value,
      quan:editProductForm.quan.value,
      price:editProductForm.price.value
    },
    success:(data,status)=>{
      if(data.error==null)
      {
        $('#successEdit').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#successEdit').addClass('d-none').removeClass('d-block');
          window.location.href="/";
        },2000);
      }
      else
      {
        $('#errorEdit').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#errorEdit').addClass('d-none').removeClass('d-block');
        },2000);
      }
    }
  })
}

function checkQuantity(e)
{
  if(e.target.classList.contains('cartCheck'))
  {
    let addbtn = e.target.nextElementSibling.firstElementChild;
      if(e.target.value>parseInt(e.target.max)||e.target.value<0)
      {
        e.target.classList.add('border-danger');
        addbtn.setAttribute('disabled',true);
      }
      else
      {
        e.target.classList.remove('border-danger');
        addbtn.removeAttribute('disabled');
      }
  }
}

function prodFunc(e)
{
  if(e.target.classList.contains('delBtn'))
  {
    let id = e.target.parentElement.parentElement.id;
    $.ajax({
      type:'POST',
      url:'/prod/deleteProduct',
      data:{
        id:id
      },
      success:(data,status)=>{
        if(data.error==null)
        {
          document.getElementById(id).remove();
          $('#successDel').removeClass('d-none').addClass('d-block');
          setTimeout(()=>{
            $('#successDel').addClass('d-none').removeClass('d-block');
          },1500);
        }
        else
        {
          $('#errorDel').removeClass('d-none').addClass('d-block');
          setTimeout(()=>{
            $('#errorDel').addClass('d-none').removeClass('d-block');
          },2000);
        }
      }
    })
  }
  else if(e.target.classList.contains('addToCart'))
  {
    let id = e.target.parentElement.parentElement.parentElement.parentElement.id;
    let qty = e.target.parentElement.previousElementSibling.value;
    if(qty=="")
    {
      alert("Please Enter a Quantity");
    }
    else if(qty>parseInt(e.target.max)||qty<0)
    {
      alert("Please Enter a valid Quantity");
    }
    else
    {
      $.ajax({
        type:'POST',
        url:'/cart/addToCart',
        data:{
          pid:id,
          qty:qty
        },
        success:(data,status)=>{
          if(data.error==null)
          {
            alert('Product Added To Cart');
          }
          else if(data.error=="Login is required")
          window.location.href='/user/login';
        }
      })
    }
  }
}

function cartFunc(e)
{
  if(e.target.classList.contains('removeBtn')){
    let pid = e.target.parentElement.parentElement.parentElement.parentElement.id;

    $.ajax({
      type:'POST',
      url:'/cart/removeProd',
      data:{
        pid:pid
      },
      success:(data,status)=>{
        if(data.error==null)
        {
          document.getElementById(pid).remove();
          let card = document.querySelectorAll('.card');
          if(card.length==0)
          window.location.reload();
        }
      }
    })
  }
  
}

function checkOut(e)
{
  $.ajax({
    type:'POST',
    url:'/cart/checkOut',
    success:(data,status)=>{
      if(data.error==null)
      {
        $('#errorCheckOut').html("Purchase Successfull");
        $('#errorCheckOut').removeClass('d-none').removeClass('alert-danger').addClass('d-block').addClass('alert-success');
        setTimeout(()=>{
          $('#errorCheckOut').addClass('d-none').removeClass('alert-success').removeClass('d-block').addClass('alert-danger');
          window.location.href='/';
        },1000);
      }
      else
      {
        $('#errorCheckOut').html(data.error);
        $('#errorCheckOut').removeClass('d-none').addClass('d-block');
        setTimeout(()=>{
          $('#errorCheckOut').addClass('d-none').removeClass('d-block');
        },1500);
      }
    }
  })
}