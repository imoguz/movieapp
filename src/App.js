import AuthContextProvider from "./Context/AuthContext";
import { MovieContextProvider } from "./Context/MovieContext";
import AppRouter from "./Router/AppRouter";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <MovieContextProvider>
          <AppRouter />
        </MovieContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
