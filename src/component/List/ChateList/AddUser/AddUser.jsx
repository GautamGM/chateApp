import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function AddUser({ open, setOpen }) {
  //   const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const handleClose = () => setOpen(false);

  const handelsearch = (data) => {
    console.log(data.name, "serach");
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form
              onSubmit={handleSubmit(handelsearch)}
              className="flex justify-evenly items-center border p-2"
            >
              <input
                {...register("name")}
                name="name"
                type="text"
                className="border border-black p-2 rounded "
              />
              <Button type="submit" variant="contained">
                {" "}
                Search
              </Button>
            </form>
            {/* ------------------------------------------------------------search end */}
            <Box >
              <Box className="flex justify-around items-center border mt-4 p-1 rounded-[15px]  bg-black text-white">
                <img draggable={false} className="border  cover  w-[70px]  h-[70px] rounded-[100%]" src="https://imgs.search.brave.com/UXdec7X_4yQLzlYzDER10xY05FHewQoj7ueE5pkijhU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYWNo/b2xldmFudGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzEyL2NvbXByZXNz/ZWRfaW1nLXRUYXdQ/ZXdHUU12OFBIWEg0/Q1phbjRveC5wbmc" alt="pic" />
                <Typography variant="h6" >Gautam</Typography>
                <Button variant="contained">Add+</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
