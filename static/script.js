/*
************* login functionality begin
*/
function checkLogin() {

    var user = document.getElementById("user").value;
    var password = document.getElementById("passw").value;

    var userArray = JSON.parse(localStorage.getItem("lUserArray"));

    if (user !== null && user !== "") {
        if (password !== null && password !== "") {

            var canLogin = checkLoginInfo(user, password, userArray);
            if (canLogin === true) {
                //need a method to get the role and send it into createSessionUser below
                var role = getUserRole(user, password, userArray)
                createSessionUser(user, password, role)
                window.location.href = "http://localhost:5000/dashboard";
                //window.location.href = "http://heroku:5000/dashboard";
            } else {
                alert("user or password are not correct");
            }

        } else {
            alert("password must not be empty");
        }
    } else {
        alert("user must not be empty");
    }

}

function checkLoginInfo(user, password, userArray) {
    if (userArray !== null && userArray.length > 0) {
        for (var i = 0; i < userArray.length; i++) {
            if (userArray[i].user === user && userArray[i].password === password) {
                return true;
            }
        }
    }
    return false;
}

function getUserRole(pUser, pPassword, pUserArray) {
    var role = ""
    if (pUserArray !== null && pUserArray.length > 0) {
        var length = pUserArray.length
        for (var i = 0; i < length; i++) {
            if (pUserArray[i].user === pUser && pUserArray[i].password === pPassword) {
                role = pUserArray[i].role
                break
            }
        }
    }
    return role
}

function createSessionUser(user, password, role) {
    var logged_user = {
        user: user,
        password: password,
        role: role
    };

    sessionStorage.setItem("loggedUser", JSON.stringify(logged_user));
}

/*
************* login functionality end
*/


/*
************* register functionality begin
*/

function registerNewUser() {
    var reg_user = document.getElementById("user_reg").value;
    var reg_password = document.getElementById("passw_reg").value;
    var reg_role = "client";

    //alert(reg_user);
    var userArray = [];

    if (localStorage.getItem("lUserArray") !== null) {
        userArray = JSON.parse(localStorage.getItem("lUserArray"));
    }

    var current_reg = {
        user: reg_user,
        password: reg_password,
        role: reg_role
    };

    userArray.push(current_reg);

    localStorage.setItem("lUserArray", JSON.stringify(userArray));

    window.location.href = "http://localhost:5000/login"
    //window.location.href = "http://heroku:5000/login";
}

/*
************* register functionality end
*/


/*
************* dashboard functionality begin
*/



if (window.location.href.includes("dashboard")) {
    //un if general para el dashboard y asi podemos poner todos los metodos que necesitemos
    checkForValidLoginSession()
    setUserNameOnDashboard()
    w3.includeHTML()
}

function checkForValidLoginSession() {
    /*
    tengo que ir a buscar el elemento wUserArray, si no esta vacio
    entonces dejo pasar al dashboard si no es el caso entonces debo redirigir
    hacia el login
    */

    if (sessionStorage.getItem("loggedUser") == null) {
        window.location.href = "http://localhost:5000/login"
        //window.location.href = "http://heroku:5000/login";
    }
}

function setUserNameOnDashboard() {
    var userArray = JSON.parse(sessionStorage.getItem("loggedUser"))
    var currentUser = userArray.user
    var currentRole = userArray.role

    var userSpan = document.getElementById("user")
    userSpan.innerText = "Hello, " + currentRole + " " + currentUser
}

function logout() {
    sessionStorage.removeItem("loggedUser")
    window.location.href = "http://localhost:5000/"
    //window.location.href = "http://heroku:5000/";
}

/*
************* dashboard functionality end
*/


/*
************* dashboard functionality add
*/

function add() {
    var num1 = parseInt(document.getElementById("number1").value)
    var num2 = parseInt(document.getElementById("number2").value)
    var result = num1 + num2
    cleanForm()
    addResultToTable(num1, num2, result)
    addResultToStorage(num1, num2, result)

}

function cleanForm() {
    document.getElementById("number1").value = ""
    document.getElementById("number2").value = ""
}

function addResultToTable(pNum1, pNum2, pResult) {
    var myTable = document.getElementById("myTable")

    var row = myTable.insertRow(1)

    row.insertCell(0).innerHTML = pNum1;
    row.insertCell(1).innerHTML = pNum2;
    row.insertCell(2).innerHTML = pResult;
}

function addResultToStorage(pNum1, pNum2, pResult) {
    var addResultArray = [];

    if (localStorage.getItem("lAddResultArray") !== null) {
        addResultArray = JSON.parse(localStorage.getItem("lAddResultArray"));
    }

    var current_add_result = {
        user: "test",
        num1: pNum1,
        num2: pNum2,
        result: pResult
    }

    addResultArray.push(current_add_result)
    localStorage.setItem("lAddResultArray", JSON.stringify(addResultArray));
}

/*
************* dashboard functionality add
*/
