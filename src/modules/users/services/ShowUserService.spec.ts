import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserService from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUser = new ShowUserService(fakeUsersRepository);
  });
  it('should be able to show user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
    });

    const profile = await showUser.execute(user.id);

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('renaldy.sousa@gmail.com');
  });

  it('should not be able to show profile from non-existing user', async () => {
    await expect(
      showUser.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
