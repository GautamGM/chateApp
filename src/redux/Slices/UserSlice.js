import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/configFire/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Email } from "@mui/icons-material";

export const createuser=createAsyncThunk(
    "user/createuser",async(data,thunkApi)=>{
        try{
            const res= await createUserWithEmailAndPassword(auth,data.email ,data.password )
            console.log(res,"config-------->")
        }catch(error){
            throw thunkApi.rejectWithValue(error)
        }
    }
)


// slice of user
const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:[],
        isLoading:true,
        error:null
    },
    extraReducers(builder){
        builder
        .addCase(createuser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createuser.fulfilled,(state,action)=>{
            state.userData=action.payload
            state.isLoading=false
        })
        .addCase(createuser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        })
    }
})
export const  userReducer=userSlice.reducer