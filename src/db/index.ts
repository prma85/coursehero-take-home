export interface Course {
  department: string;
  courseNumber: number;
  year: number;
  semester: string;
}

// Just creating a pseudo API call for a local database
export const getCourseList = (): Promise<Course[]> =>
  fetch("./data.json").then((data) => data.json());
