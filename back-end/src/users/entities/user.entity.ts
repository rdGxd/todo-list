import { Roles } from 'src/auth/enums/roles';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
    default: [Roles.USER],
  })
  roles: Roles[];

  @OneToMany(() => Task, (task) => task.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
