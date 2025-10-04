import "./style.css";
import { useContext } from "react";
import { MilesContext } from "../../contexts/MilesContext";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";

export default function Step3() {
  const { cpf, navigate, selectedProgram } = useContext(MilesContext);

  // mapeia os programas com suas imagens correspondentes
  const programImages: Record<string, string> = {
    azul,
    smiles,
    portugal,
    pass,
  };

  // recupera a imagem correspondente ao programa escolhido
  const chosenImage = selectedProgram ? programImages[selectedProgram] : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/step-4");
  };

  return (
    <div className="page">
      <section className="content">
        <div className="card">
          <h2>
            <span className="one">03.</span> Insira os dados do programa de fidelidade
          </h2>

          {/* Mostra a imagem do programa selecionado */}
          {chosenImage && (
            <div className="program-preview">
              <img
                src={chosenImage}
                alt={selectedProgram || "Programa selecionado"}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              CPF do Titular
              <input placeholder="000.000.000-00" value={cpf ? cpf : ""} readOnly />
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
                onClick={() => navigate("/step-2")}
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
