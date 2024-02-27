$(document).ready(function() {
    $("#btnSave").click(function() {
        let parentContainer = $("#myModal");
        let isValidate = validate(parentContainer);
        if(isValidate){
            let id = $('#hiddenId').val();
            let firstName = $('#txtFirstName').val();
            let lastName = $('#txtLastName').val();
            let email = $('#txtEmail').val();
            let gender = $('input[name="gender"]:checked').val();
            let dob = $('#dpDob').val();
            let joiningDate = $('#dpJoinDate').val();
            let designation = $('#drpDesignation').val();
            let description = $('#txtDescription').val();
            let image = $('#imgUploadImage').attr('src'); 
            let skillItems = [];
            $('#skillAdded').children('li').each(function(){
                skillItems.push($(this).text());
            });
            const employee = {
            Image : image,
            FirstName : firstName,
            LastName : lastName,
            Email : email,
            Gender : gender,  
            DOB : dob,
            joining_Date : joiningDate,
            Designation : designation,
            Description : description,
            Skills : skillItems
        }
        if(id == "")
        {
            addEmployee(employee,0);    
        }
        else
        {
            addEmployee(employee,id);    
        }
        sweatAlertAddData();
        emptyField();
        $('form')[0].reset();
        displayData();
    }
});
displayData();

        $('#btnAdd').click(function(){
            let inputSearch = $('#txtSkill').val();
            $('#skillAdded').append('<li class="skillLists">' + inputSearch + ' <i class="fa-solid fa-xmark"></i> </li>')
            $('#txtSkill').val("");
            $('#skillAdded').on('click','.fa-xmark',function(){
                $(this).parent('li').remove();
            });
        });

        $('#btnsearch').click(function(){
            let inputSearch = $('#inputSearch').val();
            let employeeData = $('#tblEmployee')
            employeeData = "";
            if(inputSearch == "")
            {
                displayData();
            }
            else
            {
                let employeeDetails = searchEmployee(inputSearch);
                $('#tblEmployee tbody').empty();  
                employeeDetails.forEach(function (employee) {
                    employeeData += "<tr>";
                    employeeData += "<td><button class='btn btnExpand' type='button'><i class='fa-solid fa-circle-plus'></i></button></td>";
                    employeeData += "<td>" + '<img class="rounded-circle profileImage" src="' + employee.Image + '" alt="" height="50px" width="50px" />' + "</td>";
                    employeeData += "<td>" + employee.FirstName + " " + employee.LastName + "</td>";
                    employeeData += "<td>" + employee.Email + "</td>";
                    employeeData += "<td>" + employee.Designation + "</td>";
                    employeeData += "<td>" + employee.Gender + "</td>";
                    employeeData += "<td>" + '<button id="' + employee.id + '" class="btn btnUpdate"><i class="fa-solid fa-pen" style="color: #e6c805;"></i></button> <button type="button" id="'+ employee.id + '" class="btn btnDelete ms-3" ><i class="fa-solid fa-trash" style="color: #e30d0d;"></i></button> ' + "</td>";
                    employeeData += "</tr>";
                    employeeData += "<tr class='hiddenRow' style='display: none;'>";
                    employeeData += "<td></td>";
                    employeeData += "<td><strong>Description:</strong> " + employee.Description + "</td>";
                    employeeData += "<td><strong>DOB:</strong> " + employee.DOB + "</td>";
                    employeeData += "<td><strong>Joining Date:</strong> " + employee.joining_Date + "</td>";
                    employeeData += "<td><strong>Skills:</strong> " + employee.Skills + "</td>";
                    employeeData += "</tr>";
                });
                $('#tblEmployee tbody').append(employeeData).html();
            }
        });
});

$(document).on('click','.btnExpand',function() {
    $(this).closest('tr').next('.hiddenRow').toggle();
});

$(document).on('click','.btnDelete',function(){
    let id = $(this).attr('id');
    sweetAlertDeleteData(id,onDeleteEmployee);
    function onDeleteEmployee(id)
    {
        deleteEmployee(id);
    }
});

$(document).on('click','.btnUpdate',function(){
    let id = $(this).attr('id');
    let employeeDetails = getEmployeeById(id);
    $('#hiddenId').val(employeeDetails.id)
    $('#txtFirstName').val(employeeDetails.FirstName)
    $('#txtLastName').val(employeeDetails.LastName);
    $('#txtEmail').val(employeeDetails.Email);
    $('#dpDob').val(employeeDetails.DOB);
    $('#dpJoinDate').val(employeeDetails.joining_Date);
    $('#drpDesignation').val(employeeDetails.Designation);
    $('#txtDescription').val(employeeDetails.Description);
    let skillsAddedValue = [];
    skillsAddedValue = employeeDetails.Skills;
     for(let i =0;i < skillsAddedValue.length;i++)
     {
        $('#skillAdded').append('<li class="skillLists">' + skillsAddedValue[i] + ' <i class="fa-solid fa-xmark"></i> </li>')
        $('#txtSkill').val("");
        $('#skillAdded').on('click','.fa-xmark',function(){
            $(this).parent('li').remove();
        });
     }
    if(employeeDetails.Gender == "Male")
    {
        $('#rbtGenderMale').prop("checked",true);
    }
    else
    {
        $('#rbtGenderFemale').prop("checked",true);
    }
    $('#imgUploadImage').attr('src',employeeDetails.Image);
    $('#imgUploadImage').html(employeeDetails.Image);
    $('#myModal').show();
});

function emptyField()
{
    $('#imgUploadImage').attr('src','');
    $('#skillAdded').text("");
    $('.validateError').remove();
}

function displayData()
{
    let employeeDetails = getEmployee();
    $('#paginationTable').pagination({
        dataSource: employeeDetails,
        pageSize: 5,
        pageRange: null,
        showPageNumbers: true,
        callback: function(employeeDetails, pagination) {
            let employeeData = "";
            $('#tblEmployee tbody').empty();
            employeeDetails.forEach(function (employee) {
                employeeData += "<tr>";
                employeeData += "<td><button class='btn btnExpand' type='button'><i class='fa-solid fa-circle-plus'></i></button></td>";
                employeeData += "<td>" + '<img class="rounded-circle profileImage" src="' + employee.Image + '" alt="" height="50px" width="50px" />' + "</td>";
                employeeData += "<td>" + employee.FirstName + " " + employee.LastName + "</td>";
                employeeData += "<td>" + employee.Email + "</td>";
                employeeData += "<td>" + employee.Designation + "</td>";
                employeeData += "<td>" + employee.Gender + "</td>";
                employeeData += "<td>" + '<button id="' + employee.id + '" class="btn btnUpdate"><i class="fa-solid fa-pen" style="color: #e6c805;"></i></button> <button type="button" id="'+ employee.id + '" class="btn btnDelete ms-3" ><i class="fa-solid fa-trash" style="color: #e30d0d;"></i></button> ' + "</td>";
                employeeData += "</tr>";
                employeeData += "<tr class='hiddenRow' style='display: none;'>";
                employeeData += "<td></td>";
                employeeData += "<td><strong>Description:</strong> " + employee.Description + "</td>";
                employeeData += "<td><strong>DOB:</strong> " + employee.DOB + "</td>";
                employeeData += "<td><strong>Joining Date:</strong> " + employee.joining_Date + "</td>";
                employeeData += "<td><strong>Skills:</strong> " + employee.Skills + "</td>";
                employeeData += "</tr>";
        });
            $('#tblEmployee tbody').append(employeeData).html();
        }
    });
}









