import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header'
import Footer from '../components/Footer'

function Usuario() {
    const { usuario } = useAuth(); 

    return (
        <>
            <Header />
            <div className='w-full flex justify-center'>
                <div className='w-2/3 p-5'>
                    <div className='border-[var(--color-principal)] border-2 p-5' >
                        <div className='text-center text-2xl font-bold'>Editar perfil</div>
                        <div>
                            <div className='text-2xl'>Correo: </div>
                            <input className='w-full border-2' type="text" name="correo" id="correo" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Usuario;