// VARIABLES
const errorMessages = {
    fname: 'Must be at least one character',
    lname: 'Must be at least one character',
    email: 'Must be a valid email address',
    phone: 'Must be a valid swedish cell phone number (+46123465789)',
    pin: 'Must be exactly six numerical digits (123456)',
    pinConfirm: 'Pin confirmation must be six numerical digits and the same as the pin'
}

const defaultMessages = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    pin: 'Six numerical digits (123456)',
    pinConfirm: '',
}

const formInputs = {
    fname: document.querySelector('#fname'),
    lname: document.querySelector('#lname'),
    email: document.querySelector('#email'),
    phone: document.querySelector('#phone'),
    pin: document.querySelector('#pin'),
    pinConfirm: document.querySelector('#pinConfirm')
}

var errorArray = [];

// EVENT LISTENERS
document.querySelector('body').addEventListener('mousedown', (e) => {
    for (const key in formInputs ) {
        let el = `${formInputs[key].id}-element`
        document.querySelector(`#${el}`).classList.remove('shake')
    }
})

// MAIN FUNCTIONS (TRIGGERED)
function validateKeyUp (e) {
    e.preventDefault();

    const target = document.querySelector(`#${e.target.id}-element`);
    target.classList.remove('error');
}

function validateSubmit(e) {
    e.preventDefault();
    
    errorArray = [];

    for (const key in formInputs ) {
        if (formInputs[key].hasAttribute('required')) { 
            ifEmpty(formInputs[key]); 
        }
        validationSwitch(formInputs[key], formInputs.pin);
    }
    
    if (!errorArray.includes(true)) {
        const userValues = {
            fname: document.querySelector('#fname').value,
            lname: document.querySelector('#lname').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value,
            pin: document.querySelector('#pin').value
        }
        sendData(userValues);
    }
}

// VALIDATE FUNCTIONS
function ifEmpty(inp) {
    if (inp.value == "") {
        error(inp, true)
    }
    else {
        error(inp, false)
    }
}

function validationSwitch(inp, pin) {
    switch(inp.type) {
        case 'text':
            return;
        default:
            break;
    }

    switch(inp.id) {
        case 'email':
            const emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            error(inp, !emailRegex.test(inp.value));
            break;

        case 'phone':
            if (inp.value != '') {
                    const phoneRegex = /^(?:\+46|0046)(7[0236]\d{7})$/;
                    error(inp, !phoneRegex.test(inp.value));
                }
            break;

        case 'pin':
            const pinRegex = /^\d{6}$/;
            error(inp, !pinRegex.test(inp.value));
            break;

        case 'pinConfirm':
            const pinConfirmRegex = /^\d{6}$/;
            if (!pinConfirmRegex.test(inp.value)) {
                error(inp, true);
                break;
            }
            else {
                if (inp.value != pin) {
                    error(inp, true);
                    break;
                }
                else {
                    break;
                }
            }
        default:
          break;
      }
}

// ERROR HANDLING
function error(inp, add) {
    const target = document.querySelector(`#${inp.id}-element`);
    const errorP = document.querySelector(`#${target.id} > p`);

    if (add) {
        target.classList.add('error');
        target.classList.add('shake');
        errorP.innerHTML = errorMessages[inp.id];
        errorArray.push(true);
    }
    else {
        target.classList.remove('error');
        errorP.innerHTML = defaultMessages[inp.id];
    }
}

// API FUNCTIONS
async function sendData(userObj) {
    userJson = JSON.stringify(userObj);
    console.log(userJson);
    try {
        const result = await fetch('https://www.couchveggie.com/api');
    }
    catch(err) {
        console.log(err)
    }

}