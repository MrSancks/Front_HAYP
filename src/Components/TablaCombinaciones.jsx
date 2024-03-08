import React from 'react';

const TablaCombinaciones = ({ combinaciones }) => {
    // Parsear las combinaciones de componentes
    const parsedCombinaciones = combinaciones.split('\n\n').map(combinacion => {
        const lines = combinacion.split('\n');
        const componentes = lines.slice(0, -1).map(line => {
            const [nombre, precio] = line.split(': ');
            return { nombre: nombre.trim(), precio: parseFloat(precio.trim()) };
        });
        const total = parseFloat(lines[lines.length - 1].split(': ')[1]);
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
                                        <li key={idx}>$ {componente.precio}</li>

                                    ))}
                                </ul>
                            </td>
                            <td className="border px-4 py-2">$ {combinacion.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaCombinaciones;
