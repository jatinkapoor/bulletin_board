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

  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  });
});
