import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/layout/Breadcrumb';
import appConfig from '../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../utils/Session';
import SearchInput from '../components/layout/SearchInput';
import ButtonSortir from '../components/layout/ButtonSortir';

export default function LaporanPenjualan() {
  const token = getTokenWithExpiration('token');
  const [details, setDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [values, setValues] = useState({
    search: '',
    pages: 1,
    orderBy: ['tanggal_transaksi', 'desc']
  });

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/laporan_penjualan`, {params: values}).then((response) => {
      setDetails(response.data.data);
    });
  }, [refresh, values]);

  useEffect(() => {
    document.title = "Laporan Penjualan";
  }, [])

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
            <SearchInput handleSearchChange={handleSearchChange} values={values}/>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Barang <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="nama"/></th>
                      <th>Stok</th>
                      <th>Jumlah Terjual</th>
                      <th>Tanggal Transaksi <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="tanggal_transaksi"/></th>
                      <th>Jenis Barang <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="jenis_barang"/></th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((detail, index) => {
                      let d = new Date(detail.tanggal_transaksi)
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{detail.nama}</td>
                          <td>{detail.stok}</td>
                          <td>{detail.qty}</td>
                          <td>{`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`}</td>
                          <td>{detail.jenis_barang}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
