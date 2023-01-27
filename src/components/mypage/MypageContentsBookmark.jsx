import { deleteDoc, doc } from "firebase/firestore";

import styled from "styled-components";
import { dbService } from "../../firebase";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
                <Typography gutterBottom variant="h4">
                  {item.place}
                </Typography>
                <Typography variant="body1" color="text.frimary">
                  {item.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tel: {item.phone}
                </Typography>
              </CardContent>
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
`;

const StyledDivBookmarkIconContainer = styled.div`
  padding-left: 30px;
  padding-top: 15px;
`;
