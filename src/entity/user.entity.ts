import { Role } from 'src/model/role.model';
import { Column, Entity, Index, ObjectId, ObjectIdColumn } from 'typeorm';
import { Credential } from './credential.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  authId: string;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  role: [Role] = [Role.ROLE_USER];

  @Column()
  photoUrl: string;

  @Column()
  authToken: string;

  @Column()
  authName: string;

  @Column()
  serverAuthCode: string;

  @Column()
  grantedScopes: [] = [];

  @Column()
  expiresAuth: number;

  @Column()
  firebase: string = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Column((type) => Credential)
  credential: Credential = new Credential();
}
