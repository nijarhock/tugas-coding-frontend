import React, { useEffect, useState } from 'react'
import { getTokenWithExpiration, setTokenWithExpiration } from '../utils/Session';

import InputValidation from '../components/form/InputValidation';
import Logo from '../assets/react.svg'
import Swal from 'sweetalert2';
import appConfig from '../config/appConfig';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';

export default function Login() {
    const MySwal = withReactContent(Swal);

    useEffect(() => {
      document.title = 'Login';
      
      // if alredy sign in
      if (getTokenWithExpiration("token")) {
        // redirect to dashboard
        window.location.href = '/dashboard';
      }

    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name] : value});
    }

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        // validate blank input
        if (!formData.email) {
            errors.email = "Email is required";
            formIsValid = false;
        }

        if (!formData.password) {
            errors.password = "Password is required";
            formIsValid = false;
        }

        setFormErrors(errors);
        return formIsValid;
    }

    const loginHandler = (e) => {
        e.preventDefault();

        if(validateForm()) {
            axios
                .post(`${appConfig.baseurlAPI}/login`, formData, {
                    headers: {
                        "Content-Type" : "application/json"
                    }
                })
                .then((response) => {
                    if(response.status === 200) {
                        setTokenWithExpiration("token", response.data.token);
                        setTokenWithExpiration("user", JSON.stringify(response.data.user));
                        MySwal.fire({
                            title: "Success!",
                            text: "Login Successfuly",
                            icon: "success",
                            timer: 1500
                        }).then(() => {
                            window.location.href = "/dashboard";
                        })
                    } else {
                        throw new Error("Network response was not ok");
                    }
                })
                .catch((error) => {
                    MySwal.fire ({
                        title: "Failed!",
                        text: error.response.data.message,
                        icon: "error"
                    })
                })
        }
    }
    
    return (
        <div id="app">
            <section className="section">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                            <div className="login-brand flex justify-center">
                                <img src={Logo} alt="logo" width="100" className="shadow-light rounded-circle" />
                            </div>
                            <div className="card card-primary">
                                <div className="card-header"><h4>Login</h4></div>

                                <div className="card-body">
                                    <form onSubmit={loginHandler} className="needs-validation" noValidate="">
                                        <InputValidation
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            error={formErrors.email}
                                            onChange={handleInputChange} />

                                        <InputValidation
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            error={formErrors.password}
                                            onChange={handleInputChange} />

                                        {/* <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                            <input type="checkbox" name="remember" className="custom-control-input" tabIndex="3" id="remember-me" />
                                            <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
                                            </div>
                                        </div> */}

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-info btn-large" tabIndex="4">
                                            Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
    
}
