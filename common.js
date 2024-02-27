$(document).ready(function() {
  $('#addEmployee').click(function() {
    $('#myModal').slideDown("slow");
  });

  $('.closeModal').click(function(){
    $('#myModal').slideUp("slow");
    $('form')[0].reset();
    emptyField();
  });

  $('#fProfileImage').on('change',function(event){
    let input = event.target;
    let image = $('#imgUploadImage')[0];
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e) {
          image.src = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
  }
  });
});

function sweatAlertAddData()
{
        Swal.fire({
        title: "Thank You!",
        text: "Done😊!",
        icon: "success"
  });
}


function sweetAlertDeleteData(id,callBack)
{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            callBack(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}




