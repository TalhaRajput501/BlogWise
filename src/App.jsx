import { useState, useEffect} from "react"; 
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice/authSlice.js";
import authService from "./service/auth.js";
import { Header, Footer} from './components/index.js'
import { Outlet } from "react-router-dom";
import loader from './assets/loader2.gif'


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        // console.log(userData)
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("Error in authService :: came from frontend app", err);
      })
      .finally(() => setLoading(false));
  }, []);



  return !loading ? (
    <> 

      {/* <h1>Content will show you are on right track </h1> */}
      <Header />
        <Outlet />
      <Footer />
    </>
    ) : 
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-600  z-50 "
    >
      <img src={loader} alt="Loading..." />
    </div>


}

export default App;
