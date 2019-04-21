$(document).ready(onReady);

let employeeArray = [];
let monthlyBudget = 20000;

employeeArray.push({
    firstName: undefined,
    lastName: undefined,
    idNumber: undefined,
    jobTitle: undefined,
    annualSalary: undefined,

});

function onReady() {
    render();

    $('.container').on('click', '.deleteBtn', clickDeleteButton);
    $('#newEmployee').on('submit', submitForm);

    calculateMonthlySalary();

}

function clickDeleteButton() {
    let indexForDelete = $(this).parent().data('id');
    employeeArray.splice(indexForDelete, 1);
    render();
}

function submitForm(event) {
    event.preventDefault();

    let entry = {};
    console.log('serialize', $(this).serializeArray());
    $(this).serializeArray().forEach(function(item){
        entry[item.name] = item.value;
        console.log(item);
    });
    console.log(entry);
    $(this).trigger('reset');

    employeeArray.push(entry);
    console.log(employeeArray);
    render();
}

function render() {
    $('.container').empty();
    for (let i = 0; i < employeeArray.length; i++) {
        $('.container').append('<div></div>');
        let newDiv = $('.container').children().last();
        newDiv.data('id', i);
        let employee = employeeArray[i];
        newDiv.append('<p>' + employee.firstName + '</p>');
        newDiv.append('<p>' + employee.lastName+ '</p>');
        newDiv.append('<p>' + employee.idNumber + '</p>');
        newDiv.append('<p>' + employee.jobTitle + '</p>');
        newDiv.append('<p>' + employee.annualSalary + '</p>');
        newDiv.append('<button class="deleteBtn">Fire</button>');
    }
    
    calculateMonthlySalary()
}

function calculateMonthlySalary() {

    let totalSalary = 0;
    let monthlySalary = 0;

    for (let i = 0; i < employeeArray.length; i++ ){
        let employee = employeeArray[i];
        monthlySalary = employee.annualSalary / 12;
        totalSalary += monthlySalary;
        monthlySalary = parseInt(totalSalary);

    }

    $('#totalMonthly').text('Total Monthly Budget: $'+ totalSalary);
    if (monthlySalary > monthlyBudget) {
        $('#totalMonthly').addClass('red');
    }
};