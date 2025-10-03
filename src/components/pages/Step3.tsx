// FILE: src/pages/Step3.jsx
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Step3() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/step-4");
  };

  return (
    <div className="page">
      <section className="content">
        <div className="card">
          <h2><span className="one"> 03.</span> Insira os dados do programa de fidelidade</h2>
          <form onSubmit={handleSubmit} className="form-grid" >
            <label >
              CPF do Titular
              <input placeholder="000.000.000-00" />
            </label>

            <label>
              Login de acesso
              <input placeholder="login" />
            </label>

            <label>
              Senha de acesso
              <input type="password" placeholder="senha" />
            </label>

            <label>
              Telefone para autenticação
              <input placeholder="(11) 9 9999-9999" />
            </label>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => history.back()}
                className="btn"
              >
                ← Voltar
              </button>
              <button type="submit" className="btn primary">
                Concluir →
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
