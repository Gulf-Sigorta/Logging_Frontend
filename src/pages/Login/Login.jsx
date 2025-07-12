import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/gig_logo.jpg";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/logs");
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <img src={logo} alt="Logo" className={styles.loginLogo} />

        <h2>Log Paneli</h2>

        <input
          type="text"
          placeholder="Kullanıcı Adı"
          required
          autoFocus
          className={styles.inputField}
        />

        <input
          type="password"
          placeholder="Şifre"
          required
          className={styles.inputField}
        />

        <button type="submit" className={styles.loginButton}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;
