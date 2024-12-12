import { Box, } from "@mui/material"
import user from "./component/List/List"
import Detail from "./component/Detail/Detail"
import UserChate from "./component/chate/chate"
import User from "./component/List/List"
import LoginPage from "./component/pages/LoginPage/LoginPage"
import RegisterPage from "./component/pages/RegisterPage/RegisterPage"

function App() {
  const user=false
  return (
    <Box sx={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"black",color:"white"}}>
      <Box className="w-[90%] h-[90vh] flex  border rounded-[10px]">
       {user?<>
        <User/>
        <UserChate/>
        <Detail/>
       </>:<>
      <Box sx={{display:"flex", flexGrow:"1"}}>
      <LoginPage/>
      </Box>
       <Box sx={{display:"flex", flexGrow:"1"}}>
       <RegisterPage/>
       </Box>
       </>}
      </Box>
    </Box>
  )
}

export default App
