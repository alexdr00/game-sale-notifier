import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';


function Login() {
    const [user, saveUser] = useState({
        email: '',
        password: '',

    });

    const {email, password}= user;

    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e =>{
        e.preventDefault();
    }


return(
    <Fragment>
        <div className='container-fluid'>
            <div className='row' >
                <div className='col-4 mx-auto mt-5 d-flex align-items-center justify-content-center flex-column shadow-lg'>
                    <br/>
                    <h3>LOG IN</h3>
                    <form onSubmit={onSubmit} >
                        <div className='form-group'>
                            <h6>Email</h6>
                            <input
                                type='email'
                                className='form-control'
                                name='Text'
                                placeholder='Email'
                                onChange={handleChange}
                                value={email}
                                required/>
                        </div>
                        <div className='form-group'>
                            <h6>Password</h6>
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                placeholder='Password'
                                onChange={handleChange}
                                value={password}
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
                            <br />
                            <div className="text-center">
                                <Link to={"/Register"} className="small" href="/Register">Signup</Link>
                            </div>
                            <br/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </Fragment>
)

}

export default Login;