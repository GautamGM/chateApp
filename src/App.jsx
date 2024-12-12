import { Box, } from "@mui/material"
import user from "./component/List/List"
import Detail from "./component/Detail/Detail"
import UserChate from "./component/chate/chate"
import User from "./component/List/List"

function App() {
  return (
    <Box sx={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"black",color:"white"}}>
      <Box className="w-[90%] h-[90vh] flex  border rounded-[10px]">
        <User/>
        <UserChate/>
        <Detail/>
      </Box>
    </Box>
  )
}

export default App
