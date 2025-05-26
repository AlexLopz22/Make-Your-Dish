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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datosPlan = {
            usuarioId: usuario.id,
            dia: e.target.diaSemana.value,
            recetaId: receta.id.toString()
        };

        try {
            const respuesta = await fetch("http://localhost:8080/api/plan/asignar", {
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
                alert("Error: " + texto);
            }
        } catch (error) {
            console.error("Error al agregar al plan:", error);
            alert("Hubo un error al agregar al plan.");
        }
    };

    useEffect(() => {
        if (recetaid) {
            fetch(`http://localhost:8080/api/receta/${recetaid}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data && Object.keys(data).length > 0) {
                        setReceta(data);
                    } else {
                        setReceta(null); 
                    }
                    setCargando(false);
                })
                .catch(error => {
                    console.error('Error al cargar la receta:', error);
                    setReceta(null);
                    setCargando(false);
                });

            fetch(`http://localhost:8080/api/receta/ingredientes/${recetaid}`)
                .then(response => response.json())
                .then(data => setIngredientes(data))
                .catch(error => console.error('Error al cargar los ingredientes:', error));

            fetch(`http://localhost:8080/api/receta/pasos/${recetaid}`)
                .then(response => response.json())
                .then(data => setPasos(data))
                .catch(error => console.error('Error al cargar los pasos:', error));
        }
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
            <div className='w-full flex items-center p-10 flex-col'>
                <div className='w-4/5 flex justify-between'>
                    <div className="w-1/4 h-160 overflow-hidden cursor-pointer" onClick={() => setShowModal(true)}>
                        <img
                            src={receta.image_url}
                            alt="Foto de la Receta"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setShowModal(false)}>
                            <img
                                src={receta.image_url}
                                alt="Foto grande"
                                className="max-w-full max-h-full"
                            />
                        </div>
                    )}
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
                                <div>- Calorias por ración: {receta.caloriesPerServing} kcal</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-6 w-1/4 min-w-96'>
                    <div className='text-3xl text-center'>Añadir al plan semanal</div>
                    <div className='flex justify-between items-center p-3'>
                        <form onSubmit={handleSubmit} className='flex w-full justify-between items-center gap-4'>
                            <div className='text-2xl'>
                                <div>Día</div>
                                <select name="diaSemana" id="diaSemana" className='texto-normal '>
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
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
                <div className='p-6'>
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
            </div >
            <Footer />
        </>
    );
}

export default Receta;
