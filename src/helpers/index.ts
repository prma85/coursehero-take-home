// Helper from stackoverflow.com
const checkProperties = (obj) => {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] != "") return false;
  }
  return true;
};

const isNumber = (n) => Number.isInteger(Number(n));

const normalizeSemester = (val: string) => {
  val = val.toLocaleLowerCase();
  switch (val) {
    case "f":
    case "fall":
      return "Fall";
    case "w":
    case "winter":
      return "Winter";
    case "s":
    case "spring":
      return "Spring";
    case "su":
    case "summer":
      return "Summer";
  }
  return false;
};

const normalizeYear = (val: string | number) => {
  val = Number(val);
  if (!val || val > 2999 || val < 0) {
    return false;
  }
  if (val < 2000) {
    return 2000 + val;
  }
  return val;
};

export const getCourseFilters = (val: string) => {
  const words = val.split(" ");
  const delimiters = ["-", ":"];

  const state = {
    error: false,
    filter: {
      department: null as null | string,
      couseNumber: null as null | number,
      year: null as null | number,
      semester: null as null | string
    }
  };

  const checkForDepartmentAndCourse = (word) => {
    const delimiter = delimiters.filter((d) => new RegExp(d, "gi").test(word));
    // it can be a department + course n. since there is a delimiter
    if (delimiter.length === 1) {
      const [department, couseNumber] = word.toLowerCase().split(delimiter[0]);
      state.filter.department = department;
      state.filter.couseNumber = Number(couseNumber);
      return;
    }
    // it can be a department + course n. since there is letters with numbers
    if (/\d/.test(word)) {
      const [department, couseNumber] = word.split(/(\d+)/).filter(Boolean);
      state.filter.department = department;
      state.filter.couseNumber = couseNumber;
      return;
    }
    // there is only a number, it is not a valid format
    if (isNumber(word)) {
      state.error = true;
      return;
    }
    state.filter.department = word;
  };

  const checkSemesterAndYear = (word1, word2) => {
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
    const couseNumber = Number(words[1]);
    if (Number.isNaN(couseNumber)) {
      // make sure that it is the course number and not a string
      state.error = true;
      return state;
    }
    state.filter.couseNumber = couseNumber;
    checkSemesterAndYear(words[2], words[3] || null);
  } else {
    checkSemesterAndYear(words[1], words[2] || null);
  }

  // check if all the filters are fulfilled
  if (!checkProperties(state.filter)) state.error = true;

  return state;
};
