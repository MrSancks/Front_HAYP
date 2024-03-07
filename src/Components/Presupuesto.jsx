// Presupuesto.jsx
import React, { useState, useEffect } from 'react';

const Presupuesto = ({ valorPrincipal, modelo, onModeloCambio, isSelected }) => {
    const [presupuesto, setPresupuesto] = useState(0);

    useEffect(() => {
        onModeloCambio(modelo, presupuesto);
    }, [presupuesto]);

    const handlePresupuestoChange = (nuevoPresupuesto) => {
        if (nuevoPresupuesto <= valorPrincipal) {
            setPresupuesto(nuevoPresupuesto);
        }
    };

    return (
        <div>
            {isSelected && (
                <>
                    <label htmlFor={modelo}></label>
                    <input
                        type="range"
                        id={modelo}
                        min={0}
                        max={valorPrincipal}
                        value={presupuesto}
                        onChange={(e) => handlePresupuestoChange(parseInt(e.target.value))}
                    />
                    <span>{presupuesto}</span>
                </>
            )}
        </div>
    );
};

export default Presupuesto;