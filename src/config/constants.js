const EVENT_TYPES = [
  'workflow_started',
  'workflow_completed',
  'sla_breach',
  'case_delayed',
  'approval_pending'
];

const ANOMALY_TYPES = [
  'SLA Breach',
  'Performance Degradation',
  'System Error',
  'Unusual Delay'
];

const SEVERITY_LEVELS = ['low', 'medium', 'high', 'critical'];

const BROADCAST_EVENT_TYPES = [
  { type: 'sla_breach', severity: 'high', message: 'SLA breach detected on workflow' },
  { type: 'case_delayed', severity: 'medium', message: 'Case processing delayed' },
  { type: 'workflow_completed', severity: 'low', message: 'Workflow completed successfully' },
  { type: 'approval_pending', severity: 'medium', message: 'Approval required for workflow' },
  { type: 'system_alert', severity: 'critical', message: 'System performance degradation' }
];

module.exports = {
  EVENT_TYPES,
  ANOMALY_TYPES,
  SEVERITY_LEVELS,
  BROADCAST_EVENT_TYPES
};
