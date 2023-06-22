import React, { useEffect, useState } from 'react';

import Breadcrumb from '../../../components/layout/Breadcrumb';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import appConfig from '../../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../../utils/Session';

import Pagination from '../../../components/layout/Pagination';
import SearchInput from '../../../components/layout/SearchInput';
import ButtonSortir from '../../../components/layout/ButtonSortir';



export function Index() {
  const token = getTokenWithExpiration('token');
  const [barang, setBarang] = useState({data: []});
  const [refresh, setRefresh] = useState(false);
  const [values, setValues] = useState({
    search: '',
    pages: 1,
    orderBy: ['nama', 'asc']
  });

  useEffect(() => {
    document.title = "Barang";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/barang`, {params: values}).then((response) => {
      setBarang(response.data.data);
    });
  }, [refresh, values]);

  const handleDelete = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${appConfig.baseurlAPI}/barang/${e}`).then((response) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          setRefresh(true)
        });
      }
    })
  }

  const handleSearchChange = (key, data) => {
    setValues(values => ({
      ...values,
      [key]: data
    }))
  }

  return (
    <>
      <section className="section">
        <Breadcrumb />
        <div className="col-12">
          <div className="card">
            <SearchInput tambahLink="create" handleSearchChange={handleSearchChange} values={values}/>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Jenis <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="jenis_barang_id"/></th>
                      <th>Nama <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="nama"/></th>
                      <th>Satuan <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="satuan"/></th>
                      <th>Stok <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="stok"/></th>
                      <th>Harga <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="harga"/></th>
                      <th>Gambar</th>
                      <th>Deskripsi</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barang.data.map((jenis, index) => {
                      return (
                        <tr key={index}>
                          <td>{ jenis.jenis_barang.nama }</td>
                          <td>{ jenis.nama }</td>
                          <td>{ jenis.satuan }</td>
                          <td>{ jenis.stok }</td>
                          <td>{ jenis.harga }</td>
                          <td><img src={ jenis.gambar } className='gambar'/></td>
                          <td>{ jenis.deskripsi }</td>
                          <td>
                            <Link to={`show/${jenis.id}`} className="btn btn-secondary mr-1">Detail</Link>
                            <Link to={`edit/${jenis.id}`} className="btn btn-warning mr-1">Edit</Link>
                            <button  onClick={() => handleDelete(jenis.id)} className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                    {barang.data.length === 0 && (
                      <tr>
                        <td className='p-0 text-center' colSpan="8">Tidak Ada Data</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination links={barang.links} handleSearchChange={handleSearchChange}/>
          </div>
        </div>
      </section>
    </>
  )
}
