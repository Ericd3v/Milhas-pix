
// FILE: src/pages/Step4.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../../assets/lottie/Success Send.json"
import CelebrateAnimation from "../../assets/lottie/Celebrate.json"
import "./style.css";

export default function Step4() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/offers");
    }, 2000);
  };
  
  return (
    <div className="page">
      <section className="content">
        <div className="card success" style={{width:'928px', height:'443px', padding:'16px 16px'}}>
          
          <Player
                    autoplay
                    loop
                    src={CelebrateAnimation}
                    style={{ height: '101px', background:'#ccdcecd2', width: '100px', border:'none', borderRadius: '100%', margin: '0 auto' }}
                />
          
          <div className="text-order" style={{ alignItems:'center', fontWeight:'500', margin:'50px 0 20px 200px', lineHeight:'28px'}}>
              
              <h2 style={{ color:'#1E90FF', width:'490px', height:'28px', fontSize:'28px'}}>Ordem de venda criada com sucesso!</h2>
              
              <p style={{color:'#2E3D50', width:'444px', height:'56px', fontSize:'14px'}} >
                  Agora é só aguardar — assim que suas milhas forem vendidas, o valor
                  será transferido direto para sua conta via Pix.
                </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <button 
              onClick={handleClick}
              disabled={loading}
              style={{
                background:"#1E90FF",
                borderColor:"#1E90FF",
                padding: "10px 24px",
                fontSize: "16px",
                color:"#fff",
                borderRadius:"44px",

                cursor: loading ? "not-allowed" : "pointer",
                position: "relative",
                border: loading ? 'none' : '',
                backgroundColor:loading? '#fff': '#1E90FF'
              }}
            >
              {loading ? (
                
                <Player
                    autoplay
                    loop
                    src={successAnimation}
                    style={{ height: "100px", width: "100%", border:'none', backgroundColor: "#fff", borderRadius: '100%' }}
                />
                
               
              ) : (
                "Ver minhas ofertas → "
              )}
            </button>
         
          </div>
        </div>
      </section>
    </div>
  );
}