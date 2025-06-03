import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
