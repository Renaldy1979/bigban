import AppError from '@shared/errors/AppError';
import FakePermissionsRepository from '../repositories/fakes/FakePermissionsRepository';
import CreatePermissionService from './CreatePermissionService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;

describe('CreatePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);
  });
  it('should be able to create a new permission', async () => {
    const permission = await createPermission.execute({
      name: 'Permission 01',
      description: 'description of permission 01',
    });

    expect(permission).toHaveProperty('id');
  });
  it('should not be able to create a new permission with the same name from another', async () => {
    await fakePermissionsRepository.create({
      name: 'Permission 01',
      description: 'Description of permission 01',
    });

    await expect(
      createPermission.execute({
        name: 'Permission 01',
        description: 'Description of permission 01',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
