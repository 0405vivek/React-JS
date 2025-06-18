import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "react-bootstrap";
import { FaEdit, FaArrowLeft, FaPrint } from "react-icons/fa";
import { getRecipe } from "../services/Actions/RecipesActions";
import "./ViewRecipe.css";

const ViewRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipe = useSelector((state) =>
    state.recipeReducer?.recipes?.find((r) => r.id === parseInt(id))
  );

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [dispatch, id]);

  if (!recipe) return <p className="text-center mt-4">Loading recipe...</p>;

  const videoId = recipe.videoUrl?.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
  )?.[1];

  return (
    <div className="recipe-view-container">
      {/* Back Button */}
      <button className="recipe-btn-back" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      {/* Recipe Card */}
      <div className="recipe-card">
        {/* Image Overlap */}
        <div className="recipe-image-wrapper">
          <img
            src={recipe.image || "https://via.placeholder.com/600x400?text=No+Image"}
            alt={recipe.title}
            className="recipe-image"
          />
        </div>

        {/* Title and Badge */}
        <div className="recipe-header">
          <h1>{recipe.title}</h1>
          <Badge bg={recipe.type === "Veg" ? "success" : "danger"} className="recipe-badge">
            {recipe.type}
          </Badge>
        </div>

        {/* Category */}
        <div className="recipe-category">{recipe.category}</div>

        {/* Content Columns */}
        <div className="recipe-content-columns">
          <div className="recipe-section">
            <h2>Ingredients</h2>
            <ul>
              {Array.isArray(recipe.Ingredient)
                ? recipe.Ingredient.map((item, idx) => <li key={idx}>{item}</li>)
                : recipe.Ingredient?.split("\n").map((item, idx) => <li key={idx}>{item}</li>)
              }
            </ul>
          </div>
          <div className="recipe-section">
            <h2>Steps</h2>
            <ol>
              {Array.isArray(recipe.desc)
                ? recipe.desc.map((step, idx) => <li key={idx}>{step}</li>)
                : recipe.desc?.split("\n").map((step, idx) => <li key={idx}>{step}</li>)
              }
            </ol>
          </div>
        </div>

        {/* Video */}
        {videoId && (
          <div className="recipe-video-section">
            <h3>Watch Recipe Video</h3>
            <div className="recipe-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Recipe Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="recipe-action-buttons">
          <button className="recipe-btn-print" onClick={() => window.print()}>
            <FaPrint /> Print
          </button>
          <button
            className="recipe-btn-edit"
            onClick={() => onEdit(recipe.id)}>
          
            <FaEdit /> Edit Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
