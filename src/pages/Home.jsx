import React, { useState, useEffect } from 'react';
import '../App.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const fondos = [
        { id: 'fondo-1', src: '/fondos/fondo-principal-1.webp', title: 'Elige tus recetas', description: '¡Quédate con las recetas que más te gusten y alterna entre ellas!' },
        { id: 'fondo-2', src: '/fondos/fondo-principal-2.webp', title: 'Planifica tu semana', description: 'Organízate la semana con nuestras recetas' },
        { id: 'fondo-3', src: '/fondos/fondo-principal-3.webp', title: 'Gestiona tus valores nutricionales', description: 'Visualiza tus consumos de forma simple y clara' }
    ];

    const showNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % fondos.length);
    };

    const showPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + fondos.length) % fondos.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % fondos.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
                        <div className="relative w-full h-full p-4 md:p-8">
                            <img
                                src={fondo.src}
                                alt={`Imagen de fondo ${fondo.id}`}
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />

                            {/* Contenido */}
                            <div className="flex flex-row w-full h-full justify-between items-center relative z-10">

                                {/* Botón izquierdo */}
                                <div className="flex-1 flex justify-start pl-2 sm:pl-4">
                                    <button
                                        className="bg-[var(--color-principal)] text-white px-3 py-1 rounded-lg"
                                        onClick={showPrevSlide}
                                    >
                                        <img src="/iconos/flecha-izquierda-icono.webp" alt="Flecha izquierda" className="h-5" />
                                    </button>
                                </div>

                                {/* Texto central */}
                                <div className="flex-1 text-center px-2 sm:px-6">
                                    <div className="text-[var(--color-principal)]">
                                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-shadow-lg leading-tight">
                                            {fondo.title}
                                        </h2>
                                        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-shadow-md">
                                            {fondo.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Botón derecho */}
                                <div className="flex-1 flex justify-end pr-2 sm:pr-4">
                                    <button
                                        className="bg-[var(--color-principal)] text-white px-3 py-1 rounded-lg"
                                        onClick={showNextSlide}
                                    >
                                        <img src="/iconos/flecha-derecha-icono.webp" alt="Flecha derecha" className="h-5" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full p-5 flex justify-center">
                <div className="w-full md:w-4/5 p-2 flex flex-col justify-center">

                    {/* Título y descripción */}
                    <div className="text-2xl md:text-3xl font-medium text-center md:text-left">
                        Bienvenidos a Make Your Dish
                    </div>
                    <div className="mt-3 texto-normal text-justify">
                        En Make Your Dish estamos comprometidos con brindarte herramientas prácticas y efectivas para que puedas planificar tus comidas de forma organizada...
                    </div>

                    {/* Sección 1: Imagen izquierda, texto derecha */}
                    <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mt-10 self-center md:gap-5">
                        <div className="w-full md:w-1/2 p-5">
                            <img src="/imagenes/comida-1.webp" alt="Plato de salmón" className="w-full h-auto" />
                        </div>
                        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center">
                            <div className="texto-normal mb-3">Elige las recetas</div>
                            <div>Puedes decidir las recetas según tus gustos o los ingredientes que tengas en casa...</div>
                        </div>
                    </div>

                    {/* Sección 2: Texto izquierda, imagen derecha */}
                    <div className="flex flex-col md:flex-row-reverse justify-between w-full md:w-3/4 mt-10 self-center md:gap-5">
                        <div className="w-full md:w-1/2 p-5">
                            <img src="/imagenes/semana-1.webp" alt="Calendario" className="w-full h-auto" />
                        </div>
                        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center">
                            <div className="texto-normal mb-3">Organízate la semana</div>
                            <div>Estructura tu semana según las recetas que elijas...</div>
                        </div>
                    </div>

                    {/* Sección 3: Imagen izquierda, texto derecha */}
                    <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mt-10 self-center md:gap-5">
                        <div className="w-full md:w-1/2 p-5">
                            <img src="/imagenes/lista-compra.webp" alt="Lista de la compra" className="w-full h-auto" />
                        </div>
                        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center">
                            <div className="texto-normal mb-3">No hagas la lista de la compra</div>
                            <div>Con nuestro sistema no te preocupes por hacer la lista de la compra...</div>
                        </div>
                    </div>

                </div>
            </div>


            <Footer />
        </>
    );
}

export default Home;
