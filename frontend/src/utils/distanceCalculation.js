export const getRemainingDistanceDetails = (
  initialDistance,
  totalDistance,
  threshold
) => {
  const coveredDistance = totalDistance - initialDistance;
  const remainingDistance = threshold - coveredDistance;

  if (remainingDistance < 100) {
    return { remaining: remainingDistance, color: "#fd1440" };
  }

  if (remainingDistance < 1000) {
    return { remaining: remainingDistance, color: "#ff7711" };
  }

  return { remaining: remainingDistance, color: "#14cc77" };
};
