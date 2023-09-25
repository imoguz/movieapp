import { Route, Routes } from "react-router-dom";
import Main from "../Pages/Main";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Navbar from "../components/Navbar";
import MovieDetail from "../Pages/MovieDetail";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="details" element={<PrivateRouter />}>
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
