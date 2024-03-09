import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './Dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './Dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './Dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return await this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async approveReport(
    @Body() body: ApproveReportDto,
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    if (!user) throw new UnauthorizedException();
    return await this.reportsService.update(parseInt(id), body);
  }
}
