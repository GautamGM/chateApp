import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  
} from "firebase/firestore";

import { db } from "../../../../firebase/configFire/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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
  const { register, handleSubmit, reset } = useForm();
  const handleClose = () => setOpen(false);
  const [myuser, setMyUser] = React.useState([]);

  const { currentUser } = useSelector((state) => state.user);
  // const newValue = user.map((prev)=> {return (...prev , newValue)})
  // setUser(newValue)
  const handelsearch = async (data) => {
    console.log(data.name, "serach");

    try {
      const userRef = collection(db, "user");
      // Create a query against the collection.
      const q = query(userRef, where("username", "==", data.name));
      const userSnapshot = await getDocs(q);
      if (!userSnapshot.empty) {
        const userlist = userSnapshot.docs;
        const newValue = userlist.map((elem) => {
          const data = elem.data();
          return data;
        });

        setMyUser(newValue);
      } else {
        setMyUser([]);
        toast.info("no user found");
      }
    } catch (error) {
      console.log(error, "error ");
    }
  };

  // handel add user to the chatlist--
  const hnadelAdd = async (id) => {
    const chatsRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      // Query the current user's chats to see if the chat already exists
      const currentUserChatsDoc = await getDoc(
        doc(userChatsRef, currentUser.id)
      );
      const currentUserChats = currentUserChatsDoc.exists()
        ? currentUserChatsDoc.data().chats
        : [];

      // Check if a chat already exists with the selected user
      const chatExists = currentUserChats.some(
        (chat) => chat.recieverId === id
      );

      if (chatExists) {
        toast.info("Chat already exists!");
        return; // Exit if the chat already exists
      }

      // Create a new chat document in the 'chats' collection
      const newChatRef = doc(chatsRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Update both users' `userChats` documents with the new chat
      const newChatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        recieverId: id,
        updatedAt: Date.now(),
      };

      await updateDoc(doc(userChatsRef, id), {
        chats: arrayUnion({ ...newChatData, recieverId: currentUser.id }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion(newChatData),
      });

      toast.success("Chat created successfully!");
    } catch (error) {
      console.error("Error creating chat: ", error);
      toast.error("Error creating chat");
    }
  };

  React.useEffect(() => {
    const fetchChats = async () => {
      try {
        // Reference to the chats collection
        const chatRef = collection(db, "chats");

        // Fetch all chat documents
        const chatSnapshot = await getDocs(chatRef);

        // Map through the chat documents and log the data
        const chats = chatSnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID if needed
          ...doc.data(), // Spread the chat data
        }));

        console.log(chats, "All chats from Firestore");
      } catch (error) {
        console.error("Error fetching chats: ", error);
      }
    };

    fetchChats();
  }, []);

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
            <Box>
              {myuser?.map((user) => {
                console.log(user, "reunuser");
                return (
                  <>
                    <Box className="flex justify-around items-center border mt-4 p-1 rounded-[15px]  bg-black text-white">
                      <img
                        draggable={false}
                        className="border  cover  w-[70px]  h-[70px] rounded-[100%]"
                        src="https://imgs.search.brave.com/UXdec7X_4yQLzlYzDER10xY05FHewQoj7ueE5pkijhU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYWNo/b2xldmFudGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI0/LzEyL2NvbXByZXNz/ZWRfaW1nLXRUYXdQ/ZXdHUU12OFBIWEg0/Q1phbjRveC5wbmc"
                        alt="pic"
                      />
                      <Typography variant="h6">{user.username}</Typography>
                      <Button
                        variant="contained"
                        onClick={() => hnadelAdd(user.id)}
                      >
                        Add+
                      </Button>
                    </Box>
                  </>
                );
              })}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

