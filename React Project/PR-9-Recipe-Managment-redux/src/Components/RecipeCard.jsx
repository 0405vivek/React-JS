
import { Card, Button, Badge } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./RecipeCard.css";

const categoryColors = {
  vegetarian: "success",
  nonveg: "danger",
  vegan: "info",
  dessert: "warning",
};

const RecipeCard = ({ recipe, onEdit, onDelete, onview }) => (
  <Card className="h-100 shadow-lg border-0 rounded-4 recipe-card-unique">
    <div className="position-relative">
      <Card.Img
        variant="top"
        src={recipe.image}
        alt={recipe.title}
        className="rounded-top-4"
        style={{ height: "220px", objectFit: "cover" }}
      />
      <Badge
        bg={categoryColors[recipe.category.toLowerCase()] || "secondary"}
        className="position-absolute top-0 end-0 m-3 px-3 py-2 fs-6"
        pill
      >
        {recipe.category}
      </Badge>
    </div>
    <Card.Body className="d-flex flex-column">
      <Card.Title className="mb-2">{recipe.title}</Card.Title>
      <Card.Text className="text-muted mb-2" style={{ minHeight: "40px" }}>
        {recipe.type|| "No description available."}
      </Card.Text>
      <div className="d-flex justify-content-between mt-auto">
        <Button variant="warning" size="sm" onClick={() => onview(recipe.id)}>
          <FaEye className="me-1" /> View
        </Button>
        <Button variant="primary" size="sm" onClick={() => onEdit(recipe.id)}>
          <FaEdit className="me-1" /> Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(recipe.id)}>
          <FaTrash className="me-1" /> Delete
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default RecipeCard;

