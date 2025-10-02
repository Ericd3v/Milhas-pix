// FILE: src/pages/Step4.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Step4() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/offers");
    }, 2000);
  };

  return (
    <div className="page">
      <section className="content">
        <div className="card success">
          <h2>Ordem de venda criada com sucesso!</h2>

          <p>
            Agora é só aguardar — assim que suas milhas forem vendidas, o valor
            será transferido direto para sua conta via Pix.
          </p>

          <div style={{ marginTop: 20 }}>
            <button
              onClick={handleClick}
              disabled={loading}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                position: "relative",
              }}
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                "Ver minhas ofertas"
              )}
            </button>
         
          </div>
        </div>
      </section>
    </div>
  );
}