import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('user_files')
class UserFiles {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    nome: string;

    @Column({ type: 'varchar', nullable: false })
    rota: string;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    origem: number;

    @Column({ type: 'varchar', nullable: false })
    tipo: string;

    @CreateDateColumn({ type: 'timestamp' })
    data_criacao: Date;
    
}

export default UserFiles;
