
function runner(gridList, startX, startY, endX, endY) {

	let counter = 0;

	const gridValues = getGridValues(gridList);

	const insideStart = stayInGrid(gridList, startX, startY);

	const insideEnd = stayInGrid(gridList, endX, endY);

	const cells = getCells(gridList, gridValues, startX, startY, endX, endY);

	if (!gridValues) return 'Invalid grid list';
	if (!insideStart) return 'Invalid start cell';
	if (!insideEnd) return 'Invalid end cell';
	if (gridValues[startX][startY] !== '.') return 'Locked start cell';
	if (gridValues[endX][endY] !== '.') return 'Locked end cell';

	function getGridValues(gridList) {
		let gridValues = [];
		let gridRow = [];

		if (!Array.isArray(gridList)) return;
		if (gridList.length === 1 || gridList.length >= 100) return;

		for (let i = 0; i < gridList.length; i++) {
			gridRow = gridList[i].split('');
			gridValues[i] = [];

			if (gridRow.length !== gridList.length) return;
			if (i > 0 && gridRow.length !== gridValues[i - 1].length) return;

			for (let j = 0; j < gridRow.length; j++) {
				const gridValue = gridRow[j];

				if (gridValue !== '.' && gridValue !== 'X') return;

				gridValues[i][j] = gridValue;
			}
		}

		return gridValues;
	}

	function stayInGrid(gridList, x, y) {
		const maxX = gridList.length - 1;
		const maxY = gridList[0].split('').length - 1;

		if (typeof x !== 'number' || typeof y !== 'number') {
			return false;
		}
		if (x < 0 || x > maxX) return false;
		if (y < 0 || y > maxY) return false;

		return true;
	}

	function checkCell(gridList, x, y, cells, gridValues) {
		const inside = stayInGrid(gridList, x, y);

		if (!inside) return;
		if (gridValues[x][y] === 'X') return;

		const found = cells.find(cell => cell.x === x && cell.y === y);

		if (found) return;

		cells[++counter] = { x, y };
	}

	function getCells(gridList, gridValues, startX, startY, endX, endY) {

		let countingEnd = false;

		const cells = [{ x: startX, y: startY }];

		let cellNumber = 0;

		while (!countingEnd) {
			if (!cells[cellNumber]) return;

			const x = cells[cellNumber].x;
			const y = cells[cellNumber].y;
			checkCell(gridList, x - 1, y, cells, gridValues);
			checkCell(gridList, x, y + 1, cells, gridValues);
			checkCell(gridList, x + 1, y, cells, gridValues);
			checkCell(gridList, x, y - 1, cells, gridValues);
			checkCell(gridList, x - 1, y - 1, cells, gridValues);
			checkCell(gridList, x - 1, y + 1, cells, gridValues);
			checkCell(gridList, x + 1, y + 1, cells, gridValues);
			checkCell(gridList, x + 1, y - 1, cells, gridValues);

			const last = cells.find(cell => cell.x === endX && cell.y === endY);

			if (last) countingEnd = true;

			cellNumber++;
			console.log(last)

		}
		return cells;
	}

	function getStepsArray(x, y, path, stepsArray) {

		const found = path.find(cell => cell.x === x && cell.y === y);

		if (!found || (!found.steps && found.steps !== 0)) return stepsArray;

		stepsArray.push(found.steps);
		console.log(stepsArray)

		return stepsArray;
	}

	function getSteps(calls) {
		const path = [...calls];
		path[0].steps = 0;

		for (let i = 1; i < path.length; i++) {
			const x = path[i].x;
			const y = path[i].y;
			let stepsArray = [];
			stepsArray = getStepsArray(x - 1, y, path, stepsArray);
			stepsArray = getStepsArray(x, y + 1, path, stepsArray);
			stepsArray = getStepsArray(x + 1, y, path, stepsArray);
			stepsArray = getStepsArray(x, y - 1, path, stepsArray);
			stepsArray = getStepsArray(x - 1, y - 1, path, stepsArray);
			stepsArray = getStepsArray(x - 1, y + 1, path, stepsArray);
			stepsArray = getStepsArray(x + 1, y + 1, path, stepsArray);
			stepsArray = getStepsArray(x + 1, y - 1, path, stepsArray);
			path[i].steps = Math.min(...stepsArray) + 1;
		}
		console.log(path)

		return path[path.length - 1].steps;
	}
	return getSteps(cells);
}

const result = runner(
	[
		'.X.',
		'.X.',
		'...',
	],
	2, 1,
	0, 2
);

const resultElement = document.getElementById('result');
resultElement.textContent = result;