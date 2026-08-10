import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';

describe('PatientService', () => {
	let patientService: PatientService;
	const patientRepositoryMock = {
		create: jest.fn(),
		save: jest.fn(),
		find: jest.fn(),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				PatientService,
				{
					provide: getRepositoryToken(Patient),
					useValue: patientRepositoryMock,
				},
			],
		}).compile();

		patientService = moduleRef.get(PatientService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('registers a patient and returns safe response data', async () => {
		patientRepositoryMock.create.mockReturnValue({
			name: 'Rahim Uddin',
			email: 'rahim@example.com',
			phoneNo: '+8801712345678',
			location: { district: 'Dhaka', division: 'Dhaka' },
			dateOfBirth: '1995-01-01',
			passwordHash: 'hash',
			passwordSalt: 'salt',
		});
		patientRepositoryMock.save.mockResolvedValue({
			id: 'patient-id-1',
			name: 'Rahim Uddin',
			email: 'rahim@example.com',
			phoneNo: '+8801712345678',
			location: { district: 'Dhaka', division: 'Dhaka' },
			dateOfBirth: '1995-01-01',
			createdAt: new Date('2026-01-01T00:00:00.000Z'),
		});

		const result = await patientService.register({
			name: 'Rahim Uddin',
			email: 'rahim@example.com',
			phoneNo: '+8801712345678',
			location: { district: 'Dhaka', division: 'Dhaka' },
			dateOfBirth: '1995-01-01',
			password: 'secret123',
		});

		expect(patientRepositoryMock.create).toHaveBeenCalledTimes(1);
		expect(patientRepositoryMock.save).toHaveBeenCalledTimes(1);
		expect(result).toMatchObject({
			id: 'patient-id-1',
			name: 'Rahim Uddin',
			email: 'rahim@example.com',
			phoneNo: '+8801712345678',
			location: { district: 'Dhaka', division: 'Dhaka' },
			dateOfBirth: '1995-01-01',
		});
	});

	it('rejects invalid email addresses', async () => {
		await expect(
			patientService.register({
				name: 'Rahim Uddin',
				email: 'not-an-email',
				phoneNo: '+8801712345678',
				location: { district: 'Dhaka', division: 'Dhaka' },
				dateOfBirth: '1995-01-01',
				password: 'secret123',
			}),
		).rejects.toBeInstanceOf(BadRequestException);
	});
});