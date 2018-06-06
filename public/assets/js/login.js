$(document).ready(() => {
  
  $('.register-link').on('click', () => {
    $('.login').hide();
    $('.register').show();
  });

  $('.login-link').on('click', () => {
    $('.register').hide();
    $('.login').show();
  });

  // $('#login-form').on('click', (event) => { 
  //   event.preventDefault();
  //   const email = $('#login-email').trim().val();
  //   const pass = $('#login-pass').trim().val();
  // });

  
});
