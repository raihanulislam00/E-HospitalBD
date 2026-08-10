import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class PatientLocation {
	@Column()
	district: string;

	@Column()
	division: string;
}

@Entity({ name: 'patients' })
export class Patient {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	phoneNo: string;

	@Column(() => PatientLocation)
	location: PatientLocation;

	@Column()
	dateOfBirth: string;

	@Column()
	passwordHash: string;

	@Column()
	passwordSalt: string;

	@CreateDateColumn()
	createdAt: Date;
}