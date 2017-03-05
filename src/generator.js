function getRandomArbitrary(min, max) {
 	return Math.random() * (max - min) + min;
}

export default function(range, levels) {
	function addPoint (p1, p2, groundY, level) {
		let newP = {};
		let midX = (p1.x + p2.x)/2;
		let diffY = p1.y + p2.y;
		let midY = (diffY)/2;
		let currentRange = range / (2 ** (levels - level - 1));
		let displacement = getRandomArbitrary(0, currentRange);

		// if(level === 1) {
		// 	displacement = getRandomArbitrary(0, currentRange*0.8)
		// } else {
		// 	displacement = getRandomArbitrary(-currentRange*0.8, currentRange*0.8)
		// }

		newP.x = midX;
		newP.y = midY + displacement;

		return newP;
	}

	function generatePoints(points, groundY, level = levels) {
		if(level === 0) {
			return points;
		}

		let p1 = points[0];
		let p2 = points[1];
		let newPoint = addPoint(p1, p2, groundY, level);

		let leftPoints = generatePoints([p1, newPoint], groundY, level - 1);
		let rightPoints = generatePoints([newPoint, p2], groundY, level - 1);

		return leftPoints.slice(0, leftPoints.length-1).concat(rightPoints);
	}

	return {
		addPoint: addPoint,
		generatePoints: generatePoints
	};
};