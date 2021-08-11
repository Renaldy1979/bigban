import WorkflowStatus from '@modules/workflows/infra/typeorm/entities/WorkflowStatus';
import ICreateWorkflowStatusDTO from '../dtos/ICreateWorkflowStatusDTO';

export default interface IWorkflowsStatusRepository {
  findById(id: string): Promise<WorkflowStatus | undefined>;
  index(): Promise<WorkflowStatus[] | undefined>;
  create(data: ICreateWorkflowStatusDTO): Promise<WorkflowStatus>;
}
