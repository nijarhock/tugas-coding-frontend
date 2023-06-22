import { Route, Routes } from 'react-router-dom'

import { Create as BarangCreate }  from '../pages/Barang/Data/Create';
import { Edit as BarangEdit }  from '../pages/Barang/Data/Edit';
import { Index as BarangIndex }  from '../pages/Barang/Data/Index';
import { Show as BarangShow }  from '../pages/Barang/Data/Show';
import Dashboard from '../pages/Dashboard'
import { Create as JenisBarangCreate }  from '../pages/Barang/Jenis/Create';
import { Edit as JenisBarangEdit }  from '../pages/Barang/Jenis/Edit';
import { Index as JenisBarangIndex }  from '../pages/Barang/Jenis/Index';
import { Show as JenisBarangShow }  from '../pages/Barang/Jenis/Show';
import Login from '../pages/Login'
import MainLayout from '../components/layout/MainLayout';
import Penjualan from '../pages/Penjualan'
import LaporanPenjualan from '../pages/LaporanPenjualan';
import LaporanPenjualanJenis from '../pages/LaporanPenjualanJenis';
import React from "react";
import { Create as UserCreate }  from '../pages/User/Create';
import { Edit as UserEdit }  from '../pages/User/Edit';
import { Index as UserIndex }  from '../pages/User/Index';
import { Show as UserShow }  from '../pages/User/Show';

function Router() {
    
    return (
        <Routes>
            <Route 
                exact
                path="/"
                element={<Login />}
            />
            <Route 
                exact
                path="/dashboard"
                element={
                    <MainLayout>
                        <Dashboard />
                    </MainLayout>
                }
            />
            {/* Start Route User */}
            <Route 
                exact
                path="/user"
                element={
                    <MainLayout>
                        <UserIndex />
                    </MainLayout>
                }
            />
            <Route 
                exact
                path="/user/create"
                element={
                    <MainLayout>
                        <UserCreate />
                    </MainLayout>
                }
            />
            <Route 
                path="/user/show/:id"
                element={
                    <MainLayout>
                        <UserShow />
                    </MainLayout>
                }
            />
            <Route 
                path="/user/edit/:id"
                element={
                    <MainLayout>
                        <UserEdit />
                    </MainLayout>
                }
            />
            {/* End Route User */}
            {/* Start Jenis Barang */}
            <Route 
                exact
                path="/jenis_barang"
                element={
                    <MainLayout>
                        <JenisBarangIndex />
                    </MainLayout>
                }
            />
            <Route 
                exact
                path="/jenis_barang/create"
                element={
                    <MainLayout>
                        <JenisBarangCreate />
                    </MainLayout>
                }
            />
            <Route 
                path="/jenis_barang/show/:id"
                element={
                    <MainLayout>
                        <JenisBarangShow />
                    </MainLayout>
                }
            />
            <Route 
                path="/jenis_barang/edit/:id"
                element={
                    <MainLayout>
                        <JenisBarangEdit />
                    </MainLayout>
                }
            />
            {/* End Route Jenis Barang */}
            {/* Start Barang */}
            <Route 
                exact
                path="/barang"
                element={
                    <MainLayout>
                        <BarangIndex />
                    </MainLayout>
                }
            />
            <Route 
                exact
                path="/barang/create"
                element={
                    <MainLayout>
                        <BarangCreate />
                    </MainLayout>
                }
            />
            <Route 
                path="/barang/show/:id"
                element={
                    <MainLayout>
                        <BarangShow />
                    </MainLayout>
                }
            />
            <Route 
                path="/barang/edit/:id"
                element={
                    <MainLayout>
                        <BarangEdit />
                    </MainLayout>
                }
            />
            {/* End Route Barang */}
            <Route 
                exact
                path="/penjualan"
                element={
                    <MainLayout>
                        <Penjualan />
                    </MainLayout>
                }
            />
            <Route 
                exact
                path="/laporan_penjualan"
                element={
                    <MainLayout>
                        <LaporanPenjualan />
                    </MainLayout>
                }
            />
            <Route 
                exact
                path="/laporanpenjualan_jenis"
                element={
                    <MainLayout>
                        <LaporanPenjualanJenis />
                    </MainLayout>
                }
            />
        </Routes>
    )
}

export default Router