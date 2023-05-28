const IMAGE_API_URL_BASE = 'https://api.unsplash.com/';
const IMAGE_API_AUTH = '?client_id=RC7Nq8tLS1I8QZFv4YF4XB94jVwsKngzt4hORWJPsZw';
const ITEMS_PER_PAGE = '&per_page=100';

const alpaca_colletion_url =
  IMAGE_API_URL_BASE +
  '/collections/39936044/photos/' +
  IMAGE_API_AUTH +
  ITEMS_PER_PAGE;

const llama_colletion_url =
  IMAGE_API_URL_BASE +
  '/collections/3_DCE7Rat6I/photos/' +
  IMAGE_API_AUTH +
  ITEMS_PER_PAGE;

const getAlpacas = async () => {
  const response = await fetch(alpaca_colletion_url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const getLlamas = async () => {
  const response = await fetch(llama_colletion_url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export {getAlpacas, getLlamas};
