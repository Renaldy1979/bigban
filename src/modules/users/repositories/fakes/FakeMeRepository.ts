import IMeRepository from '@modules/users/repositories/IMeRepository';

import User from '@modules/users/infra/typeorm/entities/User';

class MeRepository implements IMeRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }
}

export default MeRepository;
