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
import {
  getProductAsync,
  updateProductAsync,
} from "../../Services/Actions/productAction";
import { BsPencilSquare } from "react-icons/bs";
import { UploadImage } from "../../Services/Cloudinary";
import { toast, ToastContainer } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector((state) => state.productReducer);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  useEffect(() => {
    if (product) {
      setForm({
        id: product.id || "",
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
        category: product.category || "",
      });
    }
  }, [product]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [isUpdated]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    try {
      const imageUrl = await UploadImage(e.target.files[0]);
      setForm({
        ...form,
        image: imageUrl,
      });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(form));
  };

  return (
    <Container className="my-4">
      <ToastContainer position="top-right" autoClose={3000} />
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
                placeholder=" "
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
                placeholder=" "
                required
              />
            </FloatingLabel>
          </Col>

          <Col md={12}>
            <FloatingLabel label="Product Description">
              <Form.Control
                as="textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder=" "
                style={{ height: "100px" }}
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
                <option value="Beauty & Personal Care">
                  Beauty & Personal Care
                </option>
                <option value="Books">Books</option>
                <option value="Grocery">Grocery</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Toys & Baby Products">
                  Toys & Baby Products
                </option>
              </Form.Select>
            </FloatingLabel>
          </Col>

          <Col md={12}>
            <FloatingLabel label="Upload Image">
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileUpload}
              />
            </FloatingLabel>

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-3 rounded"
                style={{ maxWidth: "200px" }}
              />
            )}
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
