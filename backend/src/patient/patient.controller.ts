import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreatePatientDto } from './dto/create-patient.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { PatientService } from './patient.service';
import { AuthService } from '../auth/auth.service';

@Controller('patient')
export class PatientController {
	constructor(
		private readonly patientService: PatientService,
		private readonly authService: AuthService,
	) {}

	@Post('register')
	async register(@Body() createPatientDto: CreatePatientDto) {
		return {
			message: 'Patient registered successfully',
			patient: await this.patientService.register(createPatientDto),
		};
	}

	@Post('login')
	async login(@Body() loginDto: LoginPatientDto) {
		const patient = await this.patientService.login(loginDto);
		const token = await this.authService.generateToken(patient as any);

		return {
			message: 'Login successful',
			token,
			patient: this.patientService.toResponse(patient as any),
		};
	}

	@Get()
	async list() {
		return this.patientService.list();
	}
}
