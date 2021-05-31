import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import FakePermissionRepository from '../repositories/fakes/FakePermissionsRepository';
import UpdateRoleService from './UpdateRoleService';

let fakeRolesRepository: FakeRolesRepository;
let updateRole: UpdateRoleService;
let fakePermissionRepository: FakePermissionRepository;

describe('UpdateRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    fakePermissionRepository = new FakePermissionRepository();
    updateRole = new UpdateRoleService(
      fakeRolesRepository,
      fakePermissionRepository,
    );
  });
  it('should be able to update the Role', async () => {
    const permission = await fakePermissionRepository.create({
      name: 'create',
      description: 'description create',
    });

    const role = await fakeRolesRepository.create({
      name: 'ROLE_ADM',
      description: 'Administrator',
      permissions: [permission],
    });

    const roleUpdated = await updateRole.execute({
      role_id: role.id,
      name: 'ROLE_USER',
      description: 'User',
    });

    expect(roleUpdated.name).toBe('ROLE_USER');
    expect(roleUpdated.description).toBe('User');
  });

  it('should not be able to update the role with role-id non exists', async () => {
    await fakeRolesRepository.create({
      name: 'ROLE_ADM',
      description: 'Administrator',
    });

    await expect(
      updateRole.execute({
        role_id: 'role-id-non-exists',
        name: 'ROLE_USER',
        description: 'User',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the role without role-id', async () => {
    await fakeRolesRepository.create({
      name: 'ROLE_ADM',
      description: 'Administrator',
    });

    await expect(
      updateRole.execute({
        role_id: '',
        name: 'ROLE_USER',
        description: 'User',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
