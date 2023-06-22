import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumb from '../../components/layout/Breadcrumb';
import Button from '../../components/layout/Button';
import InputValidation from '../../components/form/InputValidation';
import Swal from 'sweetalert2';
import appConfig from '../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../utils/Session';

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = getTokenWithExpiration('token');
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [ errors, setErrors ] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    processing: false
  });

  useEffect(() => {
    document.title = "User Edit";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/user/${id}`).then((response) => {
      setFormData({...formData, name: response.data.data.name, email: response.data.data.email});
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({...errors, processing : true});
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.put(`${appConfig.baseurlAPI}/user/${id}`, formData).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      })
      
      setErrors({...errors, processing : false});

      navigate("/user");
    })
    .catch((error) => {
        setErrors(error.response.data.message)
        setErrors({...errors, processing : false});
        if(typeof error.response.data.message !== 'object') {
          console.log("here")
          Swal.fire ({
              title: "Failed!",
              text: error.response.data.message,
              icon: "error"
          })
        }
    })
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name] : value});
}

  return (
    <>
      <section className="section">
        <Breadcrumb />
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="needs-validation" noValidate="">
              <InputValidation
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    error={errors.name}
                    onChange={handleInputChange} />
                <InputValidation
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    error={errors.email}
                    onChange={handleInputChange} />

                <InputValidation
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    error={errors.password}
                    onChange={handleInputChange} />

                <InputValidation
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    value={formData.password_confirmation}
                    error={errors.password_confirmation}
                    onChange={handleInputChange} />

                <div className="form-group">
                  <Button processing={errors.processing} label="Edit" classCustom="btn btn-outline-primary"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
