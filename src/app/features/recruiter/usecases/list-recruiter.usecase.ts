import { UserType } from "../../../models/user-type.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Result } from "../../../shared/util/result.contract";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UserRepository } from "../../user/repositories/user.repository";

export class ListRecruitersUsecase implements Usecase {
  public async execute(): Promise<Result> {
    const repository = new UserRepository();
    const cacheRepository = new CacheRepository();

    const cacheResult = await cacheRepository.get("recruites");

    if (cacheResult) {
      return {
        ok: true,
        message: "Recruiters successfully listed",
        data: cacheResult,
        code: 200,
      };
    }

    const result = await repository.list(UserType.Recruiter);
    const data = result?.map((recruiter) => recruiter.toJson());

    await cacheRepository.set("recruites", data);
    // await cacheRepository.setEx("recruites", data, 1);

    return {
      ok: true,
      message: "Recruiters successfully listed",
      data: data,
      code: 200,
    };
  }
}
