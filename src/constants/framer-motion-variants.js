export const variants = {
  hourForecast: {
    initial: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    animate: {
      opacity: 1,
      transform: "scale(1)",
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
    },
  },
};
