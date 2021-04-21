import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRolesRepository = new FakeRolesRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeRolesRepository,
    );
  });
  it('should be able to create a new user', async () => {
    const role1 = await fakeRolesRepository.create({
      name: 'ROLE_ADM',
      description: 'Administrator',
    });

    const role2 = await fakeRolesRepository.create({
      name: 'ROLE_USER',
      description: 'User',
    });

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
      roles: [role1.id, role2.id],
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a new user with same email from another', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
      roles: [],
    });

    await expect(
      createUser.execute({
        name: 'John Trê',
        email: 'renaldy.sousa@gmail.com',
        password: '654321',
        roles: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
