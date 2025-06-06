import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function InformeIngredientes() {
    const { usuario } = useAuth();
    const [ingredientes, setIngredientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function exportarIngredientesPDF(ingredientes) {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Lista de la compra semanal", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [['Ingrediente', 'Cantidad']],
            body: ingredientes.map(([nombre, cantidad, unidad]) => [
                nombre,
                `${cantidad ?? ''} ${unidad ?? ''}`.trim()
            ]),
            styles: { fontSize: 12 },
        });

        doc.save('lista-compra-semanal.pdf');
    }

    useEffect(() => {
        const cargarIngredientes = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`https://makeyourdish-api.onrender.com/api/plan/ingredientes/${usuario.id}`);
                if (!res.ok) throw new Error('Error en la respuesta de la API');
                const data = await res.json();
                setIngredientes(data);
            } catch (err) {
                console.error('Error al cargar ingredientes:', err);
            } finally {
                setIsLoading(false);
            }
        };

        cargarIngredientes();
    }, [usuario.id]);

    return (
        isLoading ? (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[var(--color-principal)]"></div>
            </div>
        ) : (
            <div className="p-4 text-center">
                {ingredientes.length === 0 ? (
                    <p className="text-[var(--color-principal)]">No hay ingredientes planificados para esta semana.</p>
                ) : (
                    <ul className=" pl-5 space-y-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {ingredientes.map((ing, i) => (
                            <li key={i}>- {ing[1]} {ing[2]} de {ing[0].toLowerCase()}</li>
                        ))}
                    </ul>
                )}
                <button
                    onClick={() => exportarIngredientesPDF(ingredientes)}
                    className="bg-[var(--color-principal)] text-white px-4 py-2 rounded mt-4 boton-acceder"
                >
                    Descargar PDF
                </button>
            </div>
        )
    );
}
