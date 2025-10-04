import { useState, useEffect, useContext } from "react";
import { fetchRanking } from "../../services/api";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/currency";
import useDebounce from "../../hooks/useDebounce";
import type { RankingItem } from "../../types";
import RankingList from "../RankingList";
import PillGroup from "../PillGroup";
import "./style.css";
import { MilesContext } from "../../contexts/MilesContext";

export default function Step2() {
  const{navigate} = useContext(MilesContext) 

  const [mileValue, setMileValue] = useState("");
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

    const val = parseCurrencyToNumber(debouncedMileValue);
    if (Number.isNaN(val)) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchRanking(val);
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
    const value = e.target.value.replace(/[^0-9,.]/g, "");
    setMileValue(value);
  };

  const handleBlurValue = () => {
    if (!mileValue) return;
    setMileValue(formatCurrency(mileValue));
  };

  const handleFocusValue = () => {
    const numeric = mileValue.replace(/[^\d.,]/g, "");
    setMileValue(numeric);
  };

  console.log("milhasOfertadas", Number(mileValue), milhasOfertadas);

  const recebaAte = (Number(milhasOfertadas) / 1000) * Number(mileValue);

  console.log("recebaAte", recebaAte);

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
            <p className="card-step2" >Escolha entre R$ 14,00 e R$ 16,56</p>
          </div>
          <form onSubmit={handleProceed} className="form-vertical">
            <label className="step2-label">
              <h3 className="text.label" style={{display:'flex', justifyContent:'space-between', margin:'15px', fontSize:'16px', fontWeight:'500', lineHeight:'130%'}}>Quando deseja receber o pagamento?</h3>
              <PillGroup
                options={["Imediato", "Em 2 dias", "Em 7 dias", "Depois do voo"]}
                selected={selectedOption}
                onSelect={setSelectedOption}
              />
            </label>

          <div className="label-input">
            <label>
              <p>Milhas ofertadas</p>
              <input
                required
                value={milhasOfertadas}
                onChange={(e) =>
                  setMilhasOfertadas(e.target.value.replace(/\D/g, ""))
                }
                placeholder="10.000"
              />
            </label>
            <label>
              <p>Valor a cada 1.000 milhas</p>
              <input
                required
                value={mileValue}
                onChange={handleChangeValue}
                onBlur={handleBlurValue}
                onFocus={handleFocusValue}
                placeholder="R$ 0,00"
              />
            </label>
          </div>
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn"
              >
                ← Voltar
              </button>
              <button type="submit" className="btn-primary">
                Prosseguir →
              </button>
            </div>
          </form>
        </div>

        {/* Coluna Direita */}
        <aside className="card side">
          <h3>Ranking das ofertas</h3>
          <ul className="ranking">
            {loading ? (
              <li className="muted">Carregando...</li>
            ) : (
              <RankingList ranking={ranking} />
            )}
          </ul>
          <div className="receba-ate">
            <strong>Receba até:</strong>{" "}
            <span>{formatCurrency(recebaAte)}</span>
          </div>
        </aside>
      </div>
    </section>
  </div>
  );
}
