import { GoogleGenerativeAI } from "@google/generative-ai";

// Accede a tu clave API como una variable de entorno (consulta "Configura tu clave API" arriba)
const genAI = new GoogleGenerativeAI("AIzaSyBEyV1Ii93NL-3nod3yG4ax8_9gifgrZgs");

async function IaConnect(componentes, presupuesto) {
    const componentesArray = Object.values(componentes);
    const modelos = Object.keys(componentes);
    let contexto = 'Tengo los siguientes componentes para armar una PC:\n';
    modelos.forEach((modelo) => {
        contexto += `\n${modelo}\n\n`
        componentes[modelo].forEach((componente) => {
            contexto += `- ${componente.nombre.replace('Intel', '').replace('AMD', '')}: ${componente.precio}\n`;
        });
    });

    contexto += `\nMi presupuesto es de ${presupuesto} dolares.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = '¿Cuáles son algunas combinaciones de componentes que puedo usar para armar una PC sin exceder mi presupuesto? Genera mínimo 5 hasta 10 combos para armar mi PC, usa diferentes procesadores y demás componentes. Usa solo los componentes que te pasé con este formato "Ryzen 5 5600x : 167.98", donde la primera parte es el componente y lo que va después de ":" es el precio del componente, separa los componentes en líneas distintas, no uses ningun otro formato ni nada parecedio a **Combo 1:**, solo dame las listas separadas, usa solo los componentes que te di';

    const resultado = await model.generateContent([`${contexto}\n\n${prompt}`]);
    const respuesta = await resultado.response;
    const texto = respuesta.text();
    console.log(contexto);
    return texto;
}

export default IaConnect;
