export const resolveAirConditionLabel = (usEpaIndex) => {
  switch (usEpaIndex) {
    case 1:
      return "Good";

    case 2:
      return "Moderate";

    case 3:
      return "Unhealthy for sensitive group";

    case 4:
      return "Unhealthy";

    case 5:
      return "Very Unhealthy";

    case 6:
      return "Hazardous";

    default:
      return "None";
  }
};
