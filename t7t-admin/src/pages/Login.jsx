import React, { useState } from 'react'
import { useFormik } from 'formik'
import { auth } from '../firebase/firebase'
import { LoginSchema } from '../validation/Validation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Tooltip } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/T7T-logo.webp'
import banner from '../assets/T7T-banner.webp'


const initialValues = {
  email: '',
  password: '',
}


export default function Login() {

  const [invalid, setInvalid] = useState(null)

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const navigate = useNavigate();

  const {values, handleChange, handleSubmit, errors} = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        validateOnChange: false,
        onSubmit: () => {},
      });

  const signIn = () => {
    setInvalid(null)
    const email = values.email 
    const password = values.password
  
    if (!emailRegex.test(email)) {
      console.error('The email address is not formatted correctly.');
      return; 
    }
  
    signInWithEmailAndPassword(auth, email, password)
      .then(data => {
        navigate('/');
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential") {
          setInvalid("Email or Password is incorrect")
        }
      });
    }
    
    return (
        <div>
          <div className='flex justify-center items-center h-screen lg:bg-black/70 bg-primary z-50'>
            <div className='flex h-[550px] xl:h-[600px] lg:h-[500px] md:h-[500px] shadow-2xl rounded-xl bg-[#3b3b3b]'>
              <div className='justify-center w-[90%] xl:w-auto flex flex-col py-24 bg-[#3b3b3b] xl:rounded-l-2xl rounded-2xl'>
                <form onSubmit={handleSubmit} className='flex flex-col w-[430px] xl:w-[550px] lg:w-full md:w-full h-[85%] items-center rounded-xl md:rounded-r-none'>
                      <img src={logo} alt='devoro-logo' className='xl:h-20 xl:w-36 h-28 w-28 mb-10' priority/>
                      <div className='flex items-center flex-col gap-5 w-full'>
                          <div className='flex relative w-full'>
                              <div className='flex items-center gap-4 w-full justify-center'>
                                <input onChange={handleChange} value={values.email} id="email" name="email" type='type' placeholder='Email' className='xl:w-[50%] w-[80%] px-2 py-2 rounded-lg border border-black/30'/>
                              </div>
                              <div className='absolute right-[107px] top-2'>
                                {errors.email &&
                                <Tooltip content={errors.email} className='py-1.5'>
                                  <span><RiErrorWarningFill size={24} className='text-white'/></span>
                                </Tooltip>
                                }    
                                {invalid &&
                                <Tooltip content={invalid}>
                                  <span><RiErrorWarningFill size={24} className='text-white'/></span>
                                </Tooltip>
                                } 
                              </div>
                          </div>
                          <div className='flex relative mb-1 w-full'>
                              <div className='flex tems-center gap-4 w-full justify-center'>
                              <input onChange={handleChange} value={values.password} id="password" name="password" type='password' placeholder='Password' className='xl:w-[50%] w-[80%] px-2 py-2 rounded-lg border border-black/30'/>
                              </div>
                              <div className='absolute right-[107px] top-2'>
                                {errors.password &&
                                <Tooltip content={errors.password}>
                                  <span><RiErrorWarningFill size={24} className='text-white'/></span>
                                </Tooltip>
                                }    
                                {invalid &&
                                <Tooltip content={invalid}>
                                  <RiErrorWarningFill size={24} className='text-white'/>
                                </Tooltip>
                                }  
                              </div>
                          </div>
                      </div>
                      <div className='text-primary font-bold text-xs mb-5 xl:w-[50%] w-max mt-2 flex justify-end px-1'>
                        <Link to='/' className='hover:text-red-700 text-white duration-300'>Forgot Password</Link>
                      </div>
                      <button type='submit' onClick={signIn} className='bg-black py-3 xl:px-28 xl:w-[50%] w-[80%] xl:w- rounded-md font-semibold hover:bg-black/50 duration-300 text-white'>Log in</button>
                  </form>
                </div>
                <div className='bg-black md:rounded-r-xl'>
                  <img src={banner} alt='formImg' className='h-full w-[400px] rounded-r-2xl lg:block hidden md:block' priority/> 
                </div>
              </div>
            </div>
        </div>
        )
}
