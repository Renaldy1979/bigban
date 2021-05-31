import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import FakePermissionsRepository from '../repositories/fakes/FakePermissionsRepository';
import CreateRoleService from './CreateRoleService';

let fakeRolesRepository: FakeRolesRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let createRole: CreateRoleService;

describe('CreateRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    createRole = new CreateRoleService(
      fakeRolesRepository,
      fakePermissionsRepository,
    );
  });
  it('should be able to create a new role', async () => {
    const permissionCreate = await fakePermissionsRepository.create({
      name: 'create',
      description: 'description create',
    });

    const permissionDelete = await fakePermissionsRepository.create({
      name: 'delete',
      description: 'description delete',
    });

    const role = await createRole.execute({
      name: 'Role 01',
      description: 'description of role 01',
      permissions: [permissionCreate.id, permissionDelete.id],
    });

    expect(role).toHaveProperty('id');
  });
  it('should not be able to create a new role with the same name from another', async () => {
    await fakeRolesRepository.create({
      name: 'Role 01',
      description: 'Description of role 01',
      permissions: [],
    });

    await expect(
      createRole.execute({
        name: 'Role 01',
        description: 'Description of role 01',
        permissions: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new role with the same description from another', async () => {
    await fakeRolesRepository.create({
      name: 'Role 01',
      description: 'Description of role 01',
      permissions: [],
    });

    await expect(
      createRole.execute({
        name: 'Role 02',
        description: 'Description of role 01',
        permissions: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
