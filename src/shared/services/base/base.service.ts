import { Repository } from 'typeorm'

export abstract class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async findOneById(id: string): Promise<any> {
    return await this.repository.findOne(id)
  }

  async remove(ids: string[]): Promise<any> {
    return await this.repository.remove(await this.repository.findByIds(ids))
  }
}
