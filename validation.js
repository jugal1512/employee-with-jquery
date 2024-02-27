function validate(parentContainer) {
  let isValidate = true;
  let inputControls = $(parentContainer).find(".nt-required");
  let emailControls = $(parentContainer).find(".nt-valid");
  $(".validateError").remove();
  inputControls.each(function (index, inputControl) {
    const type = $(inputControl).attr("type");
    const errorMessage = $(inputControl).attr("errorMessage");
    
    if (type === "select" || type === "file" || type === "text" ||type === "date" ) {
        checkClickValue(inputControl,errorMessage);
    }
    if(type === "text")
    {
      checkKeyUpValue(inputControl,errorMessage);
    }
    if(type === "select" || type === "file" || type === "date")
    {
      checkChangeValue(inputControl,errorMessage);  
    }
  });
  emailControls.each(function (index, emailControl) {
  const type = $(emailControl).attr("type");
  const validEmail = $(emailControl).attr("validEmail");
  let errorMessage = $(emailControl).attr("errorMessage");
  if (type === "email") {
    isValidate = checkClickEmail(emailControl,errorMessage,validEmail) && isValidate;
    $(emailControl).keyup(function () {
      $(emailControl).next(".validateError").remove();
      checkClickEmail(emailControl,errorMessage,validEmail);
    });
  }
});
  return isValidate;
}

function showErrorMessage(inputControl, errorMessage) {
    $(inputControl).after('<span class="validateError">' + errorMessage + "</span>");
}

function checkEmail(email) {
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function checkClickValue(inputControl,errorMessage)
{
  if ($(inputControl).val() === "") {
    showErrorMessage(inputControl, errorMessage);
    return false;
  }
  return true;
}

function checkKeyUpValue(inputControl,errorMessage)
{
  $(inputControl).keyup(function(){
      $(inputControl).next(".validateError").remove();
      checkClickValue(inputControl,errorMessage);
  });  
}

function checkChangeValue(inputControl,errorMessage)
{
     $(inputControl).change(function(){
      $(inputControl).next(".validateError").remove();
      checkClickValue(inputControl,errorMessage);
   });
}

function checkClickEmail(emailControl,errorMessage,validEmail)
{
        if ($(emailControl).val() === "") {
          showErrorMessage(emailControl,errorMessage);
          return false;
        } else if (!checkEmail($(emailControl).val())) {
        showErrorMessage(emailControl,validEmail);
        return false;
        }
      return true;
}

function checkKeyUpEmail(emailControl,errorMessage,validEmail)
{
  
}


