import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { BiTrash } from "react-icons/bi";
import { deletereview } from "../../data/review";

export default function AlertDialog({ item }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const deleteReviewHandler = async (event, id) => {
    event.stopPropagation();
    deletereview(id);
    handleClose(false);
  };

  return (
    <div>
      <BiTrash
        size={"20px"}
        style={{ cursor: "pointer" }}
        onClick={(event) => handleClickOpen(event)}
      ></BiTrash>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            리뷰를 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => handleClose(event)}>취소</Button>
          <Button
            onClick={(event) => deleteReviewHandler(event, item.id)}
            autoFocus
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
