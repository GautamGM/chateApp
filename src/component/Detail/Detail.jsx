import React from 'react'
import { Box, Divider, Typography ,Button} from '@mui/material'
import { auth } from '../../firebase/configFire/config'
import { useSelector,useDispatch} from 'react-redux'
import { logout } from '../../redux/Slices/UserSlice'

function Detail() {
  const{currentUser}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const handelout=()=>{
    dispatch(logout())
  }
  return (
    <div className='flex flex-1 '>
      <Box sx={{width:"100%"}}>
        <Box sx={{display:"flex",justifyContent:"center" ,height:"150px",flexDirection:"column",alignItems:"center"}}>
         <Box sx={{width:"100px",height:"100px",textAlign:"center",display:"flex",justifyContent:"center",}}>
         <img src="https://imgs.search.brave.com/47K5YaAVPJL5FyZkNlOZ3NkQVxz88pDJ_aXG1IUBZo4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvQkQ0/NjgzLTAwMS9waG90/by9jcmFzaC10ZXN0/LWR1bW15LXNpdHRp/bmctb24tZ2FyZGVu/LWNoYWlyLWhvbGRp/bmctZHJpbmsuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU15/VUJrZHdiN3g5Zk1J/NFZkSkgzLVpYd1Jj/cVVFT2wyX0tnSWxX/M3hkZUU9" alt="" className='w-[100%] h-[100%] rounded-[100%]' />
         </Box>
        <Typography>
         {currentUser?.username}
        </Typography>
        <Typography>
          {currentUser?.email}
          </Typography>
        </Box>
        <Divider sx={{backgroundColor:"white"}}/>
       <div className='flex flex-col h-[100px] p-1 m-2 justify-between'>
       <Button variant='contained' >Block user</Button>
       <Button variant='contained' onClick={handelout}>Log out</Button>
       </div>
      </Box>
    </div>
  )
}

export default Detail