/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
})
export class Businessinfo {
    @Prop({
        type: Object,
        required: true,
    })
    logo: {
        originalname: string;
        filename: string;
        path: string;
    };
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    emailId: string;

    @Prop({ required: true })
    contactNumber: number;

    @Prop({ required: true })
    address: string;
}

export const BusinessinfoSchema = SchemaFactory.createForClass(Businessinfo);
export type BusinessinfoDocument = Businessinfo & Document;
