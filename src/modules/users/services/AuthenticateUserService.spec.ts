import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeRolesRepository: FakeRolesRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRolesRepository = new FakeRolesRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUsersTokensRepository,
    );

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeRolesRepository,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
      roles: [],
    });

    const response = await authenticateUser.execute({
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able authenticvte with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'renaldy.sousa@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
      roles: [],
    });

    await expect(
      authenticateUser.execute({
        email: 'renaldy.sousa@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
