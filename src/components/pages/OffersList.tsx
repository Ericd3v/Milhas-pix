// FILE: src/pages/OffersList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import azul from "../../assets/images/azulincon.png";
import smiles from "../../assets/images/smileicon.png";
import { SearchBox } from "../SearchBox/SearchBox";

// Tipagem de cada oferta
type Offer = {
  offerId: string;
  offerStatus: string;
  loyaltyProgram: string;
  offerType: string;
  accountLogin: string;
  createdAt: string;
  availableQuantity: number;
};

// Tipagem do retorno da API
type OffersApiResponse = {
  totalQuantityOffers: number;
  offers: Offer[];
};

export default function OffersList() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filtered, setFiltered] = useState<Offer[]>([]);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  function handleLogo(program: string) {
    switch (program) {
      case "TudoAzul":
        return azul;
      case "Smiles":
        return smiles;
      default:
        return program;
    }
  }

  function handleColorStatus(status: string) {
    switch (status) {
      case "Ativa":
        return {
          color: "#065f46",
          backgroundColor: "#d1fae5",
          padding: "7px",
          borderRadius: "16px",
          width: "60%",
        };
      case "Inativo":
        return {
          color: "#ac0b00ff",
          backgroundColor: "#fcdede",
          padding: "7px",
          borderRadius: "16px",
          width: "60%",
        };
      case "Em Utilizacao":
        return {
          color: "#002040",
          backgroundColor: "#c1d8ee",
          padding: "7px",
          borderRadius: "16px",
          width: "60%",
        };
      default:
        return { color: "black" };
    }
  }

  function handleColorText(program: string) {
    switch (program) {
      case "TudoAzul":
        return {
          color: "#40B6E6",          
        };
      case "Smiles":
        return {
          color: "#F57921",         
        };
      
      default:
        return { color: "black" };
    }
  }

  // Simula a chamada à API para buscar as ofertas
  useEffect(() => {
    fetch("/api/simulate-offers-list")
      .then((r) => r.json())
      .then((data: OffersApiResponse) => {
        setOffers(data.offers || []);
        setFiltered(data.offers || []);
      })
      .catch(() => {
        const fallback = [
          {
            offerId: "1",
            offerStatus: "Inativo",
            loyaltyProgram: "TudoAzul",
            offerType: "Comum",
            accountLogin: "user@example.com",
            createdAt: new Date().toISOString(),
            availableQuantity: 0,
          },
        ];
        setOffers(fallback);
        setFiltered(fallback);
      });
  }, []);
  // Verifica se é mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);


    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    }, [isMobile]);

  // Filtra as ofertas pelo campo de busca
 function handleSearch(query: string) {    
  setSelectedFilter(""); // <-- reseta o select

  if (!query) {
    setFiltered(offers);
    return;
  }

  const lower = query.toLowerCase();
  setFiltered(
    offers.filter(
      (o) =>
        o.loyaltyProgram.toLowerCase().includes(lower) ||
        o.offerStatus.toLowerCase().includes(lower) ||
        o.accountLogin.toLowerCase().includes(lower) ||
        o.offerId.toLowerCase().includes(lower)
    )
  );
}

 function handleFilter(filter: string) {
  setSelectedFilter(filter);

  if (!filter) {
    setFiltered(offers);
    return;
  }

  const lower = filter.toLowerCase();
  setFiltered(
    offers.filter(
      (o) =>
        o.offerStatus.toLowerCase() === lower ||
        o.loyaltyProgram.toLowerCase() === lower
    )
  );
}

 return (
    <>
    {!isMobile ?
    (<div className="page-offers">
      <div className="offers-actions">
        <h2 className="offers-header">Minhas Ofertas</h2>
        <button className="btn-offers" onClick={() => navigate("/")}>
          + Nova Oferta
        </button>
      </div>

      {/* Campo de busca alinhado acima da lista */}
        <div className="container-general">
            <div className="search-offers">
                <h2 className="offers-text">Todas ofertas</h2>
                <div className="offers-filters">
                    <SearchBox placeholder="Login de acesso, ID da oferta..." onSearch={handleSearch}/>
                <select 
                    className="offers-select" 
                    value={selectedFilter} 
                    onChange={(e) => handleFilter(e.target.value)}>
                    <option value="">Filtros</option>
                    <option value="Ativa">Ativa</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Em Utilizacao">Em Utilização</option>
                    <option value="TudoAzul">Tudo Azul</option>
                    <option value="Smiles">Smiles</option>
                </select>

                </div>
            </div>

            <table className="offers-table">
                <thead>
                <tr>
                    <th>Programa</th>
                    <th>Status</th>
                    <th>Id da oferta</th>
                    <th>Login</th>
                    <th>Milhas ofertadas</th>
                    <th>Data</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map((o) => (
                    <tr key={o.offerId}>
                    <td>
                        <div className="container-first-column">
                            <div>
                                <img
                                src={handleLogo(o.loyaltyProgram)}
                                alt={o.loyaltyProgram}                    
                                />
                            
                                <p>
                                <span style={handleColorText(o.loyaltyProgram)}>{o.loyaltyProgram}</span>
                                {o.offerType}
                                </p>
                            </div>                                
                        </div>
                        
                    </td>
                    <td>
                        <p
                        className="status-offers"
                        style={handleColorStatus(o.offerStatus)}
                        >
                        {o.offerStatus}
                        </p>
                    </td>
                    <td>{o.offerId}</td>
                    <td>{o.accountLogin}</td>
                    <td>{o.availableQuantity.toLocaleString("pt-BR") }</td>
                    <td>{new Date(o.createdAt).toLocaleString("pt-BR", {
                        day: '2-digit',
                        month:'short',
                        year:'numeric'
                    })}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filtered.length == 0 && (
                <div>
                    <p>Nenhum dado encontrado</p>
                </div>
            )}
        </div>
    </div>)
         : (
            <div style={{width: '100%',display: 'flex', justifyContent:'center', alignItems:'center', color:'red' }}>
                <p>NOVO COMPONENTE </p>
            </div>
         )}
    </>
  );}