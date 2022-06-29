import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//!----- modelo de esquema de ordenes de compra

const OrdenesSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        articulos: [
            {
                articulosId: {
                    type: String,
                },
                cantidad: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        monto: {
            type: Number,
            required: true,
        },
        direccion: {
            type: Object,
            required: true,
        },
    },
    {
        versionKey: false, // para eliminar el _v
        timestamps: true, // para mostrar fecha de creacion y actualizacion de los datos cargados
    }
);

export default model('Orden', OrdenesSchema);