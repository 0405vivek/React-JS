import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ Correct import
import { useDispatch } from "react-redux";
import generateUniqueId from "generate-unique-id";
import { addNewProduct } from "../services/Action/productAction"; // ✅ Make sure this is defined correctly

const AddProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    price: "",
    description: "",
    imageUrl: ""
  };

  const [product, setProduct] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = generateUniqueId({ length: 6, useLetters: false });
    const newProduct = { ...product, id };

    dispatch(addNewProduct(newProduct));
    setProduct(initialState);
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProductForm;
