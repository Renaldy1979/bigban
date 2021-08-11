import WorkflowEvolution from '@modules/workflows/infra/typeorm/entities/WorkflowEvolution';
import ICreateWorkflowEvolutionsDTO from '../dtos/ICreateWorkflowEvolutionsDTO';

export default interface IWorkflowsEvolutionsRepository {
  findById(id: string): Promise<WorkflowEvolution | undefined>;
  findByWorkflowId(
    workflow_id: string,
  ): Promise<WorkflowEvolution[] | undefined>;
  index(): Promise<WorkflowEvolution[] | undefined>;
  create(data: ICreateWorkflowEvolutionsDTO): Promise<WorkflowEvolution>;
}
