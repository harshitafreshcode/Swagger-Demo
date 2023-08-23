// @ManyToMany(() => Friend)
//   @JoinTable({
//     name: 'user_friend',
//     joinColumn: { name: 'user_id', referencedColumnName: 'id' },
//     inverseJoinColumn: { name: 'friend_id', referencedColumnName: 'id' },
//   })
//   friends: Friend[];


import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, OneToOne, JoinColumn, DeleteDateColumn } from "typeorm"


@Entity({ name: "user" })
export class user {
    @PrimaryGeneratedColumn()
    'id': number

    @Column()
    'first_name': string

    @Column()
    'last_name': string

    @Column({ unique: true })
    'email': string

    @Column()
    'phone': string

    @Column({ default: 1 })
    'status': number

    @CreateDateColumn({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    'created_date': Date

    @UpdateDateColumn({ name: 'updated_date' })
    'updated_date': Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    "deleted_at": Date


}