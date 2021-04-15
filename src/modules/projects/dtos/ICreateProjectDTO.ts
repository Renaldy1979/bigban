export default interface ICreateProjectDTO {
  name: string;
  code: string;
  initiative: string;
  segment_priority: string;
  portfolio: string;
  effort: string;
  brief_description: string;
  justification: string;
  requester_id: string;
  request_date: Date;
  scope_date: Date;
  shipping_date: Date;
  post_date: Date;
  rollout_date: Date;
  expectation_date: Date;
  validated_scope: string;
  responsible_status: string;
  internal_status: string;
  internal_book: string;
  created_by: string;
  updated_by: string;
}