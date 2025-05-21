import '../App.css';
import Footer from '../components/Footer'
import Header from '../components/Header'
import Calendario from '../components/CalendarioSemanal'
import InformeIngredientes from '../components/InformeIngredientes'


function Plan() {

    return (
        <>
            <Header />
            <div className='w-full flex justify-center p-5'>
                <div className='w-3/4 p-5 '>
                    <div className='text-2xl'>
                        - Plan Semanal
                    </div>
                    <div>
                        <Calendario/>
                    </div>
                    <div className='text-2xl mt-8'>
                        - Informe Ingredientes
                    </div>
                    <div>
                        <InformeIngredientes/>
                    </div>
                </div>
            </div>  
            <Footer/>
        </>
    );
}

export default Plan;