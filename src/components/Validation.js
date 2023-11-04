export const validation = (data , type) => {

    const errors = {};


    if(!data.email){
        errors.email = "email is required"
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)){
        errors.email = "email address is invalid"
    }
    else{
        delete errors.email
    }

    if(!data.password){
        errors.password = "password is required"
    }else if(data.password.length < 6){
        errors.password = "password must be more than 6 characters"
    }
    else{
        delete errors.password
    }

    
    if(type === 'signup'){
        if(!data.username.trim()){
            errors.username = "username is required"
        }else{
            delete errors.username
        }

        if(!data.confirm_password){
            errors.confirm_password = "confirm password is required"
        }else if(data.password !== data.confirm_password){
            errors.confirm_password = "passwords are different"
        }
        else{
            delete errors.confirm_password
        }
    
        if(!data.isAccepted){
            errors.isAccepted = "you should accept terms to sign up"
        }else{
            delete errors.isAccepted
        }
    
    }

    return errors;


}