import { useNavigate } from "react-router-dom";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";
import { BsChevronExpand } from "react-icons/bs";
import { AiFillUnlock } from "react-icons/ai";
import "./style.css";
export default function Step1() {
  const navigate = useNavigate();

return (
    <div className="page">

      {/* Conteúdo principal */}
      <section className="content">
       <h2 className="text-step1"> <span className="one">01.</span> Escolha o programa de fidelidade</h2>
      
        <div className="card">
          <div className="programs">
            <button id="btn-programs"><img src={azul} alt="Azul" /></button>
            <button id="btn-programs"><img src={smiles} alt="Smiles" /></button>
            <button id="btn-programs"><img src={pass} alt="Latam Pass" /></button>
            <button id="btn-programs"><img src={portugal} alt="TAP" /></button>
          </div>

          <form
            className="form-row"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/step-2");
            }}
          >
          <label>
            <h2>Produto</h2>
            <div className="select-wrapper">
              <select className="select-label" defaultValue="liminar">
                <option  value="liminar">Liminar</option>
                <option  value="outro">Outro</option>
              </select>
              <BsChevronExpand className="select-icon" style={{color:'##029DF7', boxShadow:'5px #029DF7'}} />
            </div>
          </label>

            <label>
              <h2>CPFs Disponíveis</h2>
              <div className="lok-wrapper">
                <input
                  className="step-ilimitado"
                  type="text"
                  maxLength={11}
                  placeholder="Ilimitado"
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/\D/g, ""); // só números
                  }}
                />
                <AiFillUnlock className="input-icon" />
              </div>
            </label>
            <div className="actions">
              <button type="submit" className="btn-primary">
                Prosseguir →
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}