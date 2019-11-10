// getting buttons
let btnLogin = document.getElementById('btnLogin');
let btnRegister = document.getElementById('btnRegister');
let btnCancel = document.getElementById('btnCancel');
let btnAdd = document.getElementById('btnAdd');
let btnEdit = document.getElementById('btnEdit');
let prodDiv = document.getElementById('prodDiv');

if(btnAdd!=null)
btnAdd.addEventListener('click',addProduct);
if(btnCancel!=null)
btnCancel.addEventListener('click',()=>{});
if(btnEdit!=null)
btnEdit.addEventListener('click',editProduct);
if(btnLogin!=null)
btnLogin.addEventListener('click',login);
if(btnRegister!=null)
btnRegister.addEventListener('click',register);
if(prodDiv!=null)
prodDiv.addEventListener('click',prodFunc);

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
        if(data.adminLogin==true)
          window.location.href = '/product';
        else
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
}