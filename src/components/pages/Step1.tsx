import { useContext, useState, useEffect } from "react";
import { MilesContext } from "../../contexts/MilesContext";
import { BsChevronExpand } from "react-icons/bs";
import { AiFillUnlock } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { LuPlus, LuMinus } from "react-icons/lu";

import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";

import "./style.css";

export default function Step1() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showCard, setShowCard] = useState(false);

  const {
    cpf,
    navigate,
    setCpf,
    selectedProgram,
    setSelectedProgram,
  } = useContext(MilesContext);

  const programImages: Record<string, string> = {
    azul,
    smiles,
    pass,
    portugal,
  };

  const handleProceed = () => {
    if (!cpf || cpf.length !== 14) {
      alert("Digite um CPF válido com 11 dígitos e selecione o programa de fidelidade.");
      return;
    }
    navigate("/step-2");
  };

  const formatCpf = (value: string) => {
    const onlyNums = value.replace(/\D/g, "");
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3)}`;
    if (onlyNums.length <= 9)
      return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6)}`;
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6, 9)}-${onlyNums.slice(9, 11)}`;
  };

  // ✅ Detecta mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ====================
  // DESKTOP VERSION
  // ====================
  if (!isMobile) {
    return (
      <div className="page">
        <section className="content-section">
          <div className="step-container">
            <div className="card">
              <div className="card-header">
                <h2 className="text-step">
                  <span className="one">01.</span> Escolha o programa de fidelidade
                </h2>
              </div>

              {/* Programas */}
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
                  <h2 className="text-label">Produto</h2>
                  <div className="select-wrapper">
                    <select className="select-label" defaultValue="liminar">
                      <option value="liminar">Liminar</option>
                      <option value="outro">Outro</option>
                    </select>
                    <BsChevronExpand className="select-icon" />
                  </div>
                </label>

                <label>
                  <h2 className="text-label">CPFs Disponíveis</h2>
                  <div className="icon-wrapper">
                    <input
                      className="step-ilimitado"
                      type="text"
                      maxLength={14}
                      value={cpf || ""}
                      placeholder="Ilimitado"
                      onChange={(e) => setCpf(formatCpf(e.target.value))}
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

  // ====================
  // MOBILE VERSION
  // ====================
  return (
    <div className="page-mobile">
      <section className="content-mobile">
        <div className="card-mobile">
          <div className="header-mobile">
            <h2 className="text-step-mobile">
              <span className="one-mobile">01.</span> Escolha o programa de fidelidade
            </h2>
          </div>

          {/* Seleção de programa */}
          <div className="programs-mobile">
            <FiRefreshCcw className="refresh-icon" />
            <select
              className="program-select-mobile"
              value={selectedProgram ?? ""}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              {Object.keys(programImages).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

            {selectedProgram && (
              <img
                src={programImages[selectedProgram as any]}
                alt={logo}
                className="program-image-mobile"
              />
            )}
          </div>

          {/* Formulário */}
          <form className="form-row-mobile" onSubmit={(e) => e.preventDefault()}>
            <label>
              <h2 className="text-mobile">Produto</h2>
              <div className="select-wrapper-mobile">
                <select className="select-mobile" defaultValue="liminar">
                  <option value="liminar">Liminar</option>
                  <option value="outro">Outro</option>
                </select>
                <BsChevronExpand className="select-icon-mobile" />
              </div>
            </label>

            <label>
              <h2 className="text-mobile-2">CPFs Disponíveis</h2>
              <div className="select-wrapper-mobile">
                <input
                  className="select-mobile"
                  type="text"
                  maxLength={14}
                  value={cpf || ""}
                  placeholder="Ilimitado"
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                />
                <AiFillUnlock className="lok-icon-mobile" />
              </div>
            </label>
          </form>
        </div>
      </section>

      {/* Seletor e Card interativo no rodapé */}
      <div className="space-mobile" onClick={() => setShowCard(!showCard)}>
        <select className="program-selecte-mobile">
          <option value="">Selecione o programa</option>
          <option value="azul">Azul</option>
          <option value="pass">Pass</option>
          <option value="smiles">Smiles</option>
          <option value="portugal">Portugal</option>
        </select>
        {showCard ? <LuMinus className="plus" /> : <LuPlus className="plus" />}
      </div>

      <div className={`card-icon-mobile ${showCard ? "show" : "hide"}`}>
        <h4 className="h4-mobile">Selecione o programa</h4>
        <p className="p-mobile">
          Escolha de qual programa de fidelidade você quer vender suas milhas.
          Use apenas contas em seu nome.
        </p>
      </div>
    </div>
  );
}
