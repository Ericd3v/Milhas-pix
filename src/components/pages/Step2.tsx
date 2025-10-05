import { useState, useEffect, useContext } from "react";
import { fetchRanking } from "../../services/api";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/currency";
import useDebounce from "../../hooks/useDebounce";
import type { RankingItem } from "../../types";
import RankingList from "../RankingList";
import PillGroup from "../PillGroup";
import { PiAirplaneInFlight } from "react-icons/pi";
import { FaAnglesDown } from "react-icons/fa6";
import "./style.css";
import { MilesContext } from "../../contexts/MilesContext";
import React from 'react';


export default function Step2() {
  const { navigate } = useContext(MilesContext);

  const [mileValue, setMileValue] = useState<number | "">("");
  const [displayMileValue, setDisplayMileValue] = useState("");
  const [milhasOfertadas, setMilhasOfertadas] = useState("");
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("Imediato");

  const debouncedMileValue = useDebounce(mileValue, 500);

  useEffect(() => {
    if (!debouncedMileValue) {
      setRanking([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchRanking(Number(debouncedMileValue));
        setRanking(data);
      } catch (err) {
        console.error("Erro ao buscar ranking", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedMileValue]);

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/step-3");
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = parseCurrencyToNumber(e.target.value);

    if (!Number.isNaN(numeric)) {
      setMileValue(numeric);
      setDisplayMileValue(e.target.value);
    } else {
      setMileValue(0);
      setDisplayMileValue(e.target.value);
    }
  };

  // quando o usuário foca (remove formatação para editar)
  const handleFocusValue = () => {
    setDisplayMileValue(mileValue ? mileValue.toString() : "");
  };

  const handleBlurValue = () => {
    if (mileValue !== "") {
      setDisplayMileValue(formatCurrency(mileValue));
    }
  };

  return (
    <div className="page step2">
      <section className="content">
        <div className="two-col">
          {/* Coluna Esquerda */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-step2">
                <span className="one">02.</span> Oferte suas milhas
              </h2>
              <p className="card-step2">Escolha entre R$ 14,00 e R$ 16,56</p>
            </div>

            <form onSubmit={handleProceed} className="form-vertical">
              <label className="step2-label">
                <h3
                  className="text.label"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "15px",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "130%",
                  }}
                >
                  Quando deseja receber o pagamento?
                </h3>
                <PillGroup
                  options={[
                    "Imediato",
                    "Em 2 dias",
                    "Em 7 dias",
                    "Depois do voo",
                  ]}
                  selected={selectedOption}
                  onSelect={setSelectedOption}
                />
              </label>

              <div className="label-input">
                <label>
                  <p>Milhas ofertadas</p>
                  <div className="input-icon-wrapper">
                    <input
                    style={{border:'solid 1px #ccc'}}
                      required
                      value={milhasOfertadas}
                      onChange={(e) =>
                        setMilhasOfertadas(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="10.000"
                    />
                    <PiAirplaneInFlight className="airplane-icon" />
                  </div>
                </label>

                <label>
                <p>Valor a cada 1.000 milhas</p>
                <div className="input-icon-wrapper">
                  <span className="real-icon">R$</span>
                  <input
                    type="tel"
                    className="input-with-icon"
                    required
                    value={displayMileValue}
                    onChange={handleChangeValue}
                    onBlur={handleBlurValue}
                    onFocus={handleFocusValue}
                    placeholder="0,00"
                  />
                  <FaAnglesDown className="dropdown-icon" />
                </div>                
              </label>
              </div>
            </form>
            <label>
                <div className="checkbox-container">
                    <input type="checkbox" />
                      <span className="slider">
                    </span>
                    <h3 style={{color:'#ccc', fontWeight:'500',margin:'14px 0 12px 2px', width:'299px', height:'21px', fontSize:'16px'}}>Definir média de milhas por passageiro</h3>
                </div>
              </label>
               <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="btn"
                >
                  ← Voltar
                </button>
                <button type="submit" className="btn-primary"
                  onClick={() => navigate("/Step-3")}
>
                  Prosseguir →
                </button>
              </div>
          </div>
          
          
            <div className="row">
              <div className="card-row">
            <h4>Média de milhas</h4>
            <p>
             Ao vender mais de 20.000 milhas, ative as Opções Avançadas para definir a média de milhas por emissão.
            </p>
          </div>
              <h2 className="ranking-text" style={{fontWeight:'500', border:'none', textShadow:'none', color:'#2E3D50'}} >Ranking das ofertas</h2>
              <table> 
                <td className="card side">
                  <tr className="ranking">
                    {loading ? (
                      <td  className="muted">Carregando...</td>
                      ) : (
                          <RankingList ranking={ranking} />
                      )}    
                  </tr> {/* tr card side*/} 
                  </td > {/* ranking-text*/}
              </table>

               <h2 style={{ textAlign:'left',fontWeight:'500', margin:'12px 12px 12px', borderTop:'solid 1px #ccc'}} >
                    Receba até:{" "}
                </h2>
              <div className="receba-ate"> 
                 <span>
                    {formatCurrency(Number(milhasOfertadas) * Number(mileValue))}
                  </span>
                  
                </div> {/* div receba-ate*/}
            </div> {/* div row*/}
          
        </div>
       
      </section>
      
    </div>
  );
}