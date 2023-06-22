import React, { useEffect, useState } from 'react';

import Breadcrumb from '../../components/layout/Breadcrumb';
import { Link } from 'react-router-dom'
import SearchInput from '../../components/layout/SearchInput';
import ButtonSortir from '../../components/layout/ButtonSortir';
import Swal from 'sweetalert2';
import appConfig from '../../config/appConfig';
import axios from 'axios';
import { getTokenWithExpiration } from '../../utils/Session';

import Pagination from '../../components/layout/Pagination';



export function Index() {
  const token = getTokenWithExpiration('token');
  const [users, setUsers] = useState({data: []});
  const [refresh, setRefresh] = useState(false);
  const [values, setValues] = useState({
    search: '',
    pages: 1,
    orderBy: ['name', 'asc']
  });

  useEffect(() => {
    document.title = "User";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${appConfig.baseurlAPI}/user`, {params: values}).then((response) => {
      setUsers(response.data.data);
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
        axios.delete(`${appConfig.baseurlAPI}/user/${e}`).then((response) => {
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
                      <th>Name <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="name"/></th>
                      <th>Email <ButtonSortir handleSearchChange={handleSearchChange} values={values} name="email"/></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{ user.name }</td>
                          <td>{ user.email }</td>
                          <td>
                            <Link to={`show/${user.id}`} className="btn btn-secondary mr-1">Detail</Link>
                            <Link to={`edit/${user.id}`} className="btn btn-warning mr-1">Edit</Link>
                            <button  onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                    {users.data.length === 0 && (
                      <tr>
                        <td className='p-0 text-center' colSpan="4">Tidak Ada Data</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination links={users.links} handleSearchChange={handleSearchChange}/>
          </div>
        </div>
      </section>
    </>
  )
}
