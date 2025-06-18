import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Row, Col, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteRecipe, getAllRecipesAsync } from "../services/Actions/RecipesActions";
import RecipeCard from "./RecipeCard";
import "./RecipeHome.css";
import Banner from "./Banner";

const Home = () => {
  const { recipes, isLoading } = useSelector(state => state.recipeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    dispatch(getAllRecipesAsync());
  }, [dispatch]);

  const handleEdit = id => navigate(`/edit-recipe/${id}`);
  const handleDelete = id => dispatch(deleteRecipe(id));
  const handleView = id => navigate(`/recipe/${id}`);

  const filteredRecipes = recipes.filter(recipe => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      recipe.title.toLowerCase().includes(search) ||
      recipe.category.toLowerCase().includes(search) ||
      (recipe.Ingredient && recipe.Ingredient.toLowerCase().includes(search));

    const matchesCategory =
      categoryFilter === "all" || recipe.category.toLowerCase() === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  return (
    <>
      <Banner />
      <Container className="py-4">
        <h1 className="text-center mb-4">Recipe Collection</h1>

        {/* Category Dropdown Filter */}
        <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
          <label htmlFor="categoryFilter" className="form-label fw-semibold mb-0">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            className="form-select w-25"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Categories</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        {/* Search Box */}
        <input
          type="text"
          className="search w-25 p-2 px-3 mb-3"
          placeholder="Search Cuisine"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {currentRecipes.map(recipe => (
                <Col key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onview={handleView}
                  />
                </Col>
              ))}
            </Row>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
