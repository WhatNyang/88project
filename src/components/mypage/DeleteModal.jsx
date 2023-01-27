import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BiEdit, BiTrash } from "react-icons/bi";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../../firebase";
import { deletereview } from "../../data/review";
export default function AlertDialog({ item }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteReviewHandler = async (id) => {
    deletereview(id);
    handleClose(false);
  };

  return (
    <div>
      <BiTrash
        size={"30px"}
        style={{ cursor: "pointer" }}
        onClick={handleClickOpen}
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
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={() => deleteReviewHandler(item.id)} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
