export type Post = {
  id: string;
  title: string;
  /** Company.id */
  resourceUid: string;
  /** "YYYY-MM" 형식 (예: "2024-02") */
  dateTime: string;
  content: string;
};
