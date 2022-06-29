import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false, // para eliminar el _v
        timestamps: true, // para mostrar fecha de creacion y actualizacion de los datos cargados
    }
);
//UserSchema.plugin(uniqueValidator)
export default model('Usuario', UserSchema);
