import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentdDetailsModule } from './appointmentd-details/appointmentd-details.module';
import { BusinessinfoModule } from './businessinfo/businessinfo.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'images'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://ritikkumar764585:23u7h2K30t7mEg7o@bookflows.7ela7ar.mongodb.net/',
    ),
    AppointmentModule,
    AppointmentdDetailsModule,
    BusinessinfoModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
