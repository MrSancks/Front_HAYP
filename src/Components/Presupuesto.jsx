import React, { useState, useEffect } from 'react';

const Presupuesto = ({ valorPrincipal, modelos = [], onModeloCambio }) => {
    const [presupuestos, setPresupuestos] = useState({});
    const [presupuestoTotalSeleccionado, setPresupuestoTotalSeleccionado] = useState(0);

    useEffect(() => {
        const sumaTotal = Object.values(presupuestos).reduce((total, presupuesto) => total + presupuesto, 0);
        setPresupuestoTotalSeleccionado(sumaTotal);
    }, [presupuestos]);

    const handlePresupuestoChange = (modelo, nuevoPresupuesto) => {
        if (nuevoPresupuesto <= valorPrincipal - presupuestoTotalSeleccionado) {
            setPresupuestos({
                ...presupuestos,
                [modelo]: nuevoPresupuesto,
            });

            onModeloCambio(modelo, nuevoPresupuesto);
        }
    };

    return (
        <div>
            <label htmlFor="valorPrincipal">Valor Principal:</label>
            <input
                type="number"
                id="valorPrincipal"
                value={valorPrincipal}
                onChange={(e) => onModeloCambio('valorPrincipal', parseInt(e.target.value))}
            />

            <hr />

            {modelos.map((modelo) => (
                <div key={modelo}>
                    <label htmlFor={modelo}>{modelo}:</label>
                    <input
                        type="range"
                        id={modelo}
                        min={0}
                        max={valorPrincipal - presupuestoTotalSeleccionado}
                        value={presupuestos[modelo] || 0}
                        onChange={(e) => handlePresupuestoChange(modelo, parseInt(e.target.value))}
                    />
                    <span>{presupuestos[modelo] || 0}</span>
                </div>
            ))}
        </div>
    );
};

export default Presupuesto;
