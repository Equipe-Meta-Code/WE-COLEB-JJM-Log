import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import Role from "./Role";

@Entity("users")
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 150, nullable: false })
    nome: string;

    @Column('varchar', { length: 60, nullable: false })
    cpf: string;

    @Column('varchar', { length: 100, nullable: true })
    login: string;

    @Column('varchar', { length: 100, nullable: true })
    senha: string;

    @Column('varchar', { length: 100, nullable: true })
    cargo: string;

    @CreateDateColumn({ type: 'timestamp' })
    data_criacao: Date;

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles",
        joinColumns: [{ name: "user_id"}],
        inverseJoinColumns: [{ name: "role_id"}]
    })
    roles: Role[];
}

export default User;