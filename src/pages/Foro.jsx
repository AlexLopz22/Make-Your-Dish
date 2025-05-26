import '../App.css';

import Header from '../components/Header'


function Foro() {

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex-1 w-full bg-[var(--color-principal)] text-[var(--color-blanco)] flex items-center justify-center text-center text-3xl">
                    Pronto disponible...
                </div>
            </div>
        </>
    );
}

export default Foro;