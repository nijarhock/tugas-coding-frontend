import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumb from '../../../components/layout/Breadcrumb';
import Button from '../../../components/layout/Button';
import InputValidation from '../../../components/form/InputValidation';
import Swal from 'sweetalert2';
import appConfig from '../../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../../utils/Session';

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = getTokenWithExpiration('token');
  const [ formData, setFormData ] = useState({
    nama: '',
    deskripsi: ''
  });

  const [ errors, setErrors ] = useState({
    nama: '',
    deskripsi: '',
    processing: false
  });

  useEffect(() => {
    document.title = "Jenis Barang Edit";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/jenis_barang/${id}`).then((response) => {
      setFormData({...formData, nama: response.data.data.nama, deskripsi: response.data.data.deskripsi});
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({...errors, processing : true});
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.put(`${appConfig.baseurlAPI}/jenis_barang/${id}`, formData).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      })
      
      setErrors({...errors, processing : false});

      navigate("/jenis_barang");
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
                    label="Nama"
                    name="nama"
                    type="text"
                    value={formData.nama}
                    error={errors.nama}
                    onChange={handleInputChange} />
                <InputValidation
                    label="Deskripsi"
                    name="deskripsi"
                    type="text"
                    value={formData.deskripsi}
                    error={errors.deskripsi}
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
