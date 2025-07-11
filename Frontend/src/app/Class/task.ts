import { Priority } from "./priority";
import { Status } from "./status";


export class Task {
  id!: number;
  title: string;
  description!: string;
  dueDate!: Date;
  priority!: Priority;
  status!: Status;
}
