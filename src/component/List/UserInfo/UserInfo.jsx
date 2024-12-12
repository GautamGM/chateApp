import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import DuoIcon from "@mui/icons-material/Duo";
import CallIcon from "@mui/icons-material/Call";

function UserInfo() {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
       <IconButton>
       <img
          src="https://imgs.search.brave.com/47K5YaAVPJL5FyZkNlOZ3NkQVxz88pDJ_aXG1IUBZo4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvQkQ0/NjgzLTAwMS9waG90/by9jcmFzaC10ZXN0/LWR1bW15LXNpdHRp/bmctb24tZ2FyZGVu/LWNoYWlyLWhvbGRp/bmctZHJpbmsuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU15/VUJrZHdiN3g5Zk1J/NFZkSkgzLVpYd1Jj/cVVFT2wyX0tnSWxX/M3hkZUU9"
          className="h-[70px] w-[70px] p-1 rounded-[100%] border"
          alt="userpic "
        />
       </IconButton>
        <Typography
          variant="h6"
          m={1}
          component={"subtitle1"}
          sx={{ fontSize: "23px", fontWeight: "600" }}
        >
          Gautan
        </Typography>

        <Box className=" w-[40%] flex justify-evenly">
          <IconButton sx={{ color: "white" }}>
            <DuoIcon />
          </IconButton>
          {/* ---------call */}
          <IconButton sx={{ color: "white" }}>
            <CallIcon />
          </IconButton>
        </Box>
      </Box>
  

    </div>
  );
}

export default UserInfo;
