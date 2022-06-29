import {Router} from 'express'
import * as articuloCtrl from '../controllers/articulosControllers.js'
const articulosRouter = Router()
//! routes de articulos -> crear, modificar,eliminar, buscar
articulosRouter.post('/', articuloCtrl.crearArt);
articulosRouter.get('/', articuloCtrl.mostrarTodos);
articulosRouter.get('/stock',articuloCtrl.mostrarAlgunos)
articulosRouter.get('/:id', articuloCtrl.buscar);
articulosRouter.delete('/:id',articuloCtrl.eliminarUno)
articulosRouter.put('/:id', articuloCtrl.actualizar)

export default articulosRouter