const errorMessages = {
    fname: 'Must be at least one character',
    lname: 'Must be at least one character',
    email: 'Must be a valid email address',
    phone: 'Must be a valid swedish cell phone number (+46123465789)',
    pin: 'Must be exactly six numerical digits',
    pinConfirm: 'Pin confirmation must be the same as the pin'
}

const defaultMessages = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    pin: 'Six numerical digits (123456)',
    pinConfirm: '',
}

function validateKeyUp (e) {
    e.preventDefault();

    const target = document.querySelector(`#${e.target.id}-object`);
    //const errorP = document.querySelector(`#${target.id} > p`);
    target.classList.remove('error');

}

function validateSubmit(e) {
    e.preventDefault();
    
    const user = {
        fname: document.querySelector('#fname'),
        lname: document.querySelector('#lname'),
        email: document.querySelector('#email'),
        phone: document.querySelector('#phone'),
        pin: document.querySelector('#pin'),
        pinConfirm: document.querySelector('#pinConfirm')
    }

    for (const key in user ) {
        ifEmpty(user[key]);
        validationSwitch(user[key], user.pin);
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
    
    console.log(obj.value);

    switch(obj.id, pin) {
        case 'email':
            const emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            error(obj, !emailRegex.test(obj.value));
            break;
        case 'phone':
            // if (obj.value !== '' || obj.value.charAt(0) != '+' || (obj.value.charAt(0) != '0' && obj.value.charAt(1) != '4')) {
            //     obj.value = `+46${obj.value.substring(1)}`
            // }
            const phoneRegex = /^(?:\+46|0046)(7[0236]\d{7})$/;
            error(obj, !phoneRegex.test(obj.value));
            break;
        case 'pin':
            const pinRegex = /^\d{6}$/;
            error(obj, !pinRegex.test(obj.value));
            break;
        case 'pinConfirm':
            console.log(obj.value)
            console.log(pin)

            if (obj.value != pin) {
                error(obj, true)
                break;
            }
            else
                break;
        default:
          break;
      }
}

function error(obj, add) {
    const target = document.querySelector(`#${obj.id}-object`);
    const errorP = document.querySelector(`#${target.id} > p`);

    if (add) {
        target.classList.add('error');
        errorP.innerHTML = errorMessages[obj.id];
    }
    else {
        target.classList.remove('error');
        errorP.innerHTML = defaultMessages[obj.id];
    }
}