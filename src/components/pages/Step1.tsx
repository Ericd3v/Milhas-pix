import { useNavigate } from "react-router-dom";
import azul from "../../assets/images/azul.png";
import smiles from "../../assets/images/smiles.png";
import portugal from "../../assets/images/portugal.png";
import pass from "../../assets/images/pass.png";
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
            <button><img src={azul} alt="Azul" /></button>
            <button><img src={smiles} alt="Smiles" /></button>
            <button><img src={pass} alt="Latam Pass" /></button>
            <button><img src={portugal} alt="TAP" /></button>
          </div>

          <form
            className="form-row"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/step-2");
            }}
          >
            <label>
              Produto
              <select defaultValue="liminar" >
                <option value="liminar">Liminar</option>
                <option value="outro">Outro</option>
              </select>
            </label>

            <label>
              CPFs Disponíveis
              <input className="step-ilimitado" placeholder="Ilimitado" required />
            </label>

            <div className="actions">
              <button type="submit" className="btn primary">
                Prosseguir →
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}