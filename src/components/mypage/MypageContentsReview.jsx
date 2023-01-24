import { deleteDoc, doc } from "firebase/firestore";

import styled from "styled-components";
import { dbService } from "../../firebase";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import { FcBookmark, FcMenu } from "react-icons/fc";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

export default function MypageContentsReview({ category, review }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");

  const deleteReview = async (id) => {
    await deleteDoc(doc(dbService, "bookmark", id));
  };

  return (
    <>
      {review.map((item) => {
        return (
          <div key={item.id}>
            <StyledDivMainContainer>
              <StyledDivBookmarkIconContainer>
                <FcBookmark size={"50px"} />
              </StyledDivBookmarkIconContainer>

              <CardContent>
                <Typography gutterBottom variant="h4">
                  헬스퀘어
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  2022.13.21
                </Typography>
                {isEdit ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-amount">
                        수정하기
                      </InputLabel>
                      <Input
                        id="standard-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">
                            <AiOutlineEdit />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <Button variant="contained" color="success">
                      수정
                    </Button>
                    <Button variant="contained" color="warning">
                      취소
                    </Button>
                  </div>
                ) : (
                  <Typography variant="body1" paddingTop={"5px"}>
                    좋아요 좋아요 좋아요좋아요 좋아요 좋아요좋아요 좋아요
                  </Typography>
                )}
              </CardContent>

              <StyledDivSettingsIcon>
                <FcMenu
                  size={"25px"}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                />
              </StyledDivSettingsIcon>
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

const StyledDivSettingsIcon = styled.div`
  margin-left: 45px;
`;
