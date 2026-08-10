import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
	constructor(private readonly patientService: PatientService) {}

	@Post('register')
	async register(@Body() createPatientDto: CreatePatientDto) {
		return {
			message: 'Patient registered successfully',
			patient: await this.patientService.register(createPatientDto),
		};
	}

	@Get()
	async list() {
		return this.patientService.list();
	}
}
