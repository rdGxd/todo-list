// Importa a entidade User para relacionamento
import { User } from 'src/users/entities/user.entity';

// Importa decoradores do TypeORM
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Importa enum personalizado para status da tarefa
import { taskStatus } from '../enums/taskStatus';

/**
 * Entidade Task - representa a tabela de tarefas no banco de dados
 * Define a estrutura das tarefas e relacionamento com usuários
 */
@Entity() // Marca a classe como uma entidade do TypeORM
export class Task {
  // Chave primária: UUID gerado automaticamente
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Título da tarefa (obrigatório)
  @Column()
  title: string;

  // Descrição detalhada da tarefa (obrigatório)
  @Column()
  description: string;

  // Status da tarefa usando enum, padrão é PENDING
  @Column({
    type: 'enum',
    enum: taskStatus,
    default: taskStatus.PENDING,
  })
  status: taskStatus;

  // Data de criação automaticamente preenchida
  @CreateDateColumn()
  createdAt: string;

  // Data de atualização automaticamente atualizada
  @UpdateDateColumn()
  updatedAt: string;

  // Relacionamento muitos-para-um com User
  // Muitas tarefas podem pertencer a um usuário
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
