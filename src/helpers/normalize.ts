export const normalizeSemester = (val: string) => {
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

export const normalizeYear = (val: string | number) => {
  val = Number(val);
  if (!val || val > 2999 || val < 0) {
    return false;
  }
  if (val < 2000) {
    return 2000 + val;
  }
  return val;
};
