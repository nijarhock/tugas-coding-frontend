import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import Breadcrumb from '../../../components/layout/Breadcrumb';
import appConfig from '../../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../../utils/Session';

export const Show = () => {
  const token = getTokenWithExpiration('token');
  const { id } = useParams();
  const [jenis, setJenis] = useState({});

  useEffect(() => {
    document.title = "Jenis Barang Detail";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/jenis_barang/${id}`).then((response) => {
      setJenis(response.data.data);
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
                      <td>Nama</td>
                      <td>{jenis.nama}</td>
                    </tr>
                    <tr>
                      <td>Deskripsi</td>
                      <td>{jenis.deskripsi}</td>
                    </tr>
                    <tr>
                      <td>Created Date</td>
                      <td>{jenis.created_at}</td>
                    </tr>
                    <tr>
                      <td>last Update</td>
                      <td>{jenis.updated_at}</td>
                    </tr>
                  </thead>
                </table>
              </div>
              <Link to="/jenis_barang"  className="btn btn-outline-danger">Kembali</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
