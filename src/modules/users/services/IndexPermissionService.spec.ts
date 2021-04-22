// import AppError from '@shared/errors/AppError';
import FakePermissionsRepository from '../repositories/fakes/FakePermissionsRepository';
import IndexPermissionService from './IndexPermissionService';

let fakePermissionsRepository: FakePermissionsRepository;
let indexPermission: IndexPermissionService;

describe('IndexPermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    indexPermission = new IndexPermissionService(fakePermissionsRepository);
  });
  it('should be able to show all permissions', async () => {
    const permission1 = await fakePermissionsRepository.create({
      name: 'edit_product',
      description: 'Edit Product',
    });

    const permission2 = await fakePermissionsRepository.create({
      name: 'delete_product',
      description: 'Delete Product',
    });

    const listPermissions = await indexPermission.execute();

    await expect(listPermissions).toEqual([permission1, permission2]);
  });
});
