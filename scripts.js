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

function validateKeyUp (e) {
    e.preventDefault();

    const target = document.querySelector(`#${e.target.id}-object`);
    //const errorP = document.querySelector(`#${target.id} > p`);
    target.classList.remove('error');
}

function validateSubmit(e) {
    e.preventDefault();

    for (const key in formInputs ) {
        let obj = `${formInputs[key]}-object`
        ifEmpty(formInputs[key]);
        validationSwitch(formInputs[key], formInputs.pin.value.toString());
    }
}

function ifEmpty(obj) {
    if (obj.value == "") {
        error(obj, true)
    }
    else {
        error(obj, false)
    }
}

function validationSwitch(obj, pin) {
    switch(obj.type) {
        case 'text':
            break;
        default:
            break;
    }

    switch(obj.id) {
        case 'email':
            const emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            error(obj, !emailRegex.test(obj.value));
            break;
        case 'phone':
            const phoneRegex = /^(?:\+46|0046)(7[0236]\d{7})$/;
            error(obj, !phoneRegex.test(obj.value));
            break;
        case 'pin':
            const pinRegex = /^\d{6}$/;
            error(obj, !pinRegex.test(obj.value));
            break;
        case 'pinConfirm':
            console.log('switch pinConfirm');
            const pinConfirmRegex = /^\d{6}$/;
            if (!pinConfirmRegex.test(obj.value)) {
                error(obj, true);
                break;
            }
            else {
                if (obj.value != pin) {
                    error(obj, true);
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

function error(obj, add) {
    const target = document.querySelector(`#${obj.id}-object`);
    const errorP = document.querySelector(`#${target.id} > p`);

    if (add) {
        target.classList.add('error');
        target.classList.add('shake');
        errorP.innerHTML = errorMessages[obj.id];
    }
    else {
        target.classList.remove('error');
        errorP.innerHTML = defaultMessages[obj.id];
    }    
}

document.querySelector('body').addEventListener('mousedown', (e) => {
    for (const key in formInputs ) {
        let obj = `${formInputs[key].id}-object`
        document.querySelector(`#${obj}`).classList.remove('shake')
    }
})