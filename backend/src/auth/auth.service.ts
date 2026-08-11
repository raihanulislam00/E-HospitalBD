import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../patient/entities/patient.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async generateToken(patient: Patient) {
    const payload = { sub: patient.id, phoneNo: patient.phoneNo };
    return this.jwtService.sign(payload);
  }

  async validateById(patientId: string) {
    return this.patientRepository.findOne({ where: { id: patientId } });
  }
}
