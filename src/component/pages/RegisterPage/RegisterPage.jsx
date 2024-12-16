import { Box, Button, createTheme, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { userschema } from "../../../userSchema/userschema";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { createuser } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/configFire/config";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(userschema),
    mode: "onChange",
  });
  const hnadelRegister = (data) => {
    dispatch(createuser(data)).unwrap()
      .then( async (res) => {
        await setDoc(doc(db, "user", res.user.uid), { //---->creating the data bse in fire store
          username: data.name,//email
          email: data.email,//password
          blocked: [],
          id: res.user.uid,//user id from when we registe rthe usser
        });
        // user chats
        await setDoc(doc(db, "userChats", res.user.uid), {
          chats: [],
        });

        toast.success("register successfully");
      })
      .catch((error) => {
        toast.error(error);
        console.log(error.message, "error----->");
      });
    reset();
  };
  return (
    <Box className=" w-[100%] flex justify-center flex-col items-center">
      <Typography variant="h3" sx={{ color: "white" }}>
        Register User
      </Typography>
      <form
        onSubmit={handleSubmit(hnadelRegister)}
        action=""
        className="flex flex-col border border-white h-[300px] w-[400px] p-3 justify-evenly"
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              InputLabelProps={{
                style: { color: "white" }, // Label text color
              }}
              InputProps={{
                style: { color: "white" }, // Text color
              }}
              label="name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Outline color when focused
                  },
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              InputLabelProps={{
                style: { color: "white" }, // Label text color
              }}
              InputProps={{
                style: { color: "white" }, // Text color
              }}
              label="email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Outline color when focused
                  },
                },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              InputLabelProps={{
                style: { color: "white" }, // Label text color
              }}
              InputProps={{
                style: { color: "white" }, // Text color
              }}
              label="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Outline color when focused
                  },
                },
              }}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Sign up{" "}
        </Button>
      </form>
    </Box>
  );
};
export default RegisterPage;
