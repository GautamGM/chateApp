import { Box } from "@mui/material";
import user from "./component/List/List";
import Detail from "./component/Detail/Detail";
import UserChate from "./component/chate/chate";
import User from "./component/List/List";
import LoginPage from "./component/pages/LoginPage/LoginPage";
import RegisterPage from "./component/pages/RegisterPage/RegisterPage";
import { auth } from "./firebase/configFire/config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fetchuser } from "./redux/Slices/UserSlice";
import { useDispatch } from "react-redux";
function App() {
  const [islogin, setIsLogin] = useState(false);
  const dispatch=useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        try {
          setIsLogin(true);
          console.log(currentUser.uid,"uid of current user--")
        dispatch(fetchuser(currentUser.uid))
        } catch (error) {
          console.log(error, "error in Apppp??");
          throw new Error(error);
        }
      } else {
        // No user is signed in
        console.log("No user logged in");
        setIsLogin(false);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [fetchuser]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Box className="w-[90%] h-[90vh] flex  border rounded-[10px]">
        {islogin ? (
          <>
            <User />
            <UserChate />
            <Detail />
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", flexGrow: "1" }}>
              <LoginPage />
            </Box>
            <Box sx={{ display: "flex", flexGrow: "1" }}>
              <RegisterPage />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
