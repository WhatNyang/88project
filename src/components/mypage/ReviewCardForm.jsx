import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";
import styled from "styled-components";
import { dbService } from "../../firebase";

export default function ReviewCardForm({ category, form }) {
  const deleteReview = async (id) => {
    await deleteDoc(doc(dbService, "foam", id));
  };

  return (
    <>
      {form
        .filter((item) => item.category === category)
        .map((item) => {
          return (
            <div key={item.id}>
              <StyledDivReviewFoamMainContainer>
                <StyledDivReviewFoamImgContainer>
                  <div></div>
                </StyledDivReviewFoamImgContainer>
                <StyledDivReviewFoamContentsContainer>
                  <div>
                    <BiEdit style={{ cursor: "pointer" }} />
                    <BiTrash
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteReview(item.id);
                        console.log(item.id);
                      }}
                    />
                  </div>
                  <div>
                    <p>{item.nickname}</p>
                    <p>{item.createdAt}</p>
                  </div>
                  <div>
                    <p>{item.contents}</p>
                  </div>
                </StyledDivReviewFoamContentsContainer>
              </StyledDivReviewFoamMainContainer>
            </div>
          );
        })}
    </>
  );
}

const StyledDivReviewFoamMainContainer = styled.div`
  padding: 20px 0px 20px 0px;
  background-color: white;
  border-radius: 10px;
  display: flex;

  margin: 0px 0px 20px 0px;
`;

const StyledDivReviewFoamImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
  div:nth-child(1) {
    width: 70px;
    height: 70px;
    border-radius: 70%;
    overflow: hidden;
    background-color: lightgray;
  }
`;

const StyledDivReviewFoamContentsContainer = styled.div`
  margin-right: 10px;

  div:nth-child(1) {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 15px;
    height: 30px;
  }

  div:nth-child(2) {
    display: flex;

    p:nth-child(1) {
      font-weight: 700;
      font-size: 1.2em;
    }

    p:nth-child(2) {
      display: flex;
      font-size: 0.8em;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      margin-bottom: 10px;
    }
  }

  div:nth-child(3) {
    display: flex;
  }
`;
