import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsLoading,
} from "../store/features/productsSlice";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { selectSearchTerm, selectSelectedCategory } from "../store/features/filterSlice";
import Filters from "../components/Filters";
import ProductModal from "../components/ProductModal";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const loading = useSelector(selectProductsLoading);
  const search = useSelector(selectSearchTerm);
  const selectedCategory = useSelector(selectSelectedCategory);
  const [isOpen,setIsOpen] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState({});

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCloseModal = ()=>{
    setSelectedProduct({});
    setIsOpen(false);
  }
  const handleOpenModal = (product)=>{
    setSelectedProduct(product);
    setIsOpen(true);
  }


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-4 min-h-screen">
      <Filters />
      {isOpen && <ProductModal isOpen={isOpen} product={selectedProduct} closeModal={handleCloseModal}/>}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div onClick={()=>handleOpenModal(product)}>
                <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
