import type { RankingItem } from "../../types";

export default function RankingList({ ranking }: { ranking: RankingItem[] }) {
  if (!ranking.length) {
    return <li className="muted">Digite um valor para atualizar o ranking</li>;
  }

  return (
    <>
      {ranking.map((r) => (
        <li
          key={r.position}
          className={
            r.description.toLowerCase().includes("sua oferta")
              ? "highlight"
              : undefined
          }
          
        >
           <strong style={{color:''}}>{r.position}º </strong>
          <span>R$ {r.mile_value.toFixed(2)}</span>
          {r.description.toLowerCase().includes("sua oferta") && (
            <span className="ranking-tag">Você</span>
          )}
        </li>
      ))}
    </>
  );
}

