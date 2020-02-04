import React, {  useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

function Login() {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const {  login } = authContext;


  const [user, saveUser] = useState({
    email: '',
    password: '',

  })

  const { email, password } = user;

  const handleChange = e => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value
    });

  }


  const onSubmit =  (e) => {
    e.preventDefault();
    try{
      login({ email, password });
      history.push('/Games')
    }catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-4 mx-auto mt-5 d-flex align-items-center justify-content-center flex-column shadow-lg'>
            <br/>
            <h3>LOG IN</h3>
            <form >
              <div className='form-group'>
                <h6>Email</h6>
                <input
                  type='email'
                  className='form-control'
                  name='email'
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
                <button onClick={ onSubmit}
                  type='submit'
                  className='form-control btn btn-primary btn-user btn-block'
                  name='next'>
                  Submit
                </button>
                <br/>
                <div className="text-center">
                  <Link to={"/Register"} className="small" href="/Register">Signup</Link>
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

export default Login;