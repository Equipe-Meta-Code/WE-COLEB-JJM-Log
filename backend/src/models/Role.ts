import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import Permission from "./Permission";

@Entity("roles")
class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    nome_role: string;

    @Column('varchar')
    descricao: string;

    @CreateDateColumn({ type: 'timestamp' })
    data_criacao: Date;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "permissions_roles",
        joinColumns: [{ name: "role_id"}],
        inverseJoinColumns: [{ name: "permission_id"}]
    })
    permission: Permission[];
}

export default Role;
