import '../App.css'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';

function Receta() {
    const { recetaid } = useParams();
    const [receta, setReceta] = useState();
    const [ingredientes, setIngredientes] = useState([]);

    useEffect(() => {
        if (recetaid) {
            fetch(`http://localhost:8080/api/receta/${recetaid}`)
                .then(response => response.json())
                .then(data => {
                    setReceta(data);
                })
                .catch(error => console.error('Error al cargar la receta:', error));

            fetch(`http://localhost:8080/api/receta/ingredientes/${recetaid}`)
                .then(response => response.json())
                .then(data => {
                    setIngredientes(data);
                })
                .catch(error => console.error('Error al cargar la receta:', error));
        }
    }, []);

    if (!receta) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Header />
            <div className='w-full flex justify-center p-10'>
                <div className='w-4/5 flex justify-between'>
                    <img src={receta.image_url} alt="Foto de la Receta" className='w-1/4 h-160 object-cover' />
                    <div className='w-3/4 p-8'>
                        <div className='text-5xl text-center'>{receta.title}</div>
                        <div className='mt-5 flex justify-between gap-3'>
                            <div className='w-1/2'>
                                <div className='text-3xl underline'>Ingredientes:</div>
                                {ingredientes.map((ingrediente) => (
                                    ingrediente.cantidad === "al gusto" ? (
                                        <div key={ingrediente.id}>- {ingrediente.name} </div>
                                    ) : (
                                        <div key={ingrediente.id}>- {ingrediente.cantidad} de {ingrediente.name.toLowerCase()} </div>
                                    )
                                ))}
                            </div>
                            <div className='w-1/2'>
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
            </div >
            <Footer />
        </>
    );
}

export default Receta;
