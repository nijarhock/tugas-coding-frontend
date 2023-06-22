import React, { useEffect, useState } from 'react'

import Breadcrumb from '../components/layout/Breadcrumb';
import appConfig from '../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../utils/Session';
import SearchInput from '../components/layout/SearchInput';
import Pagination from '../components/layout/Pagination';
import Swal from 'sweetalert2';

export default function Dashboard() {
  const token = getTokenWithExpiration('token');
  const [barang, setBarang] = useState({data: []});
  const [refresh, setRefresh] = useState(false);
  const [kodeInvoice, setKodeInvoice] = useState({
    "user_id"           : '',
    "kode_invoice"      : '',
    "tanggal_transaksi" : '',
    "total_transaksi"   : 0,
    "transaksi_detail"  : [],
    "status"            : "proses"
  });
  const [bayar, setBayar] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const [values, setValues] = useState({
    search: '',
    pages: 1,
    orderBy: ['nama', 'asc']
  });

  useEffect(() => {
    document.title = "Penjualan";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post(`${appConfig.baseurlAPI}/new_transaksi`).then((response) => {
      setKodeInvoice(response.data.data);
      setBayar(response.data.data.bayar);
    });

    axios.get(`${appConfig.baseurlAPI}/barang`, {params: values}).then((response) => {
      setBarang(response.data.data);
    });
  }, [values, refresh])

  useEffect(() => {
    let kembalian = bayar - kodeInvoice.total_transaksi;
    if(kembalian < 0) {
      kembalian = 0
    }
    setKembalian(kembalian)
  }, [bayar]);

  const handleSearchChange = (key, data) => {
    setValues(values => ({
      ...values,
      [key]: data
    }))
  }

  const addBarang = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.put(`${appConfig.baseurlAPI}/add_barang/${kodeInvoice.id}`, {barang_id: id, qty:1}).then((response) => {
      setRefresh((prev) => !prev);
    });
  }

  const deleteBarang = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.delete(`${appConfig.baseurlAPI}/delete_barang/${id}`).then((response) => {
      setRefresh((prev) => !prev);
    });
  }

  const handleBayar = (e) => {
    setBayar(e.target.value)
  }

  const handlePembayaran = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.put(`${appConfig.baseurlAPI}/proses_pembayaran/${kodeInvoice.id}`, {bayar: bayar}).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      })
    })
    .catch((error) => {
      Swal.fire ({
          title: "Failed!",
          text: error.response.data.message,
          icon: "error"
      })
    })
  }

  const handleSelesai = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.put(`${appConfig.baseurlAPI}/selesai_transaksi/${kodeInvoice.id}`).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      })

      setRefresh((prev) => !prev);
    })
    .catch((error) => {
      Swal.fire ({
          title: "Failed!",
          text: error.response.data.message,
          icon: "error"
      })
    })
  }

  return (
    <section className="section">
      <Breadcrumb />
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <SearchInput handleSearchChange={handleSearchChange} values={values}/>
            </div>
            <div className='card-body'>
              <div className='row'>
                {barang.data.map((jenis, index) => {
                  return (
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 cursor-pointer" key={index} onClick={() => addBarang(jenis.id)}>
                      <article className="article">
                        <div className="article-header">
                          <div className="article-image" style={{ backgroundImage: `url(${jenis.gambar})` }}>
                          </div>
                        </div>
                        <div className="article-details text-center">
                          <p>{ jenis.jenis_barang.nama }</p>
                          <h5>Stok : { jenis.stok }</h5>
                          <h6>Harga : Rp. { jenis.harga }</h6>
                        </div>
                      </article>
                    </div>
                  )
                })}
                <Pagination links={barang.links} handleSearchChange={handleSearchChange}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h4>No. Invoice #{kodeInvoice.kode_invoice}</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Barang</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kodeInvoice.transaksi_detail.map((detail, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <button className='btn btn-danger btn-icon btn-sm' onClick={() => deleteBarang(detail.id)}><i className="fas fa-times"></i></button>
                          </td>
                          <td>{detail.barang.nama}</td>
                          <td>{detail.qty}</td>
                          <td>Rp. {detail.total}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='card-footer'>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Total</th>
                      <th className='text-right'>Rp. {kodeInvoice.total_transaksi}</th>
                    </tr>
                    <tr>
                      <th>Bayar</th>
                      <th>
                        <div className="form-group mb-0">
                          <div className="input-group">
                            <input type="text" className="form-control" placeholder="" aria-label="" value={bayar} onChange={handleBayar}/>
                            <div className="input-group-append">
                              <button className="btn btn-success" type="button" onClick={handlePembayaran}><i className="fas fa-money-bill"></i></button>
                            </div>
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th>Kembalian</th>
                      <th className='text-right'>Rp. {kembalian}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="col-12">
                <button className="btn btn-success btn-block" type="button" onClick={handleSelesai}>Selesai</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
