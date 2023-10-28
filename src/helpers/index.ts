export const generateRandomCode = () => {
  return Math.floor(Math.random() * (Math.floor(99999) - Math.ceil(12345)) + Math.ceil(12345));
};
export const generateDistance = (distance: number) => {
  if (distance < 100) {
    return "کمتر از 100 متر";
  }
  if (distance >= 100 && distance < 1000) {
    return `${Math.floor(distance)} متر`;
  }
  if (distance >= 1000) {
    return `${Math.floor(Math.floor(distance) / 1000)} کیلومتر`;
  }
};

export const generateDistanceColor = (distance: number) => {
  if (distance < 100) {
    return "green.400";
  }
  if (distance >= 100 && distance < 1000) {
    return "orange.400";
  }
  if (distance >= 1000) {
    return "red.400";
  }
};
