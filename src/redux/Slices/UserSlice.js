import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/configFire/config";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,} from "firebase/auth";
import { getReadableAuthErrorMessage } from "../../customMessageFirebase/getMessage";
import { doc, getDoc } from "firebase/firestore";
// create user regiater user
export const createuser = createAsyncThunk(
  "user/createuser",
  async (data, thunkApi) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return res
    } catch (error) {
       return thunkApi.rejectWithValue(getReadableAuthErrorMessage(error.code))
    }
  }
);

// login user
export const loginuser = createAsyncThunk(
  "user/loginuser",
  async ({ email, password }, thunkApi) => {
    try {
      const res =await signInWithEmailAndPassword(auth, email, password);
      console.log(res,"res")
     return res
    } catch (error) {
      const code =error.code;
      console.log(code,"code--")
     return thunkApi.rejectWithValue(getReadableAuthErrorMessage(code)) 
    }
  }
);

// logoutUser
export const logout=createAsyncThunk(
  "user/logput",async()=>{
    try{
      const res=auth.signOut()
      console.log(res,"sign out")
    }catch(error){

    }
  }
)

// fetch userdata
export const fetchuser=createAsyncThunk(
  "user/fetchuser",async(id,thunkApi)=>{
    try{
      console.log(id,"id in thunk")
      const docRef=doc(db,"user",id)
      const docSnap= await getDoc(docRef)
      if(docSnap.exists()){
       return docSnap.data()
      }

    }catch(error){
    throw thunkApi.rejectWithValue(error)
    }
  }
)


// slice of user
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser:null,
    isLoading: true,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(createuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createuser.fulfilled, (state,) => {
        state.isLoading = false;
      })
      .addCase(createuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchuser.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(fetchuser.fulfilled,(state,action)=>{
        state.currentUser=action.payload
        state.isLoading=false
      })
      .addCase(fetchuser.rejected,(state,action)=>{
        state.currentUser=null
        state.isLoading=false
        state.error=action.payload
      })
  },
});
export const userReducer = userSlice.reducer;
