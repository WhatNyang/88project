import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  // Detail페이지로 가기위한 navigate
  const navigate = useNavigate();
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // let markers = [];
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data); //상세정보
        let bounds = new kakao.maps.LatLngBounds(); // 지도에 검색결과들 마크

        for (let i = 0; i < data.length; i++) {
          // displayMarker 함수의 매개변수로 해당되는 데이터 값을 전달
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)); //검색결과 좌표값
        }

        map.setBounds(bounds);

        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      let paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infoWindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div>
      <div id="myMap" style={{ width: "500px", height: "500px" }}></div>
      <div id="result-list">
        {Places.map((item, i) => (
          <div key={i}>
            <span>{i + 1}</span>
            <div>
              {/* Detail페이지로 이동 */}
              <button
                onClick={() => navigate(`/detail/${item.id}`, { state: item })}
              >
                {item.place_name}
              </button>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default MapContainer;
