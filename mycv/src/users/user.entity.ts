import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(
      `Inserted User(${this.email}) with id: ${this.id} at: ${new Date().toDateString()}`,
    );
  }

  @AfterUpdate()
  logUpdate() {
    console.log(
      `Updated User(${this.email}) with id: ${this.id} at: ${new Date().toDateString()}`,
    );
  }

  @AfterRemove()
  logRemove() {
    console.log(
      `Deleted User(${this.email}) with id: ${this.id} at: ${new Date().toDateString()}`,
    );
  }
}
