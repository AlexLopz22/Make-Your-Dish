import React, { useState } from 'react';
import '../App.css'
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0); 
    const fondos = [
        { id: 'fondo-1', src: './fondo-principal-1.jpg', title: 'Elige tus recetas', description: '¡Quédate con las recetas que más te gusten y alterna entre ellas!' },
        { id: 'fondo-2', src: './fondo-principal-2.jpg', title: 'Planifica tu semana', description: 'Organízate la semana con nuestras recetas' },
    ];

    const showNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % fondos.length);
    };

    const showPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + fondos.length) % fondos.length);
    };

    return (
        <>
            <Header />
            <div id="carrusel" className="relative w-full h-[700px] overflow-hidden">
                {fondos.map((fondo, index) => (
                    <div
                        key={fondo.id}
                        id={fondo.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="relative w-full h-full p-8">
                            <img
                                src={fondo.src}
                                alt={`Imagen de fondo ${fondo.id}`}
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                            <div className="flex w-full h-full justify-between items-center relative z-10">
                                <div className="flex-1">
                                    <button
                                        className="bg-[var(--color-principal)] text-white px-3 py-1 rounded-lg"
                                        onClick={showPrevSlide}
                                    >
                                        <img src="./flecha-izquierda-icono.png" alt="Flecha hacia la izquierda" className="h-5" />
                                    </button>
                                </div>

                                <div className="flex-1 text-center">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[var(--color-principal)]">
                                        <h2 className="text-7xl font-bold text-shadow-lg">{fondo.title}</h2>
                                        <p className="mt-2.5 text-3xl text-shadow-md">{fondo.description}</p>
                                    </div>
                                </div>

                                <div className="flex-1 text-right">
                                    <button
                                        className="bg-[var(--color-principal)] text-white px-3 py-1 rounded-lg"
                                        onClick={showNextSlide}
                                    >
                                        <img src="./flecha-derecha-icono.png" alt="Flecha hacia la derecha" className="h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full h-20"></div>
            <Footer />
        </>
    );
}

export default Home;
