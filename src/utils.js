export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function mapPointsToCanvas(points, canvasWidth, canvasHeight, offsetHeight = 0) {
  return points.reduce((string, point) => {
      return string + point.x*canvasWidth + "," + ((canvasHeight - offsetHeight) - point.y * (canvasHeight - 1.5*offsetHeight)) + " ";
    }, "");
}