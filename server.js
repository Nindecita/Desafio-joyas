import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import {logger} from 'logger-express' 
dotenv.config();
import jewelsRoutes from "./config/routes/jewels.routes.js"


const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(logger())
app.use(express.json());
app.use(cors());

//Ruta
app.use(jewelsRoutes)

//Inicializamos el servidor en el puerto 3000
app.listen(port, console.log(`¡Servidor encendido en el puerto! ${port}`));