const ImageSearchAPI = async (componentes) => {
    try {
        const resultados = [];
        for (const combinacion of componentes) {
            const nombreComponentes = combinacion.componentes.map(componente => componente.nombre);
            const urls = await Promise.all(nombreComponentes.map(async nombre => {
                try {
                    const respuesta = await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAaa77L0OpW8lMay785WtIzOHPqsBR7eY4&cx=b03bf514d1e874c21&q=${nombre}&searchType=image&num=1`);
                    const datos = await respuesta.json();
                    return datos.items[0].link;
                } catch (error) {
                    console.error('Error al obtener imagen:', error);
                    return null;
                }
            }));
            resultados.push(urls);
        }
        return resultados;
    } catch (error) {
        console.error('Error al buscar imágenes:', error);
        return [];
    }
};

export default ImageSearchAPI;