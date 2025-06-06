import '../App.css'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

function Receta() {
    const { usuario } = useAuth();
    const { recetaid } = useParams();
    const [receta, setReceta] = useState(null);
    const [ingredientes, setIngredientes] = useState([]);
    const [pasos, setPasos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [showModal, setShowModal] = useState(false); // nuevo
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const datosPlan = {
            usuarioId: usuario.id,
            dia: e.target.diaSemana.value,
            recetaId: receta.id.toString()
        };

        try {
            const respuesta = await fetch("https://makeyourdish-api.onrender.com/api/plan/asignar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosPlan)
            });

            const texto = await respuesta.text();

            if (respuesta.ok) {
                navigate('/plan', { state: { mensaje: "Receta agregada correctamente." } });
                setTimeout(() => alert("Receta agregada correctamente."), 100);
            } else {
                alert("Error: Dia de la semana ya ocupado");
            }
        } catch (error) {
            console.error("Error al agregar al plan:", error);
            alert("Hubo un error al agregar al plan.");
        } finally {
            setIsSubmitting(false);  
        }
    };

    useEffect(() => {
        const fetchRecetaCompleta = async () => {
            if (!recetaid) return;

            setCargando(true);

            try {
                // Fetch receta
                const recetaRes = await fetch(`https://makeyourdish-api.onrender.com/api/receta/${recetaid}`);
                const recetaData = await recetaRes.json();
                if (recetaData && Object.keys(recetaData).length > 0) {
                    setReceta(recetaData);
                } else {
                    setReceta(null);
                }

                // Fetch ingredientes
                try {
                    const ingredientesRes = await fetch(`https://makeyourdish-api.onrender.com/api/receta/ingredientes/${recetaid}`);
                    const ingredientesData = await ingredientesRes.json();
                    setIngredientes(ingredientesData);
                } catch (error) {
                    console.error('Error al cargar los ingredientes:', error);
                }

                // Fetch pasos
                try {
                    const pasosRes = await fetch(`https://makeyourdish-api.onrender.com/api/receta/pasos/${recetaid}`);
                    const pasosData = await pasosRes.json();
                    setPasos(pasosData);
                } catch (error) {
                    console.error('Error al cargar los pasos:', error);
                }

            } catch (error) {
                console.error('Error al cargar la receta:', error);
                setReceta(null);
            } finally {
                setCargando(false);
            }
        };

        fetchRecetaCompleta();
    }, [recetaid]);



    useEffect(() => {
        if (!cargando && receta === null) {
            navigate('/recetas', { state: { mensaje: "Receta no encontrada." } });
            setTimeout(() => alert("Receta no encontrada."), 100);
        }
    }, [receta, cargando, navigate]);

    if (!receta) return null;

    return (
        <>
            <Header />
            <div className='w-full min-h-[500px] flex items-center p-10 flex-col'>
                {cargando ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[var(--color-principal)]"></div>
                    </div>
                ) : (
                    <>
                        <div className='w-4/5 flex justify-between relative'>
                            {/* Imagen pequeña que abre modal */}
                            <div
                                className="w-1/4 h-160 overflow-hidden cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                <img
                                    src={receta.image_url}
                                    alt="Foto de la Receta"
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>

                            {/* Modal grande */}
                            {showModal && (
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                                    onClick={() => setShowModal(false)}
                                >
                                    <img
                                        src={receta.image_url}
                                        alt="Foto grande"
                                        className="max-w-full max-h-full"
                                    />
                                </div>
                            )}

                            {/* Detalles de la receta */}
                            <div className='w-3/4 p-8 flex flex-col justify-around'>
                                <div className='text-5xl text-center'>{receta.title}</div>
                                <div className='mt-5 flex justify-between gap-3'>
                                    <div className='w-1/2 text-center'>
                                        <div className='text-3xl underline'>Ingredientes:</div>
                                        {ingredientes.map((ingrediente) => (
                                            ingrediente.cantidad === "al gusto" ? (
                                                <div key={ingrediente.id}>- {ingrediente.name} </div>
                                            ) : (
                                                <div key={ingrediente.id}>- {ingrediente.cantidad} de {ingrediente.name.toLowerCase()} </div>
                                            )
                                        ))}
                                    </div>
                                    <div className='w-1/2 text-center'>
                                        <div className='text-3xl underline'>Información:</div>
                                        <div>- Tiempo de preparación: {receta.prepTimeMinutes} min</div>
                                        <div>- Tiempo de cocinado: {receta.cookTimeMinutes} min</div>
                                        <div>- Tiempo total: {receta.totalTimeMinutes} min</div>
                                        <div>- Raciones: {receta.servings}</div>
                                        <div>- Categoría: {receta.category}</div>
                                        <div>- Tipo de Cocina: {receta.cuisine}</div>
                                        <div>- Calorías por ración: {receta.caloriesPerServing} kcal</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulario Añadir al plan semanal */}
                        <div className='p-6 w-1/4 min-w-96'>
                            <div className='text-3xl text-center'>Añadir al plan semanal</div>
                            <div className='flex justify-between items-center p-3'>
                                <form onSubmit={handleSubmit} className='flex w-full justify-between items-center gap-4'>
                                    <div className='text-2xl'>
                                        <div>Día</div>
                                        <select name="diaSemana" id="diaSemana" className='texto-normal border-1'>
                                            <option value="Lunes">Lunes</option>
                                            <option value="Martes">Martes</option>
                                            <option value="Miércoles">Miércoles</option>
                                            <option value="Jueves">Jueves</option>
                                            <option value="Viernes">Viernes</option>
                                            <option value="Sábado">Sábado</option>
                                            <option value="Domingo">Domingo</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[var(--color-principal)] boton-acceder text-[var(--color-blanco)] px-3 py-1 text-center rounded-2xl"
                                    >
                                        {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Pasos para hacer la receta */}
                        <div className='p-6 w-full'>
                            <div className='text-3xl text-center'>Pasos para hacer {receta.title.toLowerCase()}:</div>
                            <div className='p-5 grid grid-cols-2 gap-5'>
                                {pasos.map((paso) => (
                                    <div className='items-center mb-4' key={paso.id.numPaso}>
                                        <div className='text-center mx-auto mb-2 w-3/4'>
                                            <b>- Paso {paso.id.numPaso}:</b> {paso.descripcion}
                                        </div>
                                        <div className='flex justify-center'>
                                            <img src={paso.imagenUrl} alt="Imagen paso" className="max-w-full w-3/4 h-auto" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Receta;
