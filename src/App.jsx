import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CartPage from './pages/CartPage';
import ProductModal from './components/ProductModal';
import Layout from './layout/DefaultLayout';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
       <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
      </div>
    </Router>
  );
}

export default App;
