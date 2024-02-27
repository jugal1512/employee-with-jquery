function setEmployee(employeeDetails)
{
    localStorage.setItem("employeeDetails", JSON.stringify(employeeDetails));
}

function getEmployee()
{
     const employees = localStorage.getItem('employeeDetails');
     return employees ? JSON.parse(employees) : [];
}

function addEmployee(employee,id)
{
    let employeeDetails = getEmployee();
     if(id == 0)
     {
        employee.id = generateId();
        employeeDetails.push(employee);
        setEmployee(employeeDetails);
    }
     else
     {
         for (let i = 0; i < employeeDetails.length; i++)
         {
             if(employeeDetails[i].id == id)
             {
                 employee.id = id;
                 employeeDetails[i] = employee;
             }
         }
         setEmployee(employeeDetails);
     }
}

function deleteEmployee(id)
{
    const employeeDetails = getEmployee();
    let deleteData = employeeDetails.filter((employee) => employee.id != id);
    setEmployee(deleteData);
    displayData();
}

function getEmployeeById(id)
{
    const employeeDetails = getEmployee();
    return employeeDetails.find((employee) => employee.id == id);
}

function generateId()
{
    let employeeDetails = getEmployee();
    const ids = employeeDetails.map((employee) => employee.id);
    if(employeeDetails.length == 0){
        return 1;
    }
    else
    {
        return Math.max(...ids) + 1;
    }
}

function searchEmployee(inputSearch)
{
    let employeeDetails = getEmployee();
    return employeeDetails.filter((employee) => employee.id == inputSearch || employee.FirstName == inputSearch);
}
