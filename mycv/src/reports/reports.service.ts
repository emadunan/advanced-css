import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './Dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepo: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepo.create({ ...reportDto, user });
    return await this.reportsRepo.save(report);
  }

  async update(id: number, attrs: Partial<CreateReportDto>) {
    const report = await this.reportsRepo.findOneBy({ id });

    if (!report) throw new NotFoundException('report not found');

    const updatedReport = { ...report, ...attrs };
    return await this.reportsRepo.save(updatedReport);
  }
}
