import { inject, injectable } from "tsyringe";
import { AppResponse } from "../../../../helper/AppResponse";
import { ICategoryRepository } from "../../iRepository/IUserRepository";

@injectable()
class ListByIDCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<AppResponse> {
    const response = await this.categoryRepository.list();

    return new AppResponse({
      data: response,
      message: "Successfully listed",
      result: "success",
      status: 200,
    });
  }
}

export { ListByIDCategoryUseCase };
