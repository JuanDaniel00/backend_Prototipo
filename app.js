import 'dotenv/config'
import { Server } from './src/models/server.js'
const server = new Server();
server.listen();