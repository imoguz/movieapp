import { useState } from "react";
import google from "../assets/google.png";
import { useAuthContext } from "../Context/AuthContext";
const Register = () => {
  const [form, setform] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const { createUser, GoogleProvider } = useAuthContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = `${form.firstname.trim()} ${form.lastname.trim()}`;
    createUser(form.email, form.password, displayName);
  };
  return (
    <div className="dark:bg-teal-900  bg-green-100 min-h-[calc(100vh-4rem)] flex justify-center items-center p-5">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] h-[500px] rounded-lg shadow-lg dark:bg-green-950 p-7 flex flex-col gap-5"
      >
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            className="peer"
            type="text"
            name="firstname"
            value={form.firstname}
            placeholder="enter your first name"
            onChange={handleChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            placeholder="enter your last name"
            onChange={handleChange}
          />
        </div>
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
        <button type="submit" className="btn">
          Register
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

export default Register;
