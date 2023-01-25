import axios from "axios";

const getReviews = async () => {
  const response = await axios.get("url");
  return response;
};

export { getReviews };
