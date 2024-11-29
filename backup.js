import mongoose from 'mongoose';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_URI = process.env.MONGODB_CNX; 
const BACKUP_DIR = path.join(__dirname, 'backups');
const DATE = new Date().toISOString().slice(0, 10);

const backupDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR);
        }

        const backupFile = path.join(BACKUP_DIR, `backup_${DATE}.gz`);
        const command = `mongodump --uri="${DB_URI}" --gzip --archive=${backupFile}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al hacer el backup: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
            }
            console.log(`Backup completado: ${backupFile}`);
            cleanOldBackups();
        });
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
    } finally {
        mongoose.connection.close();
    }
};

const cleanOldBackups = () => {
    fs.readdir(BACKUP_DIR, (err, files) => {
        if (err) throw err;

        const backups = files.filter(file => file.startsWith('backup_'));
        backups.sort();

        while (backups.length > 7) {
            const fileToDelete = path.join(BACKUP_DIR, backups.shift());
            fs.unlink(fileToDelete, err => {
                if (err) console.error(`Error al eliminar el archivo: ${err.message}`);
                else console.log(`Archivo eliminado: ${fileToDelete}`);
            });
        }
    });
};

export default backupDatabase
