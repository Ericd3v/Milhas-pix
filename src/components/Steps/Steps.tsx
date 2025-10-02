import { Link } from "react-router-dom";
import type { Step, MenuProps } from "../../types/MenuProps";
import "./style.css";

export default function Steps({ current }: MenuProps) {
  const items: Step[] = [
    { label: "Passo 1", description: "Escolha a companhia", path: "/" },
    { label: "Passo 2", description: "Ofereça suas milhas", path: "/step-2" },
    { label: "Passo 3", description: "Insira os dados", path: "/step-3" },
    { label: "Passo 4", description: "Pedido finalizado", path: "/step-4" },
  ];

  return (
    <div className="menu-container">
      <div className="menu-circles">
        {items.map((item, index) => {
          const isActive = current === index + 1;
          const isCompleted = current > index + 1;

          return (
            <div
              key={index}
              className={`menu-item ${isActive ? "current-menu" : ""}`}
            >
              <Link to={item.path}>
                <div
                  className={`circle ${current >= index + 1 ? "active" : ""}`}
                >
                  <p />
                </div>

                <div
                  className={`menu-label ${
                    current >= index + 1 ? "active" : ""
                  }`}
                >
                  <p>
                    <span>{item.label}</span>
                  </p>
                  <p>{item.description}</p>
                </div>
              </Link>

              {index < items.length - 1 && (
                <div className={`line ${isCompleted ? "active" : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}