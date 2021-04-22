import AppError from '@shared/errors/AppError';
import FakePermissionsRepository from '../repositories/fakes/FakePermissionsRepository';
import UpdatePermissionservice from './UpdatePermissionService';

let fakePermissionsRepository: FakePermissionsRepository;
let updatePermission: UpdatePermissionservice;

describe('UpdatePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    updatePermission = new UpdatePermissionservice(fakePermissionsRepository);
  });
  it('should be able to update the Permission', async () => {
    const permission = await fakePermissionsRepository.create({
      name: 'edit_product',
      description: 'Edit Product',
    });

    const permissionUpdated = await updatePermission.execute({
      permission_id: permission.id,
      name: 'delete_product',
      description: 'Delete Product',
    });

    expect(permissionUpdated.name).toBe('delete_product');
    expect(permissionUpdated.description).toBe('Delete Product');
  });

  it('should not be able to update the Permission with permission-id non exists', async () => {
    await fakePermissionsRepository.create({
      name: 'edit_product',
      description: 'Edit Product',
    });

    await expect(
      updatePermission.execute({
        permission_id: 'permission-id-non-exists',
        name: 'edit_product',
        description: 'Edit Product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
