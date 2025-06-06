import '../App.css';
import Footer from '../components/Footer'
import Header from '../components/Header'
import Calendario from '../components/CalendarioSemanal'
import InformeIngredientes from '../components/InformeIngredientes'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Plan() {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario === null) {
             navigate('/login', { state: { mensaje: "Se necesita iniciar sesión para acceder a esta sección." } });

            setTimeout(() => alert("Se necesita iniciar sesión para acceder a esta sección."), 100);
        }
    }, [usuario, navigate]);

    if (usuario === null) {
        return null;
    }
    return (
        <>
            <Header />
            <div className='w-full min-h-[500px] flex justify-center p-5'>
                <div className='w-3/4 p-5 '>
                    <div className='text-2xl'>
                        - Plan Semanal
                    </div>
                    <div>
                        <Calendario />
                    </div>
                    <div className='text-2xl mt-8'>
                        - Informe Ingredientes
                    </div>
                    <div>
                        <InformeIngredientes />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Plan;