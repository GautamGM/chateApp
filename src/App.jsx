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
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [islogin, setIsLogin] = useState(false);
  const dispatch=useDispatch()
const {currentUser}=useSelector((state)=>state.user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        try {
          
          console.log(currentUser.uid,"uid of current user----------Guatam")
        dispatch(fetchuser(currentUser.uid)).unwrap()
        .then((data)=>{
          console.log(data,"daat----->==ppifiowqeyiuq")
          setIsLogin(true);
        }).catch((error)=>{
          console.log(error,"error in fectin guser")
        })
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

  // if(!currentUser) return <>....Loading</>
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
           {currentUser?<>
            <User />
            <UserChate />
            <Detail />
           </>:<h1>.....Loading</h1>}
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
