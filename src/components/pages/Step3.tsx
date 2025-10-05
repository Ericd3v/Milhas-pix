import "./style.css";
import { useContext, useState } from "react";
import { MilesContext } from "../../contexts/MilesContext";
import { FaLock, FaUser, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { CAlert } from '@coreui/react';


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
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar a visibilidade da senha
  const [email, setEmail] = useState(""); // Estado para o email
  const [password, setPassword] = useState(""); // Estado para a senha
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 11)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Alterna o estado da senha visível
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações
    if (!email || !email.includes("@")) {
      alert("Digite um email válido.");
      return;
    }

    if (!password || password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!phone || phone.length !== 15) {
      alert("Digite um telefone válido.");
      return;
    }

    // Se tudo estiver correto, navega para o próximo passo
    setErrorMessage(""); // Limpa a mensagem de erro
    navigate("/step-4"); // Navega para o próximo passo
  };

  return (
    <div className="page step3">
      <section className="content">
        <div className="two-col">
          <div className="card">
            <div className="card-header">
              <h2 className="text-step2">
                <span className="one">03.</span> Insira os dados do programa de fidelidade
              </h2>
              {chosenImage && (
                <div className="program-logo">
                  <img src={chosenImage} alt={selectedProgram || "Programa"} />
                </div>
              )}
            </div>

            {/* Exibe o alerta de erro, se houver */}
            {errorMessage && (
              <CAlert color="danger" className="alert-validation">
                {errorMessage}
              </CAlert>
            )}

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>CPF do Titular</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" style={{ color: '#1E90FF' }} />
                  <input
                    required
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
                  <MdEmail className="input-icon" style={{ color: '#1E90FF' }} />
                  <input
                    type="email"
                    placeholder="login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Senha de acesso</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" style={{ color: '#1E90FF' }} />
                  <input
                    type={passwordVisible ? "text" : "password"} // Alterna entre "text" e "password"
                    placeholder="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    style={{ marginTop: '4px' }}
                    onClick={togglePasswordVisibility} // Função para alternar a visibilidade
                  >
                    {passwordVisible ? <LuEye /> : <LuEyeClosed />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Telefone para autenticação</label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    placeholder="(11) 91234-5678"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    required
                  />
                  <FaWhatsapp className="input-icon" color="#25D366" />
                </div>
              </div>
            </form>
          </div>

          {/* Card lateral */}
          <aside className="card-row">
            <h4>Dados da Conta</h4>
            <p>
              Por favor, insira os dados da conta que deseja cadastrar e
              verifique se estão corretos.
            </p>
          </aside>
        </div>

        <div className="form-actions" style={{ margin: '0px 70px 0 0' }}>
          <button
            type="button"
            onClick={() => navigate("/step-2")}
            className="btn"
          >
            ← Voltar
          </button>

          <p className="terms">
            Ao prosseguir você concorda com os{" "}
            <a href="#">termos de uso</a>
          </p>

          <button type="submit" className="btn-primary" style={{ marginRight: '220px' }}>
            Concluir →
          </button>
        </div>
      </section>
    </div>
  );
}
