import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync } from 'crypto';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
	constructor(
		@InjectRepository(Patient)
		private readonly patientRepository: Repository<Patient>,
	) {}

	async register(createPatientDto: CreatePatientDto) {
		const name = this.requireString(createPatientDto.name, 'name');
		const email = this.requireString(createPatientDto.email, 'email').toLowerCase();
		const phoneNo = this.requireString(createPatientDto.phoneNo, 'phoneNo');
		const district = this.requireString(createPatientDto.location?.district, 'location.district');
		const division = this.requireString(createPatientDto.location?.division, 'location.division');
		const dateOfBirth = this.requireString(createPatientDto.dateOfBirth, 'dateOfBirth');
		const password = this.requireString(createPatientDto.password, 'password');

		if (!this.isValidEmail(email)) {
			throw new BadRequestException('email must be a valid email address');
		}

		if (!this.isValidPhoneNumber(phoneNo)) {
			throw new BadRequestException('phoneNo must contain 7 to 15 digits, with an optional leading +');
		}

		if (!this.isValidDateOfBirth(dateOfBirth)) {
			throw new BadRequestException('dateOfBirth must be a valid past date in YYYY-MM-DD format');
		}

		const passwordSalt = randomBytes(16).toString('hex');
		const passwordHash = scryptSync(password, passwordSalt, 64).toString('hex');

		const patient = this.patientRepository.create({
			name,
			email,
			phoneNo,
			location: {
				district,
				division,
			},
			dateOfBirth,
			passwordHash,
			passwordSalt,
		});

		const savedPatient = await this.patientRepository.save(patient);

		return this.toResponse(savedPatient);
	}

	async login(loginDto: LoginPatientDto) {
		const phoneNo = this.requireString(loginDto.phoneNo, 'phoneNo');
		const password = this.requireString(loginDto.password, 'password');

		const patient = await this.patientRepository.findOne({ where: { phoneNo } });

		if (!patient) {
			throw new BadRequestException('invalid phone number or password');
		}

		const derived = scryptSync(password, patient.passwordSalt, 64).toString('hex');
		if (derived !== patient.passwordHash) {
			throw new BadRequestException('invalid phone number or password');
		}

		return patient;
	}

	async list() {
		const patients = await this.patientRepository.find({ order: { createdAt: 'DESC' } });
		return patients.map((patient) => this.toResponse(patient));
	}

	public toResponse(patient: Patient) {
		return {
			id: patient.id,
			name: patient.name,
			email: patient.email,
			phoneNo: patient.phoneNo,
			location: patient.location,
			dateOfBirth: patient.dateOfBirth,
			createdAt: patient.createdAt.toISOString(),
		};
	}

	private requireString(value: unknown, fieldName: string): string {
		if (typeof value !== 'string' || value.trim() === '') {
			throw new BadRequestException(`${fieldName} is required`);
		}

		return value.trim();
	}

	private isValidEmail(value: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	private isValidPhoneNumber(value: string): boolean {
		return /^\+?[0-9]{7,15}$/.test(value);
	}

	private isValidDateOfBirth(value: string): boolean {
		const parsedDate = new Date(value);

		return !Number.isNaN(parsedDate.getTime()) && parsedDate.getTime() < Date.now();
	}
}
