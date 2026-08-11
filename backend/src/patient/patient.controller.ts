import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { CreatePatientDto } from './dto/create-patient.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { PatientService } from './patient.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiChatService } from './ai-chat.service';
import type { ChatRequestDto } from './dto/chat-message.dto';

@Controller('patient')
export class PatientController {
	constructor(
		private readonly patientService: PatientService,
		private readonly authService: AuthService,
		private readonly aiChatService: AiChatService,
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
			dashboardUrl: '/patient/dashboard',
			patient: this.patientService.toResponse(patient as any),
		};
	}

	@Get('dashboard')
	@UseGuards(JwtAuthGuard)
	async dashboard(@Req() request: { user: unknown }) {
		return {
			message: 'Patient dashboard',
			patient: this.patientService.toResponse(request.user as any),
			dashboard: {
				route: '/patient/dashboard',
				authentication: 'Bearer token required',
				nextStep: 'Use the token from /patient/login in the Authorization header',
			},
		};
	}

	@Get()
	async list() {
		return this.patientService.list();
	}

	@Post('chat')
	async chat(@Body() chatRequestDto: ChatRequestDto) {
		return this.aiChatService.reply(chatRequestDto);
	}

	@Post('chat/clear')
	clearChat(@Body('sessionId') sessionId: string) {
		return this.aiChatService.clear(sessionId);
	}
}
