import styled from "styled-components";
import CardContent from "@mui/material/CardContent";
import { FcBookmark } from "react-icons/fc";
import { deleteBookmark } from "../../data/bookmark";

export default function MypageContentsBookmark({ bookmark }) {
  return (
    <>
      {bookmark.map((item) => {
        return (
          <div key={item.id}>
            <StyledDivMainContainer>
              <StyledDivBookmarkIconContainer>
                <FcBookmark
                  size={"50px"}
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteBookmark(item.id)}
                />
              </StyledDivBookmarkIconContainer>
              <CardContent>
                <PlaceName>{item.place}</PlaceName>
                <RoadAddress>
                  {item.roadAddress
                    ? `${item.address}  (${item.roadAddress})`
                    : `${item.address} `}
                </RoadAddress>
                <Telephone>
                  {item.phone ? `Tel: ${item.phone}` : null}
                </Telephone>
              </CardContent>
            </StyledDivMainContainer>
          </div>
        );
      })}
    </>
  );
}

const StyledDivMainContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  margin-bottom: 20px;
  height: 119.5px;
`;

const StyledDivBookmarkIconContainer = styled.div`
  padding: 15px 0 0 15px;
`;

const PlaceName = styled.div`
  margin: -1px 0 0 -1px;
  font-weight: bold;
  font-size: 20px;
`;
const RoadAddress = styled.div`
  color: gray;
  margin-top: 10px;
`;
const Telephone = styled.div`
  color: gray;
  margin-top: 10px;
`;
