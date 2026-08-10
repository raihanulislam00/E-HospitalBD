export class CreatePatientDto {
	name: string;
	email: string;
	phoneNo: string;
	location: {
		district: string;
		division: string;
	};
	dateOfBirth: string;
	password: string;
}