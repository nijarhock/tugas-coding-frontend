import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import Breadcrumb from '../../components/layout/Breadcrumb';
import appConfig from '../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../utils/Session';

export const Show = () => {
  const token = getTokenWithExpiration('token');
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    document.title = "User Show";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/user/${id}`).then((response) => {
      setUser(response.data.data);
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
                      <td>Name</td>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <td>Created Date</td>
                      <td>{user.created_at}</td>
                    </tr>
                    <tr>
                      <td>last Update</td>
                      <td>{user.updated_at}</td>
                    </tr>
                  </thead>
                </table>
              </div>
              <Link to="/user"  className="btn btn-outline-danger">Kembali</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
