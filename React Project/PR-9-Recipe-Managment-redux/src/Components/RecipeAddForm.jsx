import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addNewRecipe } from "../services/Actions/RecipesActions";
import "./RecipeAddForm.css";

const initialState = {
  id: "",
  title: "",
  desc: "",
  Ingredient: "",
  category: "",
  image: "",
  videoUrl: "",
  type: "",
};

const AddRecipe = () => {
  const [inputForm, setInputForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100000);
    dispatch(addNewRecipe({ ...inputForm, id }));
    setSubmitted(true);
    setTimeout(() => navigate("/"), 1000);
  };

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <Container className="my-4">
      <h2>Add New Recipe</h2>
      {submitted && <Alert variant="success">Recipe added successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={inputForm.title || ""}
            onChange={handleChange}
            placeholder="Enter recipe title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="Ingredient"
            value={inputForm.Ingredient || ""}
            onChange={handleChange}
            placeholder="List ingredients"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Steps</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="desc"
            value={inputForm.desc || ""}
            onChange={handleChange}
            placeholder="Describe the steps"
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={inputForm.category || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={inputForm.image || ""}
                onChange={handleChange}
                placeholder="Paste image link here"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Veg"
              name="type"
              value="Veg"
              checked={inputForm.type === "Veg"}
              onChange={handleChange}
              required
            />
            <Form.Check
              inline
              type="radio"
              label="Non-Veg"
              name="type"
              value="Non-Veg"
              checked={inputForm.type === "Non-Veg"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>YouTube Video URL</Form.Label>
          <Form.Control
            type="text"
            name="videoUrl"
            value={inputForm.videoUrl || ""}
            onChange={handleChange}
            placeholder="Paste YouTube video link here"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Recipe
        </Button>
      </Form>

      {inputForm.videoUrl && extractVideoId(inputForm.videoUrl) && (
        <Card className="mt-4">
          <Card.Header>Recipe Video</Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${extractVideoId(inputForm.videoUrl)}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AddRecipe;
