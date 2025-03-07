// 以下のように変更
import { getEmployees, addEmployee, updateEmployee, deleteEmployee, searchEmployee, } from "./service.js"; // .js 拡張子をつける // .js 拡張子に注意
// Render all employees in the list
const renderEmployees = async () => {
    const employees = await getEmployees();
    const employeeList = document.getElementById("employee-list");
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
        const li = document.createElement("li");
        console.log(emp);
        li.innerHTML = `${emp.firstname} ${emp.lastname} 
      <button onclick="viewEmployeeDetails('${emp.id}', '${emp.firstname}', '${emp.lastname}', ${emp.age}, ${emp.isMarried})">VIEW</button>
      <button onclick="prepareEditEmployee('${emp.id}', '${emp.firstname}', '${emp.lastname}', ${emp.age}, ${emp.isMarried})">EDIT</button>
      <button onclick="prepareDeleteEmployee('${emp.id}')">DELETE</button>`;
        employeeList.appendChild(li);
    });
};
// Display employee details in the right panel
const viewEmployeeDetails = (id, firstname, lastname, age, isMarried) => {
    const employeeDetails = document.getElementById("employee-details");
    employeeDetails.innerHTML = `
    <p>
      First name: ${firstname}<br>
      Last name: ${lastname}<br>
      Age: ${age}<br>
      Married: ${isMarried ? "Yes" : "No"}
    </p>
  `;
};
// Prepare form for editing an employee
const prepareEditEmployee = (id, firstname, lastname, age, isMarried) => {
    const idInput = document.getElementById("edit-id");
    const firstnameInput = document.getElementById("edit-firstname");
    const lastnameInput = document.getElementById("edit-lastname");
    const ageInput = document.getElementById("edit-age");
    const isMarriedInput = document.getElementById("edit-isMarried");
    idInput.value = id;
    firstnameInput.value = firstname;
    lastnameInput.value = lastname;
    ageInput.value = age.toString();
    isMarriedInput.checked = isMarried;
};
// Prepare for employee deletion
const prepareDeleteEmployee = (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
        deleteEmployeeHandler(id);
    }
};
// Handle adding a new employee
const addEmployeeHandler = async () => {
    const firstnameInput = document.getElementById("add-firstname");
    const lastnameInput = document.getElementById("add-lastname");
    const ageInput = document.getElementById("add-age");
    const isMarriedInput = document.getElementById("add-isMarried");
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const age = parseInt(ageInput.value);
    const isMarried = isMarriedInput.checked;
    try {
        await addEmployee(firstname, lastname, age, isMarried);
        // Clear the form
        firstnameInput.value = "";
        lastnameInput.value = "";
        ageInput.value = "";
        isMarriedInput.checked = false;
        await renderEmployees();
    }
    catch (e) {
        alert(e.message);
    }
};
// Handle updating an employee
const updateEmployeeHandler = async () => {
    const idInput = document.getElementById("edit-id");
    const firstnameInput = document.getElementById("edit-firstname");
    const lastnameInput = document.getElementById("edit-lastname");
    const ageInput = document.getElementById("edit-age");
    const isMarriedInput = document.getElementById("edit-isMarried");
    const id = idInput.value;
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const age = parseInt(ageInput.value);
    const isMarried = isMarriedInput.checked;
    try {
        await updateEmployee(id, firstname, lastname, age, isMarried);
        // Clear the form
        idInput.value = "";
        firstnameInput.value = "";
        lastnameInput.value = "";
        ageInput.value = "";
        isMarriedInput.checked = false;
        await renderEmployees();
    }
    catch (e) {
        alert(e.message);
    }
};
// Handle deleting an employee
const deleteEmployeeHandler = async (id) => {
    const idInput = document.getElementById("edit-id");
    const employeeId = id || idInput.value;
    try {
        await deleteEmployee(employeeId);
        // Clear the edit form
        idInput.value = "";
        document.getElementById("edit-firstname").value = "";
        document.getElementById("edit-lastname").value = "";
        document.getElementById("edit-age").value = "";
        document.getElementById("edit-isMarried").checked =
            false;
        await renderEmployees();
    }
    catch (e) {
        alert(e.message);
    }
};
// Handle searching for an employee
const searchEmployeeHandler = async () => {
    const searchInput = document.getElementById("search-firstname");
    const firstname = searchInput.value.trim();
    if (!firstname) {
        alert("Please enter a first name to search");
        return;
    }
    try {
        const employee = await searchEmployee(firstname);
        if (employee) {
            viewEmployeeDetails(employee.id || "", employee.firstname, employee.lastname, employee.age, employee.isMarried);
        }
        else {
            document.getElementById("employee-details").innerHTML =
                "<p>No employee found with that name</p>";
        }
    }
    catch (e) {
        alert(e.message);
    }
};
// Add event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("add-employee")
        ?.addEventListener("click", addEmployeeHandler);
    document
        .getElementById("update-employee")
        ?.addEventListener("click", updateEmployeeHandler);
    document
        .getElementById("delete-employee")
        ?.addEventListener("click", () => deleteEmployeeHandler());
    document
        .getElementById("search-employee")
        ?.addEventListener("click", searchEmployeeHandler);
    // Make these functions available globally
    window.viewEmployeeDetails = viewEmployeeDetails;
    window.prepareEditEmployee = prepareEditEmployee;
    window.prepareDeleteEmployee = prepareDeleteEmployee;
    // Load employees when the page loads
    renderEmployees();
});
