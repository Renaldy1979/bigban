import WorkflowAttributes from '@modules/workflows/infra/typeorm/entities/WorkflowAttributes';
import ICreateWorkflowsAttributesDTO from '../dtos/ICreateWorkflowsAttributesDTO';

export default interface IWorkflowsAttributesRepository {
  create(data: ICreateWorkflowsAttributesDTO): Promise<WorkflowAttributes>;
  index(): Promise<WorkflowAttributes[]>;
  // findByDescription(description: string): Promise<Status | undefined>;
  findByAttributeId(
    attribute_id: string,
  ): Promise<WorkflowAttributes[] | undefined>;
}
