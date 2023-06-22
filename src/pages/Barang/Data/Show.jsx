import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import Breadcrumb from '../../../components/layout/Breadcrumb';
import appConfig from '../../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../../utils/Session';

export const Show = () => {
  const token = getTokenWithExpiration('token');
  const { id } = useParams();
  const [barang, setBarang] = useState({});

  useEffect(() => {
    document.title = "Barang Detail";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/barang/${id}`).then((response) => {
      setBarang(response.data.data);
       console.log(response.data.data);
    });
  }, [id]);

  return (
    <>
      <section className="section">
        <Breadcrumb />
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <td>Jenis</td>
                      <td>{barang.jenis_barang.nama}</td>
                    </tr>
                    <tr>
                      <td>Nama</td>
                      <td>{barang.nama}</td>
                    </tr>
                    <tr>
                      <td>Satuan</td>
                      <td>{barang.satuan}</td>
                    </tr>
                    <tr>
                      <td>Stok</td>
                      <td>{barang.stok}</td>
                    </tr>
                    <tr>
                      <td>Harga</td>
                      <td>{barang.harga}</td>
                    </tr>
                    <tr>
                      <td>Gambar</td>
                      <td><img src={ barang.gambar } className='gambar2'/></td>
                    </tr>
                    <tr>
                      <td>Deskripsi</td>
                      <td>{barang.deskripsi}</td>
                    </tr>
                    <tr>
                      <td>Created Date</td>
                      <td>{barang.created_at}</td>
                    </tr>
                    <tr>
                      <td>last Update</td>
                      <td>{barang.updated_at}</td>
                    </tr>
                  </thead>
                </table>
              </div>
              <Link to="/barang"  className="btn btn-outline-danger">Kembali</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
