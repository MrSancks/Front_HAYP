import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TablaCombinaciones = ({ combinaciones }) => {
    
    const parsedCombinaciones = combinaciones.split('\n\n').map(combinacion => {
        const lines = combinacion.split('\n');
        const componentes = lines.slice(0, -1).map(line => {
            const [nombre, precio] = line.split(': ');
            return { nombre: nombre.trim(), precio: parseFloat(precio) };
        });
        const total = componentes.reduce((accum, current) => accum + current.precio, 0).toFixed(2);
        return { componentes, total };
    });
    
    return (
        <div>
            <h2>Combinaciones de Componentes</h2>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Componentes</th>
                        <th className="px-4 py-2">Precio</th>
                        <th className="px-4 py-2">Precio Total</th>
                        <th className="px-4 py-2">Links</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedCombinaciones.map((combinacion, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">
                                <ul>
                                    {combinacion.componentes.map((componente, idx) => (
                                        <li key={idx}>{componente.nombre}</li>

                                    ))}                               
                                </ul>
                            </td>
                            <td className="border px-4 py-2">
                                <ul>
                                    {combinacion.componentes.map((componente, idx) => (
                                        <li key={idx}>{componente.precio}</li>

                                    ))}
                                </ul>
                            </td>
                            <td className="border px-4 py-2">{combinacion.total}</td>
                            <td className="border px-4 py-2">
                                <ul>
                                    {combinacion.componentes.map((componente, idx) => (
                                        <li key={idx}>
                                            <a href={`https://www.amazon.com/s?k=` + [componente.nombre]} target="_blank" rel="noopener noreferrer">
                                                {componente.nombre}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default TablaCombinaciones;
