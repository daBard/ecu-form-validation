// API PARAMS
const apiUrl = "https://win23.azurewebsites.net/api" //dokumentation på https://win23.azurewebsites.net/index.html

// SEND EXAMPLE
async function postUser(userObj) {
    const userJson = JSON.stringify({
        firstName: `${userObj.fname}`,
        lastName: `${userObj.lname}`,
        email: `${userObj.email}`,
        password: `${userObj.pin}`,
        confirmPassword: `${userObj.confirmPin}`
    })

    console.log(userJson)
    
    try {
        const result = await fetch(`${apiUrl}/users`, {
            method: "post",
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

}

// GET EXAMPLES
// Get Users
async function getUsers() {
    try {
        const result = await fetch(`${apiUrl}/users`) 
        const users = await result.json()
        
        console.log(users)
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

    console.log(`${apiUrl}/users/${id}`)

    try {    
        const result = await fetch(`${apiUrl}/users/${id}`)
        const user = await result.json()

        console.log(user)
        return user
    }
    catch(err) {
        console.warn(err)
    }
}

// PRINT FUNCTIONS
const printUsers = async () => {
    const users = await getUsers()

    console.log(users)

    for (let user of users) {
        document.querySelector('#results').innerHTML +=
        `
        <a href="profile.html?id=${user.id}">
            <li>${user.firstName} ${user.lastName} med e-post &lt;${user.email}&gt; från ${user.streetName} i ${user.city}</li>
        </a>
        `
    }
}

async function printUser() {
    const user = await getUser()

    console.log(user)

    document.querySelector('#results').innerHTML +=
    `
    <div>${user.firstName} ${user.lastName} med e-post &lt;${user.email}&gt; från ${user.streetName} i ${user.city}</div>
    ` 
}

// EDIT FUNCTION
async function editUser() {
    const user = await getUser()

    console.log(user)

    document.querySelector('#results').innerHTML +=
    `
    <input value="${user.firstName}></input>
    `

    // Kör fetch för att PUT data

    window.location.replace(`profile.html?id=${user.id}`)
}

// DELETE FUNCTION
async function deleteUser(id) {
    const user = await getUser()

    console.log(user)

    document.querySelector('#results').innerHTML +=
    `
    <input value="${user.firstName}></input>
    `

    // Kör fetch för att DELETE data

    window.location.replace(`profile.html?id=${user.id}`)
}