import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product, onEdit, onDelete }) => {
  if (!product) return null;

  return (
    <Card className="m-3 shadow" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={product.imageUrl || "https://via.placeholder.com/180"}
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">₹{product.price}</Card.Subtitle>
        <Card.Text>
          {product.description?.length > 80
            ? product.description.substring(0, 80) + "..."
            : product.description}
        </Card.Text>
        <div className="d-flex justify-content-between">
          {onEdit && (
            <Button variant="warning" size="sm" onClick={() => onEdit(product)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="danger" size="sm" onClick={() => onDelete(product.id)}>
              Delete
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
