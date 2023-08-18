import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserType } from "../../../models/user-type.model";
import { JobApplicationEntity } from "./job-application.entity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column() //decorator de propriedade
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "varchar", length: 1, enum: UserType })
  type: UserType;

  @Column({ name: "enterprise_name", nullable: true })
  enterpriseName: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => JobApplicationEntity, (entity) => entity.candidate)
  jobApplication: JobApplicationEntity[];
}
