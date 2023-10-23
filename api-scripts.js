// API PARAMS
const apiUrl = "https://win23.azurewebsites.net/api" //dokumentation på https://win23.azurewebsites.net/index.html

// SEND EXAMPLE
async function postUser(userObj) {
    const userJson = JSON.stringify({
        firstName: `${userObj.fname}`,
        lastName: `${userObj.lname}`,
        email: `${userObj.email}`,
        streetName: `${userObj.street}`,
        postalCode: `${userObj.postal}`,
        city: `${userObj.city}`,
        password: `${userObj.password}`,
        confirmPassword: `${userObj.passwordConfirm}`
    })
    
    try {
        const result = await fetch(`${apiUrl}/users`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: userJson
        })
        console.log(result)
        window.location.replace(`index.html`)
    }
    catch(err) {
        console.log(err)
    }
}

// GET EXAMPLES
// Get Users
async function getUsers() {
    try {
        const result = await fetch(`${apiUrl}/users`) 
        const users = await result.json()
        
        return users
    }
    catch(err) {
        console.warn(err)
    }
}

//Get User
async function getUser() {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    //const search = JSON.stringify({`${id}`})

    try {    
        const result = await fetch(`${apiUrl}/users/${id}`)
        const user = await result.json()

        return user
    }
    catch(err) {
        console.warn(err)
    }
}

// PRINT FUNCTIONS
const printUsers = async () => {
    const users = await getUsers()

    for (let user of users) {
        document.querySelector('#results').innerHTML +=
        `
        <li>
            <a href="profile.html?id=${user.id}">
                <div>
                    <div style="font-weight: 700;">${user.firstName} ${user.lastName}</div>
                    <div style="font-size: .8rem">&lt;${user.email}&gt;</div>
                </div>
            </a>
        </li>
        `
    }
}

async function printUser() {
    const user = await getUser()

    document.querySelector('#results').innerHTML +=
    `
    <div class="user">
        <div>${user.firstName} ${user.lastName}</div>
        <div>&lt;${user.email}&gt;</div>
        <div>${user.streetName}</div>
        <div>${user.postalCode}</div>
        <div>${user.city}</div>
    </div>
    <div>
        <a href="edit.html?id=${user.id}" class="btn">Edit user</a>
        <button onclick="deleteUser('${user.id}')" class="btn">Delete user</button>
    </div>
    ` 
}

async function printEditUser() {
    const user = await getUser()

    document.querySelector('#results').innerHTML +=
    `
    <form onsubmit="putUser(event)" novalidate>
        <div class="form-content">
            <input type="hidden" id="id" value="${user.id}"></input>

            <div id="fname-element" class="input-element">
                <label for="fname">First name*</label>
                <input type="text" id="fname" name="fname" value="${user.firstName}">
                <p></p>
            </div>

            <div id="lname-element" class="input-element">
                <label for="lname">Last name*</label>
                <input type="text" id="lname" name="lname" value="${user.lastName}">
                <p></p>
            </div>
            
            <div id="email-element" class="input-element">
                <label for="email">Email*</label>
                <input type="email" id="email" name="email" value="${user.email}">
                <p></p>
            </div>

            <div id="street-element" class="input-element">
                <label for="street">Street</label>
                <input type="text" id="street" name="street" value="${user.streetName}">
                <p></p>
            </div>

            <div id="postal-element" class="input-element">
                <label for="postal">Postal code</label>
                <input type="text" id="postal" name="postal" value="${user.postalCode}">
                <p></p>
            </div>

            <div id="city-element" class="input-element">
                <label for="city">City</label>
                <input type="text" id="city" name="city" value="${user.city}">
                <p></p>
            </div>

            <div id="password-element" class="input-element">
                <label for="password">Password*</label>
                <input type="password" id="password" name="password" placeholder="" required value="eatMyShorts1234!">
                <p>Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character</p>
            </div>

            <div id="passwordConfirm-element" class="input-element">
                <label for="passwordConfirm">Confirm password number*</label>
                <input type="password" id="passwordConfirm" name="passwordConfirm" required value="eatMyShorts1234!">
                <p></p>
            </div>
        </div>
        <div class="btn-grp">
            <button type="submit" class="btn">Change Data!</button>
        </div>
    </form>
    `
}

async function putUser(e) {
    // Kör fetch för att PUT data
    e.preventDefault()
    
    const userJson = JSON.stringify({
        firstName: `${e.target.fname.value}`,
        lastName: `${e.target.lname.value}`,
        email: `${e.target.email.value}`,
        streetName: `${e.target.street.value}`,
        postalCode: `${e.target.postal.value}`,
        city: `${e.target.city.value}`,
        password: `${e.target.password.value}`,
        confirmPassword: `${e.target.passwordConfirm.value}`
    })
 
    try {
        const result = await fetch(`${apiUrl}/users/${e.target.id.value}`, {
            method: "put",
            headers: {
                "Content-type": "application/json"
            },
            body: userJson
        })
        console.log(result)
    }
    catch(err) {
        console.log(err)
    }

    window.location.replace(`profile.html?id=${e.target.id.value}`)
}

// DELETE FUNCTION
async function deleteUser(id) {
    try {
        const result = await fetch(`${apiUrl}/users/${id}`, {
            method: "delete",
            headers: {
                "Content-type": "application/json"
            }
        })
        console.log(result)
    }
    catch(err) {
        console.log(err)
    }

    window.location.replace(`index.html`)
}