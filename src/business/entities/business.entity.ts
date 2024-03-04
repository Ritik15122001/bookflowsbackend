/* eslint-disable prettier/prettier */
import { Prop, SchemaFactory } from "@nestjs/mongoose";
export class Business {

    @Prop({ required: true })
    name: string;


    @Prop({ required: true })
    emailId: string;

    @Prop({ required: true })
    contactNumber: number;

  
    @Prop({ required: true })
    address: string;

    @Prop({
        type: Object,
        required: true,
    })
    logo: {
        originalname: string;
        filename: string;
        path: string;
    };
}


export const Businessschema = SchemaFactory.createForClass(Business);