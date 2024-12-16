import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { userschema } from "../../../userSchema/userschema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginuser } from "../../../redux/Slices/UserSlice";
const LoginPage = () => {

  const loginSchema = userschema.pick(['email', 'password']);
  const dispatch=useDispatch()
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  // Handle form submission
  const handleLogin = (data) => {
    dispatch(loginuser(data)).unwrap()
    .then((data)=>{
      console.log(data,"data in login<-----")
    })
    .catch((error)=>{
      console.log(error.code ,"erro in login page ")
    })
    reset();
  };

  return (
    <Box className="w-full flex justify-center flex-col items-center">
      <Typography variant="h3" color="white" gutterBottom>
        Login Page
      </Typography>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col border border-white h-[300px] w-[400px] p-3 justify-evenly"
      >
        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: 'white' },
              }}
              InputProps={{
                style: { color: 'white' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: 'white' },
              }}
              InputProps={{
                style: { color: 'white' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
