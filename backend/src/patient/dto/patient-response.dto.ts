export class PatientLocationDto {
	district: string;
	division: string;
}

export class PatientResponseDto {
	id: string;
	name: string;
	email: string;
	phoneNo: string;
	location: PatientLocationDto;
	dateOfBirth: string;
	createdAt: string;
}