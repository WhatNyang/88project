import { deleteDoc, doc } from "firebase/firestore";

import styled from "styled-components";
import { dbService } from "../../firebase";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import { FcBookmark, FcSettings } from "react-icons/fc";

export default function MypageContentsBookmark({ category, bookmark }) {
  const deleteReview = async (id) => {
    await deleteDoc(doc(dbService, "bookmark", id));
  };

  return (
    <>
      {bookmark.map((item) => {
        return (
          <div key={item.id}>
            <StyledDivMainContainer>
              <StyledDivBookmarkIconContainer>
                <FcBookmark size={"50px"} />
              </StyledDivBookmarkIconContainer>

              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {item.place}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginLeft={"10px"}
                >
                  2022.13.21
                </Typography>
                <Typography variant="body1" marginLeft={"10px"}>
                  좋아요 좋아요 좋아요좋아요 좋아요 좋아요좋아요 좋아요
                </Typography>
              </CardContent>

              <div style={{ marginLeft: "120px" }}>
                <FcSettings size={"25px"} style={{ cursor: "pointer" }} />
              </div>
            </StyledDivMainContainer>
          </div>
        );
      })}
    </>
  );
}

const StyledDivMainContainer = styled.div`
  padding: 20px 0px 20px 0px;
  background-color: white;
  border-radius: 10px;
  display: flex;

  margin: 0px 0px 20px 0px;

  div:nth-child(3) {
    width: 50px;
  }
`;

const StyledDivBookmarkIconContainer = styled.div`
  padding-left: 30px;
  padding-top: 10px;
`;
