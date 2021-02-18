export interface Course {
  department: string;
  courseNumber: number;
  year: number;
  semester: string;
}

export const getCourseList = (): Promise<Course[]> =>
  fetch("./data.json").then((data) => data.json());
