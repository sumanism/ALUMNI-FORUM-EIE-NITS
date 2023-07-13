const userInfo = require("./public/userInfo");

const validateUser = (username, password) => {
    const loginDetails = userInfo[0].content;

    for(let i=0;i<loginDetails.length;i++){
        if(loginDetails[i].username===username){
            if(loginDetails[i].password===password){
                return {username, isValid:true};
            }
        }else{
            return {isValid:false};
        }
    }
}

module.exports = validateUser;