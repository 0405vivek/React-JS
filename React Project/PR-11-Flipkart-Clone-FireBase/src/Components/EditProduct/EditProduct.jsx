import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductAsync, updateProductAsync } from "../../Services/Actions/productAction";
import { BsPencilSquare } from 'react-icons/bs';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector((state) => state.productReducer);

  const [form, setForm] = useState({
    id: "",
    name: "",
    desc: "",
    price: "",
    image: "",
    category: ""
  });

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  useEffect(() => {
    if (isUpdated) navigate("/");
  }, [isUpdated]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(form));
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">
        <BsPencilSquare className="me-2" />
        Edit Product
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <FloatingLabel label="Product Name">
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Price (₹)">
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </FloatingLabel>
          </Col>

          <Col md={12}>
            <FloatingLabel label="Product Description">
              <Form.Control
                as="textarea"
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Enter product description"
                style={{ height: "100px" }}
                required
              />
            </FloatingLabel>
          </Col>

          <Col md={12}>
            <FloatingLabel label="Product Image URL">
              <Form.Control
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </FloatingLabel>
          </Col>

          <Col md={12}>
            <FloatingLabel label="Product Category">
              <Form.Select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
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
            </FloatingLabel>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-4">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
