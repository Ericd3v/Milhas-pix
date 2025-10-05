import { useContext } from "react";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";
import { BsChevronExpand } from "react-icons/bs";
import { AiFillUnlock } from "react-icons/ai";
import "./style.css";
import { MilesContext } from "../../contexts/MilesContext";

export default function Step1() {
  const { cpf, navigate, setCpf, selectedProgram, setSelectedProgram } =
    useContext(MilesContext);

  const programImages: Record<string, string> = {
    azul,
    smiles,
    pass,
    portugal,
  };

  const handleProceed = () => {
    // 🚨 Checkpoints 
    if (!cpf || cpf.length !== 14) { // Verifica se o CPF tem 14 caracteres (incluindo a formatação)
      alert("Digite um CPF válido com 11 dígitos e selecione o programa de fidelidade.");
      return;
    }

    navigate("/step-2");
  };

  // Função para formatar o CPF conforme o usuário digita
  const formatCpf = (value: string) => {
    const cpf = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  };

  return (
    <div className="page">
      <section className="content">
        <div className="step-container">
          <div className="card">
            <div className="card-header">
              <h2 className="text-step1" style={{width:'400px'}}>
                <span className="one">01.</span> Escolha o programa de fidelidade
              </h2>
            </div>

            {/* Botões dos programas */}
            <div className="programs">
              {Object.keys(programImages).map((key) => (
                <button
                  type="button"
                  key={key}
                  className={`program-btn ${selectedProgram === key ? "active" : ""}`}
                  onClick={() => setSelectedProgram(key)}
                >
                  <img src={programImages[key]} alt={key} />
                </button>
              ))}
            </div>

            {/* Formulário */}
            <form className="form-row" onSubmit={(e) => e.preventDefault()}>
              <label>
                <h2>Produto</h2>
                <div className="select-wrapper">
                  <select className="select-label" defaultValue="liminar">
                    <option value="liminar">Liminar</option>
                    <option value="outro">Outro</option>
                  </select>
                  <BsChevronExpand className="select-icon" />
                </div>
              </label>

              <label>
                <h2>CPFs Disponíveis</h2>
                <div className="icon-wrapper">
                  <input
                    className="step-ilimitado"
                    type="text"
                    maxLength={14} // Limita o comprimento do CPF formatado
                    value={cpf || ""}
                    placeholder="Ilimitado"
                    onChange={(e) => {
                      const formattedCpf = formatCpf(e.target.value);
                      setCpf(formattedCpf); // Atualiza o estado do CPF formatado
                    }}
                  />
                  <AiFillUnlock className="lok-icon" />
                </div>
              </label>
            </form>
          </div>

          <div className="card-icon">
            <h4>Selecione o programa</h4>
            <p>
              Escolha de qual programa de fidelidade você quer vender suas milhas.
              Use apenas contas em seu nome.
            </p>
          </div>
        </div>

        {/* Botão fora do card */}
        <div className="actions-out">
          <button
            type="button"
            className="btn-primary"
            onClick={handleProceed}
            disabled={!selectedProgram}
          >
            Prosseguir →
          </button>
        </div>
      </section>
    </div>
  );
}
