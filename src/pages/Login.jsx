import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice"; // loginUser action'ını doğru import et
import logo from "../assets/gig_logo.jpg";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.auth.error);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : "Bir hata oluştu");
    }
  }, [error]);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-orange-400 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-120 text-center"
      >
        <img
          src={logo}
          alt="Logo"
          className="w-60 h-60 object-contain mx-auto mb-4"
        />

        <h2 className="mb-6 text-2xl font-semibold text-gray-800 font-poppins">
          Log Paneli
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
          className="w-full p-4 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />

        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-4 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />

        <button
          type="submit"
          className="cursor-pointer w-full py-3 bg-blue-900 hover:bg-orange-400 text-white text-lg font-semibold rounded-lg transition duration-300"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;
