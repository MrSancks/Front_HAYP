import axios from 'axios';
import OpenAI from 'openai';
const IaConnect = async (componentes, presupuesto) => {


    const componentesArray = Object.values(componentes);
    const modelos = Object.keys(componentes);

    let contexto = 'Tengo los siguientes componentes para armar una PC:\n';
    modelos.forEach((modelo) => {
        contexto += `\n${modelo}\n\n`
        componentes[modelo].forEach((componente) => {
            contexto += `- ${componente.nombre.replace('Intel', '').replace('AMD', '')}: ${componente.precio}\n`;
        });
    });

    contexto += `\nMi presupuesto es de ${presupuesto} dólares.`;
    const prompt = '¿Cuáles son algunas combinaciones de componentes que puedo usar para armar una PC sin exceder mi presupuesto? Genera minimo 5 hasta 10 combos para armar mi pc, usa diferentes procesadores y demas componentes, Usa solo los componentes que te pase tienen este formato "Ryzen 5 5600x : 167.98" donde la primera parte es el componente y lo que va despues de ":" es el precio del componente, separa los componentes en lineas distintas';
    const openai = new OpenAI({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
    });

    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'user', content: `${contexto} + '\n'+ '\n\n' + ${prompt}` }],
    });
    console.log(componentesArray);
    console.log(contexto)
    console.log(stream.choices[0].message.content);
    return `${stream.choices[0].message.content}`;
};

export default IaConnect;
