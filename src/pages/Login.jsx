import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Bu kısımda gerçek login kontrolü olacak
    // Şimdilik direkt geçiyoruz
    navigate('/logs');
  };

  return (
    <div>
      <h2>Giriş Sayfası</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Kullanıcı Adı" required />
        <input type="password" placeholder="Şifre" required />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login;
