import { useState } from "react";
import {useDispatch} from 'react-redux'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router";
import { addNewBook } from "../services/Actions/booksAction";

const AddBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intialState = {
    id: "",
    title: "",
    desc: "",
    category: "",
    price: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(intialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let id = generateUniqueId({
      length: 6,
      useLetters: false,
    });
    inputForm.id = id;
    dispatch(addNewBook(inputForm));
    setInputForm(intialState);
    navigate("/");
  };

  return (
    <>
      <Container className="mt-4">
        <h2>Add Book Page</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Book Title"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Book Description"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Price
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter Book Price"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Category
            </Form.Label>
            <Col sm="10">
              <Form.Select
                aria-label="Default select example"
                name="category"
                onChange={handleChanged}
              >
                <option>Select Category</option>
                <option value="Education">Education</option>
                <option value="Comady">Comady</option>
                <option value="Story">Story</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Book Image
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Book Image URL"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
              />
            </Col>
          </Form.Group>
          <Button type="submit">Add Book</Button>
        </Form>
      </Container>
    </>
  );
};

export default AddBook;