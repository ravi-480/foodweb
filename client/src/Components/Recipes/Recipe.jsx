import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import "./Recipe.css";

const Recipe = () => {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);
  const { recipeList, loading } = useContext(GlobalContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setSearchParam(e.target.value)}
          name="search"
          value={searchParam}
          placeholder="Search food here..."
        />
      </form>
      {loading ? <h3 className="loading">Loading, please wait...</h3> : null}

      {recipeList && recipeList.length > 0 ? (
        <div className="recipe-list">
          {recipeList.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="recipe-image"
              />
              <div className="recipe-info">
                <span>{recipe.publisher}</span>
                <h3>{recipe.title}</h3>
                <Link to={`/recipe-item/${recipe.id}`}>Recipe Details</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="No-detail">
          <h3>Nothing to show! Please search something.</h3>
        </div>
      )}
    </div>
  );
};

export default Recipe;
