import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { AuthModule } from '../auth/auth.module';
import { AiChatService } from './ai-chat.service';

@Module({
	imports: [TypeOrmModule.forFeature([Patient]), AuthModule],
	controllers: [PatientController],
	providers: [PatientService, AiChatService],
})
export class PatientModule {}
