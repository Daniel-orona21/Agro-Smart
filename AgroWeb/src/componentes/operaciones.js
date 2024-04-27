const promedios = (a, datos) => {
    let sum = 0;
    for (let i = a; i < a + 24; i++) {
      sum += datos[i];
    }
    const promedio = sum / 24;
    if (promedio == NaN){promedio = 0}
    return promedio;
  };

  const promediosN = (a, datos) => {
    let sum = 0;
    for (let i = a; i < a + 24; i++) {
        switch (datos[i]) {
            case 'Lleno':
                datos[i] = 2;
                break;
            case 'Medio':
                datos[i] = 1;
                break;
            case 'Bajo':
                datos[i] = 0;
                break;
            default:
                break;
        }
        sum += parseInt(datos[i]); // Convertir el valor a número antes de sumarlo
    }
    let promedio = sum / 24;
    promedio = parseInt(promedio);
    switch (promedio) {
        case 0:
            promedio = 'Bajo';
            break;
        case 1:
            promedio = 'Medio';
            break;
        case 2:
            promedio = 'Lleno';
            break;
        default:
            break;
    }
    return promedio;
};





function filtrarFechas(datos, fechaInicio, fechaFin) {
    // Convertir las cadenas de fecha en objetos Date
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    return datos.filter(([dato, fecha]) => {
        // Convertir la fecha del dato a un objeto Date
        const fechaDato = new Date(fecha);
        // Filtrar los datos dentro del rango de fechas
        return fechaDato >= fechaInicioObj && fechaDato <= fechaFinObj;
    });
}




function combinar(datos, fechas) {
    // Verificar que ambos arreglos tengan la misma longitud
    if (datos.length !== fechas.length) {
        throw new Error("Los arreglos de datos y fechas deben tener la misma longitud.");
    }

    // Iterar sobre uno de los arreglos y combinar los elementos
    return datos.map((dato, index) => [dato, fechas[index]]);
}
export {promedios, promediosN, filtrarFechas, combinar}  