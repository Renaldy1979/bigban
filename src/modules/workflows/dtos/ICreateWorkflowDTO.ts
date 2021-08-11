import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';

export default interface ICreateWorkflowDTO {
  type_id: string;
  description: string;
  date_opened: string;
  date_closed: string;
  status_id: string;
  code_in: string;
  code_pb: string;
  code_bug: string;
  priority: string;
  requester_id: string;
  creater_id: string;
  updater_id: string;
}
