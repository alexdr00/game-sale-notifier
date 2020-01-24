import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

function Register() {

    const [user, saveUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {email, password, confirmPassword}= user;

    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            Swal.fire({
                title: 'Error!',
                text: 'Make sure to fill all fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then(r => {

            });
            return;
        }

        if (password.length < 6) {
            Swal.fire('That password is not strong enough')
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Password do not match',
                icon: 'error',
                confirmButtonText: 'Try again'
            }).then(r => {

            });
            return;
        }
    }



    return(
        <>
            <div className='container-fluid'>
                <div className='row' >
                    <div className='col-4 mx-auto mt-5 d-flex align-items-center justify-content-center flex-column shadow-lg'>
                        <br/>
                        <h3>SIGN UP</h3>
                        <form  onSubmit={onSubmit}>
                            <div className='form-group'>
                                <h6>Email</h6>
                                <input
                                    type='email'
                                    className='form-control'
                                    name='email'
                                    placeholder='Email'
                                    onChange={handleChange}
                                    value={email}/>
                            </div>
                            <div className='form-group'>
                                <h6>Password</h6>
                                <input
                                    type='password'
                                    className='form-control'
                                    name='password'
                                    placeholder='Password'
                                    onChange={handleChange}
                                    value={password}/>
                            </div>
                            <div className='form-group'>
                                <h6>Confirm Password</h6>
                                <input
                                    type='password'
                                    className='form-control'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    value={confirmPassword}/>
                            </div>
                            <div className='text-center'>
                                <Link
                                    to='/#'
                                    className='d-none'
                                    id='login-redirect'
                                ></Link>
                                <button
                                    type='submit'
                                    className='form-control btn btn-primary btn-user btn-block'
                                    name='next'>
                                    Submit
                                </button>
                                <div className="text-center">
                                    <Link to={"/Register"} className="small" href="/">Log in</Link>
                                </div>
                                <br/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Register;