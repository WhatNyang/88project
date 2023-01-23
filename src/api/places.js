async function fetchPlace() {
  const response = await fetch(
    "https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000"
  );
  return response.json();
}

const BASE_URL = "http://openapi.seoul.go.kr:8088";
const API_KEY = "070e2a51604f86750f8c57a5915fab58";

export const getEventList = () =>
  fetch(`${BASE_URL}/${API_KEY}/json/culturalEventInfo/1/50/`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
