export type JobPosition = {
  id: number;
  title: string;
  location: {
    name: string;
  };
  absolute_url: string;
  metadata: [
    {
      id: number;
      name: string;
      value: string;
      value_type: string;
    }
  ];
  internal_job_id: number;
  data_compliance: [
    {
      type: string;
      requires_consent: boolean;
      requires_processing_consent: boolean;
      requires_retention_consent: boolean;
      retention_period: string;
    }
  ];
  updated_at: string;
  requisition_id: number;
  content?: string;
  departments?: [
    {
      id: number;
      name: string;
      child_ids: number[];
      parent_id: number;
    }
  ];
  offices?: [
    {
        id: number;
        name: string;
        location: string;
        child_ids: number[];
        parent_id: number;
    }]
};
export type Jobs = JobPosition[];
export type JobsResponse = {
  jobs: Jobs;
  meta: {
    total: number;
  }
}

// API response currently matches JobPosition type
export type JobPositionResponse = JobPosition
