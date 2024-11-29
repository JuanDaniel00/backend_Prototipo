import fs from 'fs';
import { createInterface } from 'readline';

async function readCsv(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const values = line.split(',');
        console.log(`Valores: ${values}`);

    }
}

// Cambia 'ruta/al/archivo.csv' a la ruta de tu archivo CSV
readCsv('C:/Users/APRENDIZ/Desktop/Libro1.csv')
    .then(() => console.log('Lectura completa.'))
    .catch(err => console.error('Error al leer el archivo:', err));