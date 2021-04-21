import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com.br',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com.br');
  });

  it('should not be able to update user from non-existing user', async () => {
    await expect(
      updateUser.execute({
        user_id: 'non-existing-user-id',
        name: 'Mary Doe',
        email: 'mary@example.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com.br',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com.br',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should be not able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com.br',
        old_password: 'old-wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user without inform user-id', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'renaldy.sousa@gmail.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        user_id: '',
        name: 'John Trê',
        email: 'johntre@example.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
