// Importa enums e entidades relacionadas
import { Roles } from 'src/auth/enums/roles';
import { Task } from 'src/task/entities/task.entity';

// Importa decoradores do TypeORM para mapeamento objeto-relacional
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entidade User - representa a tabela de usuários no banco de dados
 * Define a estrutura, relacionamentos e constraints dos usuários
 */
@Entity() // Marca a classe como uma entidade do TypeORM
export class User {
  // Chave primária: UUID gerado automaticamente
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Email único obrigatório para login
  @Column({ unique: true })
  email: string;

  // Nome do usuário com limite de 255 caracteres, não pode ser nulo
  @Column({ length: 255, nullable: false })
  name: string;

  // Senha hasheada com limite de 255 caracteres, não pode ser nula
  @Column({ length: 255, nullable: false })
  password: string;

  // Data de criação automaticamente preenchida
  @CreateDateColumn()
  createdAt: string;

  // Data de atualização automaticamente atualizada
  @UpdateDateColumn()
  updatedAt: string;

  // Array de roles (permissões) do usuário, padrão é USER
  @Column({
    type: 'enum', // Tipo enum no banco
    enum: Roles, // Usa o enum Roles definido
    array: true, // Permite múltiplos valores
    default: [Roles.USER], // Valor padrão
  })
  roles: Roles[];

  // Relacionamento um-para-muitos com Task
  // Um usuário pode ter várias tarefas
  @OneToMany(() => Task, (task) => task.user, {
    eager: true, // Carrega as tasks automaticamente ao buscar o usuário
    onDelete: 'CASCADE', // Remove todas as tasks quando o usuário for deletado
  })
  tasks: Task[];
}
