import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { publicRequest } from '../makeRequest';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

//products component will be renderred on Home Or ProductList page depends on prop category 
const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicRequest.get(category ? `/products?category=${category}` : "/products");
        setProducts(response.data);
      } catch (error) {
      };
    }
    getProducts();
  }, [category]);

  useEffect(() => {
    category && setFilterProducts(
      //filter products according to filter object's key value pair
      products.filter(item => 
        Object.entries(filters).every(([key, value]) => item[key].includes(value))
      )
    );
  }, [category, products, filters]);

  useEffect(()=>{
    if(sort==="newest"){
      setFilterProducts(prev=> [...prev].sort((a,b)=>a.createdAt - b.createdAt));
    }else if(sort === "asc"){
      setFilterProducts(prev=> [...prev].sort((a,b)=>a.price - b.price));
    }else{
      setFilterProducts(prev=> [...prev].sort((a,b)=>b.price - a.price));
    }
  },[sort]);

  return (
    <Container>
      { category ? 
        filteredProducts.map(item => (
        <Product item={item} key={item.id} />
      ))
      :
      //max 8 items on homepage
      products.slice(0,8).map(item => (
        <Product item={item} key={item.id} />
      ))
      }
    </Container>
  )
}

export default Products
