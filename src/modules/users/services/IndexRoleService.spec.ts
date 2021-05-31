// import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import IndexRoleService from './IndexRoleService';

let fakeRolesRepository: FakeRolesRepository;
let indexRole: IndexRoleService;

describe('IndexRoles', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();
    indexRole = new IndexRoleService(fakeRolesRepository);
  });
  it('should be able to show all roles', async () => {
    const role1 = await fakeRolesRepository.create({
      name: 'ROLE_ADM',
      description: 'Administrator',
    });

    const role2 = await fakeRolesRepository.create({
      name: 'ROLE_USER',
      description: 'User',
    });

    const listRoles = await indexRole.execute();

    expect(listRoles).toEqual([role1, role2]);
  });
});
