import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useNavigate, useParams } from "react-router";
import {
  addNewBook,
  getBook,
  updateBook,
} from "../services/Actions/booksAction";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.bookReducer);
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
    dispatch(updateBook(inputForm));
    setInputForm(intialState);
    navigate("/");
  };

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [id]);

  useEffect(() => {
    if (book) {
      setInputForm(book);
    }
  }, [book]);

  return (
    <>
      <Container className="mt-4">
        <h2>Edit Book Page</h2>
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
          <Button type="submit">Update Book</Button>
        </Form>
      </Container>
    </>
  );
};

export default EditBook;