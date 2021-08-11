import Workflow from '@modules/workflows/infra/typeorm/entities/Workflow';
import ICreateWorkflowDTO from '../dtos/ICreateWorkflowDTO';

export default interface IWorkflowsRepository {
  create(data: ICreateWorkflowDTO): Promise<Workflow>;
  index(): Promise<Workflow[]>;
  show(id: string): Promise<Workflow | undefined>;
  // findByDescription(description: string): Promise<Status | undefined>;
  findById(id: string): Promise<Workflow | undefined>;
  findByAttibuteId(attribute_id: string): Promise<Workflow[] | undefined>;
}
