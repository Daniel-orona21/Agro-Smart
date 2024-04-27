// En tu componente Inicios
import React, { useState } from 'react';
import '../css/login.css';
import Login from './login';
import PantallaPez from './PantallaPez';
import PantallaCultivo from './PantallaCultivo';

export const Inicios = () => {
    const [primerDesplazamiento, setPrimerDesplazamiento] = useState(false);
    const [segundoDesplazamiento, setSegundoDesplazamiento] = useState(false);

    const desplazarCajaPrimerComponente = () => {
        setPrimerDesplazamiento(true);
    };

    const desplazarCajaSegundoComponente = () => {
        setSegundoDesplazamiento(true);
    };

    return (
        <div className={`main ${primerDesplazamiento ? 'caja-desplazada' : ''} ${segundoDesplazamiento ? 'caja-segundo-desplazada' : ''}`}>
            <h1 className="titulo">Agro Smart Tech</h1>
            <div className="caja">
                <div className='subcaja'>
                    <Login desplazarCaja={desplazarCajaPrimerComponente} />
                </div>
                <div className='subcaja'>
                    <PantallaPez desplazarCaja={desplazarCajaSegundoComponente} />
                </div>
                <div className='subcaja'>
                    <PantallaCultivo />
                </div>
            </div>
        </div>
    );
};

export default Inicios;
