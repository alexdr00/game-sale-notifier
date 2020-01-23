import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import './LoginStyle.css'

function Login() {
    const background = { backgroundColor: '#f5f5f5' }

return(
    <Fragment>
        <div>
            <div className="container">
                <div className="row justify-content-center animated fadeIn" style={ background } >
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">LOGIN</h1>
                                                </div>
                                                <form className="user">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                            <label className="custom-control-label" htmlFor="customCheck">Recuerdame</label>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary btn-user btn-block"> Login </button>
                                                </form>
                                                <hr/>
                                                <div className="text-center">
                                                    <a className="small" href="/#">Forgot your Password</a>
                                                </div>
                                                <div className="text-center">
                                                    <Link to={"/Register"} className="small" href="/Register">Signup</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </Fragment>
)

}

export default Login;