import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function InformeIngredientes() {
    const { usuario } = useAuth();
    const [ingredientes, setIngredientes] = useState([]);

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
        fetch(`http://localhost:8080/api/plan/ingredientes/${usuario.id}`)
            .then(res => res.json())
            .then(data => setIngredientes(data))
            .catch(err => console.error('Error al cargar ingredientes:', err));
    }, [usuario.id]);

    return (
        <div className="p-4 text-center">
            {ingredientes.length === 0 ? (
                <p className="text-gray-500">No hay ingredientes planificados para esta semana.</p>
            ) : (
                <ul className="list-disc pl-5 space-y-2 grid grid-cols-2 ">
                    {ingredientes.map((ing, i) => (
                        <div key={i}>- {ing[1]} {ing[2]} de {ing[0].toLowerCase()} </div>
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
    );
}
