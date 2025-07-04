import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProductAsync } from '../../Services/Actions/productAction';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    image: "",
    rating: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product name is required";
    if (!product.price) newErrors.price = "Product price is required";
    else if (product.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!product.brand.trim()) newErrors.brand = "Brand is required";
    if (!product.category.trim()) newErrors.category = "Category is required";
    if (!product.image.trim()) newErrors.image = "Image URL is required";
    if (!product.rating || product.rating < 1 || product.rating > 5)
      newErrors.rating = "Rating must be between 1 and 5";
    if (!product.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please login to add a product.");
      navigate("/login");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduct = {
      ...product,
      id: Math.floor(Math.random() * 100000).toString(),
    };

    dispatch(addNewProductAsync(newProduct));
    navigate("/");
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
         <Col md={6}>
            <FloatingLabel label="Product Name">
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Price (₹)">
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Brand">
              <Form.Control
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                placeholder="Enter brand"
                isInvalid={!!errors.brand}
              />
              <Form.Control.Feedback type="invalid">{errors.brand}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Category">
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Furniture">Home & Furniture</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Books">Books</option>
                <option value="Grocery">Grocery</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Toys & Baby Products">Toys & Baby Products</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Rating (1-5)">
              <Form.Control
                type="number"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                min="1"
                max="5"
                placeholder="Enter rating"
                isInvalid={!!errors.rating}
              />
              <Form.Control.Feedback type="invalid">{errors.rating}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Image URL">
              <Form.Control
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={12}>
            <FloatingLabel label="Description">
              <Form.Control
                as="textarea"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter description"
                style={{ height: "100px" }}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        
        </Row>

        <Button type="submit" variant="primary" className="mt-4">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProductForm;
