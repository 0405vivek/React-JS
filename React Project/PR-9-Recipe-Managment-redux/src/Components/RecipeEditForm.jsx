import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  Alert,
  Card
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe, updateRecipe } from "../services/Actions/RecipesActions.js";
import "./RecipeAddForm.css";

const initialState = {
  id: "",
  title: "",
  desc: "",
  category: "",
  Ingredient: "",
  image: "",
  videoUrl: "",
  type: ""
};

const EditRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe } = useSelector((state) => state.recipeReducer);
  const [inputForm, setInputForm] = useState(initialState);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (id) dispatch(getRecipe(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (recipe) setInputForm(recipe);
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRecipe(inputForm));
    setUpdated(true);
    setTimeout(() => navigate("/"), 1000);
  };

  const extractVideoId = (url) => {
    const match = url?.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <Container className="my-4">
      <h2>Edit Recipe</h2>
      {updated && <Alert variant="success">Recipe updated successfully!</Alert>}

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
          Update Recipe
        </Button>
      </Form>

      {inputForm.videoUrl && extractVideoId(inputForm.videoUrl) && (
        <Card className="mt-4">
          <Card.Header>Recipe Video</Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${extractVideoId(
                inputForm.videoUrl
              )}`}
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

export default EditRecipe;
