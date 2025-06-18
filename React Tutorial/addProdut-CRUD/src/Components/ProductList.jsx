import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = useSelector((state) => state.productReducer.products); // adjust to your store shape

  const handleEdit = (product) => {
    console.log("Edit clicked", product);
    // Navigate or open a modal
  };

  const handleDelete = (id) => {
    console.log("Delete clicked", id);
    // dispatch delete action here
  };

  return (
    <Container className="mt-4">
      <h3>All Products</h3>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Col>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
