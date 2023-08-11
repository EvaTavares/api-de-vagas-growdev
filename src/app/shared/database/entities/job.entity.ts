import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { JobApplicationEntity } from "./job-application.entity";
import { UserEntity } from "./user.entity";

@Entity("jobs")
export class JobEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  enterprise: string;

  @Column({ name: "limit_date" })
  limitDate: Date;

  @Column({ name: "is_active" })
  isActive: boolean;

  @Column({ name: "id_recruiter", type: "uuid" })
  idRecruiter: string;

  @Column({ name: "max_candidates", nullable: true })
  maxCandidates: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => JobApplicationEntity, (entity) => entity.job)
  jobApplication: JobApplicationEntity[];
}
