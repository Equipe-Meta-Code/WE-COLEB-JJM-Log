import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("permissions")
class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    nome_permission: string;

    @Column('varchar')
    descricao: string;

    @CreateDateColumn({ type: 'timestamp' })
    data_criacao: Date;
}

export default Permission;
