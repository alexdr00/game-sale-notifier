import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

function Register() {
    return(
        <Fragment>
            <div className='container-fluid'>
                <div className='row' >
                    <div className='col-4 mx-auto mt-5 d-flex align-items-center justify-content-center flex-column shadow-lg'>
                        <br/>
                        <h3>SIGN UP</h3>
                        <form action='' >
                            <div className='form-group'>
                                <h6>Email</h6>
                                <input
                                    type='email'
                                    className='form-control'
                                    name='Text'
                                    placeholder='Email'
                                    required/>
                            </div>
                            <div className='form-group'>
                                <h6>Password</h6>
                                <input
                                    type='password'
                                    className='form-control'
                                    name='password'
                                    placeholder='Password'
                                    required/>
                            </div>
                            <div className='form-group'>
                                <h6>Confirm Password</h6>
                                <input
                                    type='passwordConfirm'
                                    className='form-control'
                                    name='passwordConfirm'
                                    placeholder='Confirm Password'
                                    required/>
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
                                <br/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )

}

export default Register;