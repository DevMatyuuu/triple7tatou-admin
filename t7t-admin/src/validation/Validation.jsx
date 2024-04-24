import * as yup from 'yup'

export const LoginSchema = yup.object({
    email: yup.string().email('Please Enter a valid Email').required('Please Enter your Email'),
    password: yup.string().required('Please Enter your Password')
})
