// const { default: axios } = require("axios");

const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');
const title = document.querySelector('title');
const loginForm = document.querySelector(".sign-in-form");
const loginUsernameInput = document.querySelector(".login-username");
const loginPasswordInput = document.querySelector(".login-password");

const signUpForm = document.querySelector('.sign-up-form');
const registerUserNameInput = document.querySelector('.register-username');
const registerEmailInput = document.querySelector('.register-email');
const registerPasswordInput = document.querySelector('.register-password');


sign_up_btn.addEventListener('click', ()=>{
    title.innerHTML = "Alumni Forum | Sign Up";
    container.classList.add("sign-up-mode");
})

sign_in_btn.addEventListener('click', ()=>{
    title.innerHTML = "Alumni Forum | Sign In";
    container.classList.remove("sign-up-mode");
})

loginForm.addEventListener('submit', async()=> {
    const loginUsername = loginUsernameInput.value;
    const loginPassword = loginPasswordInput.value; 
    const loginInfo = { loginUsername, loginPassword};

    await axios.post("/login", loginInfo,
    {
        headers: {
            'dataType' : 'login'
        }
    });
})

signUpForm.addEventListener('submit', async() => {
    const registerUserName = registerUserNameInput.value;
    const registerEmail = registerEmailInput.value;
    const registerPassword = registerPasswordInput.value;
    const registeredInfo = { registerUserName, registerEmail, registerPassword};

    await axios.post("/register", registeredInfo, 
    {
        headers: {
            'dataType' : 'register'
        }
    });
})