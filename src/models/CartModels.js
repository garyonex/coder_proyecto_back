import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CartsSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            trim: true,
        },
        products: [
            {
                productsId: {
                    type: String,
                    required: true,
                },
                quantityId: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    {
        versionKey: false, // para eliminar el _v
        timestamps: true, // para mostrar fecha de creacion y actualizacion de los datos cargados
    }
);
export default model('Cart,', CartsSchema);
