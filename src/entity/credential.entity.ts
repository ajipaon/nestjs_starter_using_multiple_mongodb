import { Column } from 'typeorm';

export class Credential {
  @Column()
  password: string = '';

  @Column()
  firstLogin: boolean = true;

  @Column()
  lastLogin: Date = new Date();

  @Column()
  otp: string = '';

  @Column()
  loginCount: number = 0;

  @Column()
  forgotPasswordCount: number = 0;

  @Column()
  wrongPasswordCount: number = 0;
}
