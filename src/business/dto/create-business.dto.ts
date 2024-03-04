/* eslint-disable prettier/prettier */
export class CreateBusinessDto {
     name:string;   
     emailId:string;
     contactNumber:number;
     address:string
     logo:{
        originalname: string;
        filename: string;
        path: string;
       };
}
