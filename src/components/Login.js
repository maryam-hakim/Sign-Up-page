import React , {useState , useEffect} from 'react';
import {validation} from './Validation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from './Tosatify';
import styles from './SignUp.module.css';
import {Link} from 'react-router-dom';

const Login = () => {
   
    const [data , setData] = useState({
       email: "",
       password: "",
   });

   const [errors , setErrors] = useState({});

   const [touched , setTouched] = useState({});

   useEffect(() => {
       setErrors (validation(data , 'login'))
   }
   ,[data])

   const changeHandler = (event) =>{
        setData({...data,
            [event.target.name]: event.target.value
            }) 
      }
     
   

   const focusHandler = event =>{
       setTouched({...touched, [event.target.name] : true})
   }

   const submitHandler = event =>{
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify('success' , 'You logged in successfully')
        }else{
            notify('error' , 'Invalid data ')
            setTouched({
                email: true,
                password: true,
            })
        }
        
    

   }


    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formcontainer}>
                <h1 className={styles.header}>LOGIN</h1>
                
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

                <div className={styles.buttons}>
                    <Link to="/signup">SIGN UP</Link>
                    <button>
                        LOGIN
                    </button>
                </div>
            </form>
           <ToastContainer />

        </div>
        
    );
       
};

export default Login;