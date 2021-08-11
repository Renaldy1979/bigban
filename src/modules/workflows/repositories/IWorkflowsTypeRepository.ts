import WorkflowType from '@modules/workflows/infra/typeorm/entities/WorkflowType';
import ICreateWorkflowTypeDTO from '../dtos/ICreateWorkflowTypeDTO';

export default interface IWorkflowsTypeRepository {
  findById(id: string): Promise<WorkflowType | undefined>;
  index(): Promise<WorkflowType[] | undefined>;
  create(data: ICreateWorkflowTypeDTO): Promise<WorkflowType>;
}
