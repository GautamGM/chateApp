import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddUser from "./AddUser/AddUser";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/configFire/config";
import { useSelector } from "react-redux";

function ChateList() {
  const [open, setOpen] = useState(false);
  const [myChatList, setMyChatLst] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser.id) {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.id),
        async (res) => {
          const items = res.data().chats;
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "user", item.recieverId);
            let user = await getDoc(userDocRef);
            user = user.data(); //"USER user in chalist =++++++++");
            return { ...item, user };
          }
        );
          const myChatList = await Promise.all(promises);
          setMyChatLst(myChatList.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      );

      return () => {
        unsub();
      };
    }
  }, [currentUser.id]);

  console.log(myChatList, "chalist yufgsdaf");
  return (
    <>
      <div className="p-1 ">
        {/* search barr of the chate list where user can serch the contact */}
        <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
          <IconButton sx={{ color: "white" }}>
            <SearchIcon sx={{ fontSize: "30px" }} />{" "}
          </IconButton>
          <input
            type="text"
            placeholder="serach"
            className="border h-[30px] rounded-[15px] p-2 text-[black] "
          />
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? (
              <RemoveIcon sx={{ fontSize: "30px", color: "white" }} />
            ) : (
              <AddIcon sx={{ fontSize: "30px", color: "white" }} />
            )}
          </IconButton>
        </Box>
        {/* ------------------ */}
        {/* _______________________________________________CHATE____START________________________________ */}

        {/* adduser form  */}
        <AddUser open={open} setOpen={setOpen} />
      </div>
      {/* ------------------------------------------------------------ */}

      <div className="overflow-auto h-[69vh] m-2">
        {myChatList?.map((chat) => {
          return (
            <>
              <Box>
                <Box className="flex items-center">
                  <img
                    src="https://imgs.search.brave.com/jyqoATqhlFSIVDm0a1ZJlOyPh3IvbAaO6mH7gg3g2F8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGVyemluZGFn/aS5pbmZvL2ltYWdl/LzIwMjMvQXVnL3do/by1wbGF5ZWQtcm9s/ZS1vZi1qYWRvby1p/bi1ocml0aGlrLXJv/c2hhbi1maWxtLmpw/Zw"
                    alt="profile"
                    className="w-[50px] cover h-[50px] border rounded-[100%] p-1"
                  />
                  <Box variant="h6" sx={{ marginLeft: "10px" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {chat.user.username}
                    </Typography>
                    <Typography>love you</Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ backgroundColor: "white", margin: "10px" }} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default ChateList;
