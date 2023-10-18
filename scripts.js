const errorMessages = {
    fname: 'Must be at least one character',
    lname: 'Must be at least one character',
    email: 'Must be a valid email address',
    phone: 'Must be a valid swedish cell phone number (+46123465789)',
    pin: 'Must be exactly six numerical digits.',
    pinConfirm: 'Pin confirmation must be the same as the pin'
}

const defaultMessages = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    pin: 'The pin needs to be exactly six numerical digits long.',
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

    console.log(obj.value);

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
            console.log('text switch')
            break;
        default:
            break;
    }
    
    switch(obj.id) {
        case 'email':
            console.log('email switch')
            break;
        case 'phone':
            console.log('phone switch')
            if (obj.value.charAt(0) != '+' || (obj.value.charAt(0) != '0' && obj.value.charAt(1) != '4')) {
                obj.value = `+46${obj.value.substring(1)}`
            }
            const phoneRegex = /^(?:\+46|0046)(7[0236]\d{7})$/;
            error(obj, !phoneRegex.test(obj.value));
            break;
        case 'pin':
            console.log('pin switch')
            const pinRegex = /^\d{6}$/;
            error(obj, !pinRegex.test(obj.value));
            break;
        case 'pinConfirm':
            if (obj.value != pin) {
                console.log('pinConfirm switch')
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