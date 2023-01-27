import styled from "styled-components";

export default function MypageButton({ category, setCategory }) {
  return (
    <StyledDivTwo>
      <button
        onClick={() => {
          setCategory("bookmark");
        }}
        style={{
          backgroundColor: category === "bookmark" ? "#e37b58" : "lightgrey",
          color: category === "bookmark" ? "white" : null,
        }}
      >
        북마크
      </button>
      <button
        onClick={() => {
          setCategory("review");
        }}
        style={{
          backgroundColor: category === "review" ? "#e37b58" : "lightgrey",
          color: category === "review" ? "white" : null,
        }}
      >
        리뷰
      </button>
    </StyledDivTwo>
  );
}

const StyledDivTwo = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;

  button:nth-child(1) {
    margin-left: 10px;
    width: 100px;
    height: 40px;
    font-size: 15px;
    background: #e37b58;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    &:hover {
      color: white;
    }
  }

  button:nth-child(2) {
    margin-left: 10px;
    width: 100px;
    height: 40px;
    background: #ffffff;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    font-size: 16px;
    &:hover {
      color: white;
    }
  }
`;
