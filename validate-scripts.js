// VARIABLES
const errorMessages = {
    fname: 'Must be at least one character',
    lname: 'Must be at least one character',
    email: 'Must be a valid email address',
    // phone: 'Must be a valid swedish cell phone number (+46123465789)',
    street: '',
    postal: 'Format is "123 45"',
    city: '',
    password: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character',
    passwordConfirm: 'password confirmation must be the same as the password'
}

const defaultMessages = {
    fname: '',
    lname: '',
    email: '',
    // phone: '',
    street: '',
    postal: '',
    city: '',
    password: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character',
    passwordConfirm: '',
}

const formInputs = {
    fname: document.querySelector('#fname'),
    lname: document.querySelector('#lname'),
    email: document.querySelector('#email'),
    //phone: document.querySelector('#phone'),
    street: document.querySelector('#street'),
    postal: document.querySelector('#postal'),
    city: document.querySelector('#city'),
    password: document.querySelector('#password'),
    passwordConfirm: document.querySelector('#passwordConfirm')
}

var errorArray = []

// EVENT LISTENERS
document.querySelector('body').addEventListener('mousedown', (e) => {
    for (const key in formInputs ) {
        let el = `${formInputs[key].id}-element`
        document.querySelector(`#${el}`).classList.remove('shake')
    }
})

// MAIN FUNCTIONS (TRIGGERED)
function validateKeyUp (e) {
    e.preventDefault()

    const target = document.querySelector(`#${e.target.id}-element`)
    target.classList.remove('error')
}

function validateSubmit(e) {
    e.preventDefault()
    
    errorArray = []

    for (const key in formInputs ) {
        if (formInputs[key].hasAttribute('required')) { 
            ifEmpty(formInputs[key]) 
        }
        validationSwitch(formInputs[key], formInputs.password)
    }
    
    if (!errorArray.includes(true)) {
        const userValues = {
            fname: document.querySelector('#fname').value,
            lname: document.querySelector('#lname').value,
            email: document.querySelector('#email').value,
            //phone: document.querySelector('#phone').value,
            street: document.querySelector('#street').value,
            postal: document.querySelector('#postal').value,
            city: document.querySelector('#city').value,
            password: document.querySelector('#password').value,
            passwordConfirm: document.querySelector('#password').value
        }
        postUser(userValues)
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

function validationSwitch(inp, password) {
    // switch(inp.type) {
    //     case 'text':
    //         return
    //     default:
    //         break
    // }

    switch(inp.id) {
        case 'fname':
            const fnameRegex = /^[a-zA-Z\s\-]+$/
            error(inp, !fnameRegex.test(inp.value))
            break

        case 'lname':
            const lnameRegex = /^[a-zA-Z\s\-]+$/
            error(inp, !lnameRegex.test(inp.value))
            break

        case 'email':
            const emailRegex = /(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
            error(inp, !emailRegex.test(inp.value))
            break

        // case 'phone':
        //     if (inp.value != '') {
        //             const phoneRegex = /^(?:\+46|0046)(7[0236]\d{7})$/
        //             error(inp, !phoneRegex.test(inp.value))
        //         }
        //     break

        case 'postal':
            const postalRegex = /^\d{3} \d{2}$/
            error(inp, !postalRegex.test(inp.value))
            break

        case 'password':
            //const passwordRegex = /^\d{6}$/
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
            error(inp, !passwordRegex.test(inp.value))
            break

        case 'passwordConfirm':
            //const passwordConfirmRegex = /^\d{6}$/
            const passwordConfirmRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
            if (!passwordConfirmRegex.test(inp.value) && (inp.value != password)) {
                error(inp, true)
                break
            }
            else {
                break
            }
        default:
          break
      }
}

// ERROR HANDLING
function error(inp, add) {
    const target = document.querySelector(`#${inp.id}-element`)
    const errorP = document.querySelector(`#${target.id} > p`)

    if (add) {
        target.classList.add('error')
        target.classList.add('shake')
        errorP.innerHTML = errorMessages[inp.id]
        errorArray.push(true)
    }
    else {
        target.classList.remove('error')
        errorP.innerHTML = defaultMessages[inp.id]
    }
}