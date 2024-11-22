import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Context/Context";
import "./Detail.css"; // Import the updated Detail.css

const Detail = () => {
  const { recipeDetail, setRecipeDetail, handleAddToFavorites, favourite } =
    useContext(GlobalContext);
  const { id } = useParams();

  // Function to fetch recipe details
  const getRecipeDetails = async () => {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();
    if (data?.data) {
      setRecipeDetail(data.data.recipe); // Set the fetched recipe details
    }
  };

  useEffect(() => {
    getRecipeDetails(); // Fetch the recipe details when the component mounts
  }, [id]);

  return (
    <div className="detail-container">
      {/* Recipe Image */}
      <div className="detail-recipe-image">
        <img src={recipeDetail?.image_url} alt={recipeDetail?.title} />
      </div>

      {/* Recipe Details */}
      <div className="detail-recipe-details">
        <h2>{recipeDetail?.title}</h2>
        <h3>Publisher: {recipeDetail?.publisher}</h3>

        {/* Serving Size and Cooking Time */}
        <div className="recipe-info">
          <p><strong>Serving Size:</strong> {recipeDetail?.servings}</p>
          <p><strong>Cooking Time:</strong> {recipeDetail?.cooking_time} mins</p>
        </div>

        {/* Ingredients */}
        <h3>Ingredients</h3>
        <ul>
          {recipeDetail?.ingredients?.map((ingredient, index) => (
            <li key={index}>
              <span>
                {ingredient.quantity}
                {ingredient.unit} -{" "}
              </span>
              {ingredient.description}
            </li>
          ))}
        </ul>

        {/* Source Link */}
        {recipeDetail?.source_url && (
          <a
            href={recipeDetail.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-source-link"
          >
            View Full Recipe
          </a>
        )}

        {/* Add to Favorites Button */}
        <button
          className="detail-favorite-button"
          onClick={() => handleAddToFavorites(recipeDetail)}
        >
          {favourite &&
          favourite.length > 0 &&
          favourite.findIndex((item) => item.id === recipeDetail?.id) !== -1
            ? "Remove from fav"
            : "Add To Fav"}
        </button>
      </div>
    </div>
  );
};

export default Detail;
