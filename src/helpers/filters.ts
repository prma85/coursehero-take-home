import { normalizeYear, normalizeSemester } from "./normalize";

export const isNumber = (n: string) => Number.isInteger(Number(n));

// Got refactored few times
// First this was just a big function with IF inside of IFs inside of more IFs
// I divided it in the normalizing function (that don't share data) and few closures (wich will share the state)
// It also took a while and couple different tries to get all cases on checkForDepartmentAndCourse()

export function getCourseFilters(val: string) {
  const words = val.split(" ");
  const delimiters = ["-", ":"];

  let state = {
    error: false,
    filter: {
      department: null as null | string,
      couseNumber: null as null | number,
      year: null as null | number,
      semester: null as null | string
    }
  };

  const checkForDepartmentAndCourse = (word: string) => {
    const delimiter = delimiters.filter((d) => new RegExp(d, "gi").test(word));
    // it can be a department + course n. since there is a delimiter
    if (delimiter.length === 1) {
      const [department, couseNumber] = word.toUpperCase().split(delimiter[0]);
      state.filter.department = department;
      state.filter.couseNumber = Number(couseNumber);
      return;
    }
    // it can be a department + course n. since there is letters with numbers
    if (/\d/.test(word)) {
      const [department, couseNumber] = word
        .toUpperCase()
        .split(/(\d+)/)
        .filter(Boolean);
      state.filter.department = department;
      state.filter.couseNumber = Number(couseNumber);
      return;
    }
    // there is only a number, it is not a valid format
    if (isNumber(word)) {
      state.error = true;
      return;
    }
    state.filter.department = word.toUpperCase();
  };

  const checkSemesterAndYear = (word1: string, word2?: string) => {
    let semester, year;

    // only one word, but no year
    if (!word2 && !/\d/.test(word1)) {
      state.error = true;
      return;
    }

    // semester and year are only one word or the info is incomplete
    if (word2) {
      if (isNumber(word1)) {
        year = word1;
        semester = word2;
      } else {
        year = word2;
        semester = word1;
      }

      // There is no word 2, in this case, semester and year are togheter
    } else {
      [semester, year] = word1.split(/(\d+)/).filter(Boolean);
    }

    const parsedSemester = normalizeSemester(semester);
    const parsedYear = normalizeYear(year);

    // one of the two values are invalid
    if (!parsedSemester || !parsedYear) {
      state.error = true;
      return;
    }

    state.filter.semester = parsedSemester;
    state.filter.year = parsedYear;
  };

  // only consider full strings
  // Department+CourseNumber, followed by Semester+Year.
  if (words.length < 2 && words.length > 4) {
    state.error = true;
    return state;
  }

  checkForDepartmentAndCourse(words[0]);
  if (state.error) return state; // there is an error when checking for the department name

  if (!state.filter.couseNumber) {
    if (!isNumber(words[1])) {
      // make sure that it is the course number and not a string
      state.error = true;
      return state;
    }
    state.filter.couseNumber = Number(words[1]);

    checkSemesterAndYear(words[2], words[3]);
  } else {
    checkSemesterAndYear(words[1], words[2]);
  }

  // check if all the filters are fulfilled
  if (
    !state.filter.couseNumber ||
    !state.filter.department ||
    !state.filter.semester ||
    !state.filter.year
  ) {
    state.error = true;
  }

  return state;
}
