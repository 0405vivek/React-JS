import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { categoryName } = useParams();

 
  return <h2>Showing results for category: {categoryName}</h2>;
}

export default CategoryPage;
