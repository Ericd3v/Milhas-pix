import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRanking } from "../../services/api";
import { formatCurrency, parseCurrencyToNumber } from "../../utils/currency";
import useDebounce from "../../hooks/useDebounce";
import type { RankingItem } from "../../types";
import RankingList from "../RankingList";
import PillGroup from "../PillGroup";
import "./style.css";

export default function Step2() {
  const navigate = useNavigate();

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
    <div className="page">
      <section className="content two-col">
        <div className="card main">
          <h2>02. Ofereça suas milhas</h2>

          <form onSubmit={handleProceed} className="form-vertical">
            <label>
              Quero receber
              <PillGroup
                options={[
                  "Imediato",
                  "em 2 dias",
                  "em 7 dias",
                  "Depois do voo",
                ]}
                selected={selectedOption}
                onSelect={setSelectedOption}
              />
            </label>

            <label>
              Milhas ofertadas
              <input required
                value={milhasOfertadas}
                onChange={(e) =>
                  setMilhasOfertadas(e.target.value.replace(/\D/g, ""))
                }
                placeholder="10.000"
              />
            </label>

            <label>
              Valor a cada 1.000 milhas
              <input required
                value={mileValue}
                onChange={handleChangeValue}
                onBlur={handleBlurValue}
                onFocus={handleFocusValue}
                placeholder="R$ 0,00"
              />
            </label>

            <div className="receba-ate">
              <strong>Receba até: </strong>
              {formatCurrency(recebaAte)}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn"
              >
                ← Voltar
              </button>
              <button type="submit" className="btn primary">
                Prosseguir →
              </button>
            </div>
          </form>
        </div>

        <aside className="card side">
          <h3>Ranking das ofertas</h3>
          <ul className="ranking">
            {loading ? (
              <li className="muted">Carregando...</li>
            ) : (
              <RankingList ranking={ranking} />
            )}
          </ul>
        </aside>
      </section>
    </div>
  );
}
