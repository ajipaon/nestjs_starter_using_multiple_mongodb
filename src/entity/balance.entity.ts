import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Balance {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  userId: ObjectId;

  @Column({ type: 'float', default: 0 })
  amount: number = 0;

  @Column()
  lastTransaction: Date = null;

  @Column()
  transactionId: string;

  @Column({ type: 'float', default: 0 })
  lastDebit: number = 0;

  @Column({ type: 'float', default: 0 })
  lastCredit: number = 0;
}
