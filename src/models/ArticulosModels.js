import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//!---- indicamos como sera el esquema que utilizaremos para guardar los articulos
const articulosSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        stock: {
            type: Number,
            trim: true,
            default: 0,
        },
        // thumbnail:{
        //     type: String,
        //     required: true
        // }
    },
    {
        versionKey: false, // para eliminar el _v
        timestamps: true, // para mostrar fecha de creacion y actualizacion de los datos cargados
    }
);
export default model('Articulo,', articulosSchema);
