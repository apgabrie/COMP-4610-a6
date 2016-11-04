/*
 * Andrew Gabriel, andrew_gabriel@student.uml.edu
 * COMP 4610 - 201, Assignment 6
 * This file contains the javascript for the multiplication table.
 */


/* createMultTable():
 * 
 * This function, when called, creates a multiplication table.
 * The values for the table are taken from a form found in the HTML.
 */
function createMultTable() {
    var myForm = document.getElementById('myForm');
    var i;
    var j;
    
    // Check whether input is valid before starting
    for (i=0; i < 4; i++) {
        if (isNaN(myForm.elements[i].value)) {
            document.getElementById('overflowWarning').innerHTML = 'No action taken. Please correct the input and try again.';
            return;
        }
        if (myForm.elements[i].value === '') {
            document.getElementById('overflowWarning').innerHTML = 'No action taken. Please fill out all input fields.';
            return;
        }
    }
    if (parseInt(myForm.elements[1].value) <= parseInt(myForm.elements[0].value) || parseInt(myForm.elements[3].value) <= parseInt(myForm.elements[2].value)) {
        document.getElementById('overflowWarning').innerHTML = 'No action taken. Please correct the input and try again.';
        return;
    }
    if ((parseInt(myForm.elements[1].value) - parseInt(myForm.elements[0].value)) * ((parseInt(myForm.elements[3].value) - parseInt(myForm.elements[2].value))) > 100000) {
        document.getElementById('overflowWarning').innerHTML = 'No action taken. Total number of cells would be too large.';
        return;
    }

    // Create multiplication table
    var multTable = document.getElementById('multTable');
    multTable.innerHTML = '';
    
    var row = multTable.insertRow();
    row.insertCell()
    
    for (i = parseInt(myForm.elements[0].value); i <= parseInt(myForm.elements[1].value); i++) {
        var cell = row.insertCell();
        cell.innerHTML = i;
    }
    
    for (i = parseInt(myForm.elements[2].value); i <= parseInt(myForm.elements[3].value); i++) {
        var row = multTable.insertRow();
        var leftMostCell = row.insertCell();
        leftMostCell.innerHTML = i;
        
        for (j = parseInt(myForm.elements[0].value); j <= parseInt(myForm.elements[1].value); j++) {
            var cell = row.insertCell();
            cell.innerHTML = i * j;
            
        }
    }
    
    // Check if the table overflows the containing div
    var theWrapper = document.getElementById('wrapper');
    var warningMessage = document.getElementById('overflowWarning');
    if (multTable.offsetWidth + 320 > theWrapper.offsetWidth) { 
        warningMessage.innerHTML = 'WARNING: Some content may have been cut off due to the width of the table.';
    } else {
        warningMessage.innerHTML = '';
    }
}

/* validateFormInput():
 * 
 * This function is called repeatedly in order to check whether 
 * the values in the HTML form are valid. If the values are not
 * valid, the class of the offending form input is changed to
 * reflect the invalidity.
 */
function validateFormInput() {
    var myForm = document.getElementById('myForm');
    var i;
    var newHorizontalMsg = '';
    var newVerticalMsg = '';
    
    // Check if the first number is bigger than the second
    if (parseInt(myForm.elements[1].value) <= parseInt(myForm.elements[0].value)) {
        myForm.elements[0].className = 'invalid';
        myForm.elements[1].className = 'invalid';
        newHorizontalMsg = 'The first number must be less than the second.';
    }
    
    if (parseInt(myForm.elements[3].value) <= parseInt(myForm.elements[2].value)) {
        myForm.elements[2].className = 'invalid'
        myForm.elements[3].className = 'invalid';
        newVerticalMsg = 'The first number must be less than the second.';
    }
    
    // Check if each input is a proper number
    for (i=0; i < 4; i++) {
        if (isNaN(myForm.elements[i].value)) {
            myForm.elements[i].className = 'invalid';
            
            if (i === 0 || i === 1) {
                newHorizontalMsg = 'Input must be a number represented by numerals.';
            }
            if (i === 2 || i === 3) {
                newVerticalMsg = 'Input must be a number represented by numerals.';
            }
        }
    }
    
    // If elements are valid, change their class
    if (Number(myForm.elements[1].value) > Number(myForm.elements[0].value)) {
        myForm.elements[0].className = 'valid';
        myForm.elements[1].className = 'valid';
    }
    if (Number(myForm.elements[3].value) > Number(myForm.elements[2].value)) {
        myForm.elements[2].className = 'valid';
        myForm.elements[3].className = 'valid';
    }
    
    // If an element is empty, don't color it as valid or invalid
    for (i=0; i < 4; i++) {
        if (myForm.elements[i].value === '') {
            myForm.elements[i].className = '';
        }
    }
    
    document.getElementById('horizontalErrorMsg').textContent = newHorizontalMsg;
    document.getElementById('verticalErrorMsg').textContent = newVerticalMsg;
}

setInterval(validateFormInput, 250);

var theButton = document.getElementById('myBtn'); 
theButton.addEventListener('click', createMultTable, false);

