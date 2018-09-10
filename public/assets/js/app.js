$(document).ready(function(){
  
  $(".delete").on("click", function (event) {
    event.stopPropagation();
    const id = $(this).attr('id').split('-')[1];
    if (id) {
      $.ajax({
        method: "DELETE",
        url: "/posts/" + id
      }).then((res) => {
        location.reload()
      }).catch((err) => {});
    }
  });
});