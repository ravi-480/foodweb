import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [favourite, setFavourite] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await response.json();

      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes);
        console.log(recipeList);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  };

  const handleAddToFavorites = (getCurrentItem) => {
    const cpyFavouriteList = [...favourite];
    const index = cpyFavouriteList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavouriteList.push(getCurrentItem);
    } else {
      cpyFavouriteList.splice(index, 1);
    }
    setFavourite(cpyFavouriteList);
  };

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetail,
        setRecipeDetail,
        handleAddToFavorites,
        favourite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
