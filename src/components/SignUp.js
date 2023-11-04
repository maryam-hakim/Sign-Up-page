import React , {useState , useEffect} from 'react';
import {validation} from './Validation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from './Tosatify';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';

const SignUp = () => {

   const [data , setData] = useState({
       username: "",
       email: "",
       password: "",
       confirm_password: "",
       isAccepted: false
   });

   const [errors , setErrors] = useState({});

   const [touched , setTouched] = useState({});

   useEffect(() => {
       setErrors (validation(data , 'signup'))
   }
   ,[data])

   const changeHandler = (event) =>{
      
        if( event.target.name === "isAccepted"){
            setData({...data,
                [event.target.name]: event.target.checked
            })
        }else{
            setData({...data,
                [event.target.name]: event.target.value
            }) 
      }
     
   }

   const focusHandler = event =>{
       setTouched({...touched, [event.target.name] : true})
   }

   const submitHandler = event =>{
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify('success' , 'You signed up')
        }else{
            notify('error' , 'Invalid data ')
            setTouched({
                username: true,
                email: true,
                password: true,
                confirm_password: true,
                isAccepted: true
            })
        }
        
    

   }


    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formcontainer}>
                <h1 className={styles.header}>Sign Up</h1>
                <div className={styles.fields}>
                    <label>username</label>
                    <input  className={(errors.username &&  touched.username)? styles.invalidInput : styles.fieldInput}
                    
                     type="text" name="username" onChange={changeHandler} value={data.username}  onFocus={focusHandler}/>
                    {errors.username &&  touched.username && <span>{errors.username}</span>}
                </div>
                <div className={styles.fields}>
                    <label>email</label>
                    <input className={(errors.email &&  touched.email)? styles.invalidInput : styles.fieldInput}
                     type="email" name="email" onChange={changeHandler} value={data.email} onFocus={focusHandler}/>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                    
                </div>
                <div className={styles.fields}>
                    <label>password</label>
                    <input className={(errors.password &&  touched.password)? styles.invalidInput : styles.fieldInput}
                     type="password" name="password" onChange={changeHandler} value={data.password} onFocus={focusHandler}/>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.fields}>
                    <label>confirm password</label>
                    <input className={(errors.confirm_password &&  touched.confirm_password)? styles.invalidInput : styles.fieldInput}
                     type="password" name="confirm_password" onChange={changeHandler} value={data.confirm_password} onFocus={focusHandler}/>
                    {errors.confirm_password && touched.confirm_password && <span>{errors.confirm_password}</span>}
                </div>
                <div className={styles.fields}>
                    <div>
                    <label>I accept terms of privacy policy</label>
                    <input type="checkbox" name="isAccepted" onChange={changeHandler} value={data.isAccepted} onFocus={focusHandler}/>
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>

                <div className={styles.buttons}>
                    <Link to='/login'>LOGIN</Link>
                    <button>
                        SIGN UP
                    </button>
                </div>
            </form>
           <ToastContainer />

        </div>
        
    );
};

export default SignUp;