import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/layout/Breadcrumb';
import appConfig from '../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../utils/Session';

export default function LaporanPenjualanJenis() {
  let today = new Date();
  const token = getTokenWithExpiration('token');
  const [details, setDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [awal, setAwal] = useState(today.toISOString().split('T')[0]);
  const [akhir, setAkhir] = useState(today.toISOString().split('T')[0]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/laporan_penjualan_jenis`, {params: {awal: awal, akhir: akhir}}).then((response) => {
      setDetails(response.data.data);
    });
  }, [refresh]);

  useEffect(() => {
    document.title = "Laporan Penjualan Jenis";
  }, [])



  return (
    <>
      <section className="section">
        <Breadcrumb />
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Tanggal Awal</label>
                    <input type="text" className="form-control datepicker" placeholder="Tanggal Awal" value={awal} onChange={e => setAwal(e.target.value)}/>
                    <small className="form-text text-muted">format 2023-06-22</small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Tanggal Akhir</label>
                    <input type="text" className="form-control" placeholder="Tanggal Akhir"  value={akhir} onChange={e => setAkhir(e.target.value)}/>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" onClick={() => setRefresh((prev) => !prev)}>Submit</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jenis Barang</th>
                      <th>Jumlah Transaksi</th>
                      <th>Jumlah Qty Terjual</th>
                      <th>Jumlah Penjualan (Rp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((detail, index) => {
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{detail.nama}</td>
                          <td>{detail.jumlah_transaksi}</td>
                          <td>{detail.jumlah_qty}</td>
                          <td>{detail.jumlah_penjualan}</td>
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
