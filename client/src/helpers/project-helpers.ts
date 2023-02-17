const getProjectStatusLabel = (status: string) => {
  switch (status) {
    case "new":
      return "Not started";
    case "progress":
      return "In progress";
    case "completed":
      return "Completed";
    default:
      return "";
  }
};

export {getProjectStatusLabel};
