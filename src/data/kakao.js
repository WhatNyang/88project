export const displayPagination = (pagination) => {
  var paginationEl = document.getElementById("pagination"),
    fragment = document.createDocumentFragment(),
    i;

  while (paginationEl.hasChildNodes()) {
    paginationEl.removeChild(paginationEl.lastChild);
  }

  for (i = 1; i <= pagination.last; i++) {
    var el = document.createElement("a");
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
};

// useEffect(() => {
//   const container = document.getElementById("myMap");
//   const options = {
//     center: new kakao.maps.LatLng(37.394726159, 127.111209047),
//     level: 3,
//   };
//   const map = new kakao.maps.Map(container, options);

//   const ps = new kakao.maps.services.Places();

//   ps.keywordSearch(place, placesSearchCB);

//   function placesSearchCB(data, status, pagination) {
//     if (status === kakao.maps.services.Status.OK) {
//       let bounds = new kakao.maps.LatLngBounds();

//       for (let i = 0; i < data.length; i++) {
//         displayMarker(data[i]);
//         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//       }

//       map.setBounds(bounds);
//       displayPagination(pagination);
//       setPlaces(data);
//     }
//   }

//   function displayMarker(place) {
//     let marker = new kakao.maps.Marker({
//       map: map,
//       position: new kakao.maps.LatLng(place.y, place.x),
//     });

//     const infoWindow = new kakao.maps.InfoWindow({
//       zIndex: 1,
//       content:
//         '<div style="width:150px;text-align:center;padding:5px 20px 5px 5px;">' +
//         place.place_name +
//         "</div>",
//       removable: true,
//     });

//     kakao.maps.event.addListener(marker, "click", function () {
//       infoWindow.open(map, marker);
//     });
//   }
// }, [place]);
