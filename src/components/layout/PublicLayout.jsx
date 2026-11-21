import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import DemoBanner from '../common/DemoBanner';
import Toast from '../common/Toast';
import { useApp } from '../../context/AppContext';

export default function PublicLayout() {
  const { toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toast toast={toast} />
    </div>
  );
}
