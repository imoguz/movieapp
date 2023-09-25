import { useState } from "react";
import google from "../assets/google.png";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const { signIn, GoogleProvider, passwordReset } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(form.email, form.password);
  };
  const handlePasswordReset = () => {
    form.email.trim() ? passwordReset(form.email) : alert("Şifrenizi girin");
  };
  return (
    <div className="dark:bg-teal-900  bg-green-100 min-h-[calc(100vh-4rem)] flex justify-center  p-20">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] h-[380px] rounded-lg  dark:bg-green-950  bg-green-300 p-7 shadow-lg flex flex-col gap-5"
      >
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between text-lg font-semibold px-1  dark:text-green-200">
          <p
            onClick={handlePasswordReset}
            className="cursor-pointer hover:text-red-900"
          >
            Forgot Password
          </p>
          <p
            onClick={() => navigate("/register")}
            className="cursor-pointer hover:text-red-900"
          >
            Sign Up
          </p>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <button
          onClick={() => GoogleProvider()}
          className="btn flex gap-2 justify-center"
        >
          Continue with Google
          <img className="w-6" src={google} alt="google logo" />
        </button>
      </form>
    </div>
  );
};

export default Login;
