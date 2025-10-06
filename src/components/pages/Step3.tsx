import "./style.css";
import { useContext, useState, type FormEvent } from "react";
import { MilesContext } from "../../contexts/MilesContext";
import { FaLock, FaUser, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";
import { LuEyeClosed, LuEye } from "react-icons/lu";

export default function Step3() {
  const { cpf, navigate, selectedProgram } = useContext(MilesContext);

  const programImages: Record<string, string> = {
    azul,
    smiles,
    portugal,
    pass,
  };

  const chosenImage = selectedProgram ? programImages[selectedProgram] : null;

  const [phone, setPhone] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/step-4");
  };

  return (
    <div className="page step3">
     

      <section className="content">
        <div className="two-col">
          <div className="card">
            <div className="card-header">
              <h2 className="text-step">
                <span className="one">03.</span> Insira os dados do programa de fidelidade
              </h2>

              {chosenImage && (
                <div className="program-logo">
                  <img src={chosenImage} alt={selectedProgram || "Programa"} />
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>CPF do Titular</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" style={{ color: "#1E90FF" }} />
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf ?? ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Login de acesso</label>
                <div className="input-wrapper">
                  <MdEmail className="input-icon" style={{ color: "#1E90FF" }} />
                  <input
                    type="text"
                    placeholder="login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Senha de acesso</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" style={{ color: "#1E90FF" }} />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    style={{ marginTop: "4px" }}
                  >
                    {passwordVisible ? <LuEye /> : <LuEyeClosed />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Telefone para autenticação</label>
                <div className="input-wrapper">
                  <FaWhatsapp className="input-icon" color="#25D366" />
                  <input
                    type="text"
                    placeholder="(11) 91234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* CARD INFORMATIVO LATERAL */}
          <aside className="card-row">
            <h4>Dados da Conta</h4>
            <p>
              Por favor, insira os dados da conta que deseja cadastrar e
              verifique se estão corretos.
            </p>
          </aside>
        </div>

        {/* AÇÕES */}
        <div className="form-actions" style={{ margin: "0px 70px 0 0" }}>
          <button type="button" onClick={() => navigate("/step-2")} className="btn">
            ← Voltar
          </button>

          <p className="terms">
            Ao prosseguir você concorda com os{" "}
            <a href="#">termos de uso</a>
          </p>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginRight: "220px" }}
            onClick={() => navigate("/step-4")}
          >
            Concluir →
          </button>
        </div>
      </section>
    </div>
  );
}
