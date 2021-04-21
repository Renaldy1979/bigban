// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IndexUserService from './IndexUserService';

let fakeUsersRepository: FakeUsersRepository;
let indexUser: IndexUserService;

describe('IndexUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    indexUser = new IndexUserService(fakeUsersRepository);
  });
  it('should be able to show all users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com.br',
      password: '123456',
    });

    const users = await indexUser.execute();

    expect(users).toEqual([user1, user2]);
  });
});
