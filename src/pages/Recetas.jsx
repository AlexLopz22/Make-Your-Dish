import '../App.css'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ListaRecetas from '../components/ListaRecetas';

function Recetas() {
    const [recetas, setRecetas] = useState([]);
    const [recetasFiltradas, setRecetasFiltradas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [limite, setLimite] = useState(6);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filtros, setFiltros] = useState({
        dificultad: [],
        tiempo: [],
        ingrediente: "-",
    });
    const [tipoFiltro, setTipoFiltro] = useState('');
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsInitialLoading(true);
            try {
                const [recetasRes, ingredientesRes] = await Promise.all([
                    fetch("https://makeyourdish-api.onrender.com/api/recetas"),
                    fetch("https://makeyourdish-api.onrender.com/api/ingredientes"),
                ]);

                const recetasData = await recetasRes.json();
                const ingredientesData = await ingredientesRes.json();

                setRecetas(recetasData);
                setIngredientes(ingredientesData);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const aplicarFiltros = async () => {
            setIsFiltering(true);
            try {
                let filtradas = [...recetas];

                if (filtros.ingrediente && filtros.ingrediente !== "-") {
                    const res = await fetch(`https://makeyourdish-api.onrender.com/api/recetas/ingrediente/${filtros.ingrediente}`);
                    if (!res.ok) throw new Error("Error al obtener las recetas por ingrediente");
                    filtradas = await res.json();
                }

                if (filtros.tiempo.length > 0) {
                    filtradas = filtradas.filter(receta =>
                        filtros.tiempo.some(filtro => {
                            const minutos = receta.totalTimeMinutes;
                            switch (filtro) {
                                case "menos-20": return minutos < 20;
                                case "entre-20-30": return minutos >= 20 && minutos <= 30;
                                case "entre-30-40": return minutos > 30 && minutos <= 40;
                                case "mas-40": return minutos > 40;
                                default: return true;
                            }
                        })
                    );
                }

                if (filtros.dificultad.length > 0) {
                    filtradas = filtradas.filter(receta => {
                        const dificultad = dificultad_receta(receta.totalTimeMinutes);
                        return filtros.dificultad.some(filtro => {
                            switch (filtro) {
                                case "dificultad-facil": return dificultad === "Fácil";
                                case "dificultad-media": return dificultad === "Media";
                                case "dificultad-dificil": return dificultad === "Difícil";
                                default: return true;
                            }
                        });
                    });
                }

                setRecetasFiltradas(filtradas);
                setTotalPaginas(Math.max(1, Math.ceil(filtradas.length / limite)));
            } catch (error) {
                console.error("Error aplicando filtros:", error);
            } finally {
                setIsFiltering(false);
            }
        };

        aplicarFiltros();
    }, [filtros, recetas]);

    // Cambiar filtros desde UI
    const handleFiltroChange = (e) => {
        const { name, value, checked, type } = e.target;
        const nuevosFiltros = { ...filtros };

        if (type === "checkbox") {
            // Filtrar por dificultad
            if (name.startsWith("dificultad")) {
                nuevosFiltros.dificultad = checked
                    ? [...nuevosFiltros.dificultad, name]
                    : nuevosFiltros.dificultad.filter(f => f !== name);
            }
            // Filtrar por tiempo
            else if (name.startsWith("menos") || name.startsWith("entre") || name.startsWith("mas")) {
                nuevosFiltros.tiempo = checked
                    ? [...nuevosFiltros.tiempo, name]
                    : nuevosFiltros.tiempo.filter(f => f !== name);
            }
        }
        // Filtrar por ingrediente
        else if (type === "select-one") {
            nuevosFiltros.ingrediente = value;
            console.log(value)
        }

        setFiltros(nuevosFiltros);
    };


    // Cambiar el tipo de filtro (Dificultad, Tiempo, Ingrediente)
    const handleTipoFiltroChange = (e) => {
        const selectedFiltro = e.target.value;
        setTipoFiltro(selectedFiltro);

        // Limpiar filtros previos cuando el tipo de filtro cambia
        if (selectedFiltro === "dificultad") {
            setFiltros({
                dificultad: [],
                tiempo: [],
                ingrediente: "-"
            });
        } else if (selectedFiltro === "tiempo") {
            setFiltros({
                dificultad: [],
                tiempo: [],
                ingrediente: "-"
            });
        } else if (selectedFiltro === "ingrediente") {
            setFiltros({
                dificultad: [],
                tiempo: [],
                ingrediente: "-"
            });
        } else {
            setFiltros({
                dificultad: [],
                tiempo: [],
                ingrediente: "-"
            });
        }
    };

    // Dificultad calculada por tiempo
    const dificultad_receta = (minutos) => {
        if (minutos < 20) return "Fácil";
        if (minutos < 40) return "Media";
        return "Difícil";
    };

    // Paginación
    const handlePreviousPage = () => {
        if (pagina > 1) setPagina(pagina - 1);
    };

    const handleNextPage = () => {
        if (pagina < totalPaginas) setPagina(pagina + 1);
    };

    return (
        <>
            <Header />
            <div className='w-full min-h-[500px] p-5 flex flex-col justify-center'>
                <div className='w-4/5 mx-auto p-3'>

                    <div className='text-3xl mb-5'>Recetas</div>

                    {/* Filtros superpuestos SOLO en móviles */}
                    {mostrarFiltros && (
                        <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center lg:hidden">
                            <div className="bg-[var(--color-principal)] text-[var(--color-blanco)] p-5 w-11/12 max-w-md rounded shadow-lg relative">
                                <button
                                    className="absolute top-2 right-2 text-white text-xl"
                                    onClick={() => setMostrarFiltros(false)}
                                >
                                    ✕
                                </button>

                                <form>
                                    <div className='texto-normal mb-2'>Filtrar por:</div>
                                    <select
                                        name="tipo-filtro"
                                        onChange={handleTipoFiltroChange}
                                        value={tipoFiltro}
                                        className='w-full mb-4 bg-[var(--color-principal)] border border-[var(--color-blanco)] p-2'
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="dificultad">Dificultad</option>
                                        <option value="tiempo">Tiempo de preparación</option>
                                        <option value="ingrediente">Ingrediente principal</option>
                                    </select>

                                    <hr className='my-1' />

                                    {/* Filtro por dificultad */}
                                    {tipoFiltro === 'dificultad' && (
                                        <>
                                            <div className='texto-normal'>Dificultad</div>
                                            <ul className='p-4 '>
                                                <li><input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer" name="dificultad-facil" onChange={handleFiltroChange} /> Fácil</li>
                                                <li><input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer" name="dificultad-media" onChange={handleFiltroChange} /> Media</li>
                                                <li><input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer" name="dificultad-dificil" onChange={handleFiltroChange} /> Difícil</li>
                                            </ul>
                                        </>
                                    )}

                                    {/* Filtro por tiempo */}
                                    {tipoFiltro === 'tiempo' && (
                                        <>
                                            <div className='texto-normal'>Tiempo de preparación</div>
                                            <ul className='p-4 space-y-2'>
                                                <li>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            name="menos-20"
                                                            onChange={handleFiltroChange}
                                                            className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                        />
                                                        <span>&lt; 20 minutos</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            name="entre-20-30"
                                                            onChange={handleFiltroChange}
                                                            className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                        />
                                                        <span>20-30 minutos</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            name="entre-30-40"
                                                            onChange={handleFiltroChange}
                                                            className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                        />
                                                        <span>30-40 minutos</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            name="mas-40"
                                                            onChange={handleFiltroChange}
                                                            className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                        />
                                                        <span>&gt; 40 minutos</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </>
                                    )}

                                    {/* Filtro por ingrediente */}
                                    {tipoFiltro === 'ingrediente' && (
                                        <>
                                            <div className='texto-normal'>Ingrediente principal</div>
                                            <ul className='p-4'>
                                                <li>
                                                    <select name="ingrediente-principal" onChange={handleFiltroChange} className='bg-[var(--color-principal)] w-full'>
                                                        <option value="-">-</option>
                                                        {ingredientes.map((ingrediente) => (
                                                            <option key={ingrediente.id} value={ingrediente.id}>
                                                                {ingrediente.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </li>
                                            </ul>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}

                    <div className='flex gap-5'>
                        
                        <div className='hidden lg:block lg:w-1/4 bg-[var(--color-principal)] text-[var(--color-blanco)] p-5 w-1/4'>
                            <form action="#">
                                <div className='texto-normal mb-2'>Filtrar por:</div>

                                {/* Selector para el tipo de filtro */}
                                <select name="tipo-filtro" onChange={handleTipoFiltroChange} value={tipoFiltro} className='w-full mb-4 bg-[var(--color-principal)] border-1 p-2 border-[var(--color-blanco)]'>
                                    <option value="">Selecciona una opción</option>
                                    <option value="dificultad">Dificultad</option>
                                    <option value="tiempo">Tiempo de preparación</option>
                                    <option value="ingrediente">Ingrediente principal</option>
                                </select>

                                <hr className='my-1' />

                                {/* Filtro por dificultad */}
                                {tipoFiltro === 'dificultad' && (
                                    <>
                                        <div className='texto-normal'>Dificultad</div>
                                        <ul className='p-4 '>
                                            <li><input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer" name="dificultad-facil" onChange={handleFiltroChange} /> Fácil</li>
                                            <li><input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer" name="dificultad-media" onChange={handleFiltroChange} /> Media</li>
                                            <li><input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer" name="dificultad-dificil" onChange={handleFiltroChange} /> Difícil</li>
                                        </ul>
                                    </>
                                )}

                                {/* Filtro por tiempo */}
                                {tipoFiltro === 'tiempo' && (
                                    <>
                                        <div className='texto-normal'>Tiempo de preparación</div>
                                        <ul className='p-4 space-y-2'>
                                            <li>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name="menos-20"
                                                        onChange={handleFiltroChange}
                                                        className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                    />
                                                    <span>&lt; 20 minutos</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name="entre-20-30"
                                                        onChange={handleFiltroChange}
                                                        className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                    />
                                                    <span>20-30 minutos</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name="entre-30-40"
                                                        onChange={handleFiltroChange}
                                                        className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                    />
                                                    <span>30-40 minutos</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name="mas-40"
                                                        onChange={handleFiltroChange}
                                                        className="appearance-none w-4 h-4 border border-gray-400 bg-white checked:bg-[var(--color-principal)] rounded-sm cursor-pointer"
                                                    />
                                                    <span>&gt; 40 minutos</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </>
                                )}

                                {/* Filtro por ingrediente */}
                                {tipoFiltro === 'ingrediente' && (
                                    <>
                                        <div className='texto-normal'>Ingrediente principal</div>
                                        <ul className='p-4'>
                                            <li>
                                                <select name="ingrediente-principal" onChange={handleFiltroChange} className='bg-[var(--color-principal)] w-full'>
                                                    <option value="-">-</option>
                                                    {ingredientes.map((ingrediente) => (
                                                        <option key={ingrediente.id} value={ingrediente.id}>
                                                            {ingrediente.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </form>
                        </div>
                        {/* Recetas */}
                        <div className='w-full lg:w-3/4 relative'>
                            {isInitialLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--color-principal)]"></div>
                                </div>
                            ) : isFiltering ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[var(--color-principal)]"></div>
                                </div>
                            ) : (
                                <>
                                    <div
                                        className="absolute left-0 z-20 lg:hidden transition-all duration-300 ease-out"
                                        style={{
                                            top: `${20 + scrollY * 0.95}px`
                                        }}
                                    >
                                        <button
                                            className="bg-[var(--color-principal)] text-[var(--color-blanco)] px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200"
                                            onClick={() => setMostrarFiltros(true)}
                                        >
                                            <img src="/iconos/filtros-icono.webp" alt="Filtro Icono" className='w-8' />
                                        </button>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={recetasFiltradas.length === 0 || recetas.length === 0 ? 'no-recetas' : `pagina-${pagina}-${recetasFiltradas.length}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                            className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 h-full'
                                        >
                                            {(recetasFiltradas.length === 0 || recetas.length === 0) ? (
                                                <div className='col-span-full text-center flex justify-center items-center h-full bg-[#eaf5d4]'>
                                                    No hay recetas disponibles.
                                                </div>
                                            ) : (
                                                <>
                                                    <ListaRecetas
                                                        recetas={recetas}
                                                        recetasFiltradas={recetasFiltradas}
                                                        pagina={pagina}
                                                        limite={limite}
                                                        dificultad_receta={dificultad_receta}
                                                    />
                                                    <div className='text-right w-full col-span-full px-2 texto-normal'>
                                                        <button disabled={pagina === 1} onClick={handlePreviousPage}>&lt;</button>
                                                        {pagina} de {totalPaginas}
                                                        <button disabled={pagina === totalPaginas} onClick={handleNextPage}>&gt;</button>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Recetas;
