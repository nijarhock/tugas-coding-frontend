import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import Breadcrumb from '../../../components/layout/Breadcrumb';
import Button from '../../../components/layout/Button';
import InputValidation from '../../../components/form/InputValidation';
import SelectValidation from '../../../components/form/SelectValidation';
import Swal from 'sweetalert2';
import appConfig from '../../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../../utils/Session';

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = getTokenWithExpiration('token');
  const [jenis, setJenis] = useState([])
  const [file, setFile] = useState(null)
  const [ formData, setFormData ] = useState({
    jenis_barang_id: '',
    nama: '',
    satuan: '',
    stok: '',
    harga: '',
    deskripsi: ''
  });

  const [ errors, setErrors ] = useState({
    jenis_barang_id: '',
    nama: '',
    satuan: '',
    stok: '',
    harga: '',
    gambar: '',
    processing: false
  });

  useEffect(() => {
    document.title = "Barang Edit";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/barang/${id}`).then((response) => {
      setFormData(response.data.data)
    });
    if(jenis.length === 0) {
      axios.get(`${appConfig.baseurlAPI}/all_jenis`).then((response) => {
        setJenis(response.data.data)
      });
    }
  }, [id])

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('jenis_barang_id', formData.jenis_barang_id);
    form.append('nama', formData.nama);
    form.append('satuan', formData.satuan);
    form.append('stok', formData.stok);
    form.append('harga', formData.harga);
    form.append('gambar', file);
    form.append('deskripsi', formData.deskripsi);
    setErrors({...errors, processing : true});
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post(`${appConfig.baseurlAPI}/barang/${id}?_method=PUT`, form).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      })
      
      setErrors({...errors, processing : false});

      navigate("/barang");
    })
    .catch((error) => {
        setErrors(error.response.data.message)
        setErrors({...errors, processing : false});
        if(typeof error.response.data.message !== 'object') {
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
                <SelectValidation
                    label="Jenis Barang"
                    name="jenis_barang_id"
                    error={errors.jenis_barang_id}
                    onChange={handleInputChange}
                    data={jenis} 
                    value={formData.jenis_barang_id}
                />
                <InputValidation
                    label="Nama"
                    name="nama"
                    type="text"
                    value={formData.nama}
                    error={errors.nama}
                    onChange={handleInputChange} />
                <InputValidation
                    label="Satuan"
                    name="satuan"
                    type="text"
                    value={formData.satuan}
                    error={errors.satuan}
                    onChange={handleInputChange} />
                <InputValidation
                    label="Stok"
                    name="stok"
                    type="number"
                    value={formData.stok}
                    error={errors.stok}
                    onChange={handleInputChange} />
                <InputValidation
                    label="Harga"
                    name="harga"
                    type="number"
                    value={formData.harga}
                    error={errors.harga}
                    onChange={handleInputChange} />
                <InputValidation
                    label="Gambar"
                    name="gambar"
                    type="file"
                    error={errors.gambar}
                    onChange={e => setFile(e.target.files[0])} />
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
