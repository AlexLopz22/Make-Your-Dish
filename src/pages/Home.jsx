import React, { useState } from 'react';
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
                                        <img src="/iconos/flecha-izquierda-icono.webp" alt="Flecha hacia la izquierda" className="h-5" />
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
                                        <img src="/iconos/flecha-derecha-icono.webp" alt="Flecha hacia la derecha" className="h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full p-5 flex justify-center">
                <div className='w-2/3 p-2 flex flex-col justify-center'>
                    <div className='text-3xl font-medium'>Bienvenidos a Make Your Dish</div>
                    <div className='mt-3 texto-normal'>
                        En Make Your Dish estamos comprometidos con brindarte herramientas prácticas y efectivas para que puedas planificar tus comidas de forma organizada,
                        saludable y adaptada a tus necesidades. Sabemos lo importante que es mantener un equilibrio nutricional en el día a día, por eso te ayudamos a diseñar
                        tu menú semanal con propuestas variadas, balanceadas y personalizadas.
                    </div>
                    <div className='flex justify-between w-3/4 mt-10 self-center'>
                        <div className='w-1/2 p-5'><img src="/imagenes/comida-1.webp" alt="Plato de salmón" /></div>
                        <div className='w-1/2 p-5 flex flex-col justify-center'>
                            <div className='texto-normal mb-3'>Elige las recetas</div>
                            <div>Puedes decidir las recetas segun tus gustos o según los ingredientes que tengas en tu casa. También puedes elegir el nivel de dificultad de las mismas o según tiempo que necesitas para hacerlas.</div>
                        </div>
                    </div>
                    <div className='flex justify-between w-3/4 mt-10 self-center'>
                        <div className='w-1/2 p-5 flex flex-col justify-center'>
                            <div className='texto-normal mb-3'>Organízate la semana</div>
                            <div>Estructura tu semana según las recetas que eligas, para facilitarte la labor de pensar en las comidas y solo tener que preocuparte de serguir los pasos de cada receta.</div>
                        </div>
                        <div className='w-1/2 p-5'><img src="/imagenes/semana-1.webp" alt="Calendario" /></div>
                    </div>
                    <div className='flex justify-between w-3/4 mt-10 self-center'>
                        <div className='w-1/2 p-5'><img src="/imagenes/lista-compra.webp" alt="Lista de la compra" /></div>
                        <div className='w-1/2 p-5 flex flex-col justify-center'>
                            <div className='texto-normal mb-3'>No hagas la lista de la compra</div>
                            <div>Con nuestro sistema no te preocupes por hacer la lista de la compra, nosotros calcularemos las cantidades que necesitas de cada alimento para poder ejecutar las recetas que planifiques.</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
