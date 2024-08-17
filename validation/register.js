const Validator = require("validator");
const isEmpty=require("is-empty");
module.exports = function validateRegisterInput(data){
    let errors={};
    data.name=!isEmpty(data.name) ? data.name : "";
    data.email=!isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //checking for name field;
    if (Validator.isEmpty(data.name)){
        errors.name="name field required";
    }
    
    //checking emails
    if(Validator.isEmpty(data.email)){
        errors.email="Email required";
    }
    else if(!Validator.isEmail(data.email)){
        errors.email="Invalid email";
    }

    //password checking
    if(Validator.isEmpty(data.password)){
        errors.password="Required password";
    }
    
    if(Validator.isEmpty(data.password2)){
        errors.password2="confirm Password required";
    }
    if(!Validator.isLength(data.password, {min:8, max:31 })){
    errors.password="password must be atleast of 8 charactes";
    }
    if(!Validator.equals(data.password,data.password2)){
        errors.password2="confirm Password not matching";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};