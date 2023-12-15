const BASE_URL = "https://forkify-api.herokuapp.com";
const BASE_URL_PRAY = "https://api.aladhan.com/v1";

export const state = {
  index: "",
  searchedRecipies: "",
  searchedValue: "",
};

export const getPrayer = async (date, latitude, longitude) => {
  const res = await fetch(
    `${BASE_URL_PRAY}/calendar/${date}?latitude=${latitude}&longitude=${longitude}`,
    {
      method: "GET",
    }
  );
  const { data } = await res.json();
  return data;
};

export const getRecipies = async (search) => {
  const res = await fetch(`${BASE_URL}/api/v2/recipes?search=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await res.json();
  console.log(data.recipes);
  return data.recipes;
};
