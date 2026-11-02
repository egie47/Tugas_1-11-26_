export type Post = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed";
};
