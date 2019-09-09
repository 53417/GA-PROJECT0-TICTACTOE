let boardData = [];
let column = 0;
let row = 0;
let winCondition = 3;

//generator
function gameStart(columns, rows) {
  var arr = [];
  var count = 0;
	column = columns;
	row = rows;

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
    for (var y = 0; y < columns; y++) {
      count = count + 1;
      arr[i].push(count);
      boardData[boardData.length] = {ID: count, RID: i + 1, CID: y + 1, PLAYER: 0}
    }
    console.log(arr[i])
  }
  return 
};

//straight up
function vertUp(cellid) {
	if(boardData[cellid].RID < winCondition) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid - (column * i)].PLAYER) {
			return false
		};
	};
	return true;
};

//straight left
function vertLeft(cellid) {
	if(boardData[cellid].CID < winCondition) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid - i].PLAYER) {
			return false
		};
	};
	return true;
};

//straight down
function vertDown(cellid) {
	if(boardData[cellid].RID > row - winCondition + 1) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid + (column * i)].PLAYER) {
			return false
		};
	};
	return true;
};

//straight right
function vertRight(cellid) {
	if(boardData[cellid].CID > column - winCondition + 1) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid + i].PLAYER) {
			return false
		};
	};
	return true;
};

// hoz top right
function hozTopRight(cellid) {
	if(boardData[cellid].RID < winCondition || 
		boardData[cellid].CID > column - winCondition + 1) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid - (column * i) + i].PLAYER) {
			return false
		};
	};
	return true;
};

//hoz bottom right
function hozBotRight(cellid) {
	if(boardData[cellid].RID > row - winCondition + 1 || 
		boardData[cellid].CID > column - winCondition + 1) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid + (column * i) + i].PLAYER) {
			return false
		};
	};
	return true;
};

//hoz bottom left
function hozBotLeft(cellid) {
	if(boardData[cellid].RID > row - winCondition + 1 || 
		boardData[cellid].CID < winCondition) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid + (column * i) - i].PLAYER) {
			return false
		};
	};
	return true;
};

//hoz top left
function hozTopLeft(cellid) {
	if(boardData[cellid].RID < winCondition || 
		boardData[cellid].CID < winCondition) {
		return false
	};
	for (let i = 1; i < winCondition; i++) {
		if(boardData[cellid].PLAYER !== boardData[cellid - (column * i) - i].PLAYER) {
			return false
		};
	};
	return true;
};

function winCheck(cid) {
	if(
		vertUp(cid) === true ||
		vertRight(cid) === true ||
		vertDown(cid) === true ||
		vertLeft(cid) === true ||
		hozTopRight(cid) === true ||
		hozBotRight(cid) === true ||
		hozBotLeft(cid) === true ||
		hozTopLeft(cid) === true
	) {
		return console.log('Winner!!!')
	};
	return console.log('no winner')
};


$(document).ready(function(){  

$("#start-game").click(function(){
    document.getElementById("game-board").innerHTML = "";
    let columns = document.getElementById('input-columns').value;
    let rows = document.getElementById('input-rows').value;
    gameStart(columns, rows);

});
});
/*
for (var y = 0; y < rows; y++) {
    arr[y] = [];
    for (var x = 0; x < columns; x++) {
      count = count + 1;
      arr[y].push(count);
      boardData[boardData.length] = {ID: count, RID: y + 1, CID: x + 1, PLAYER: 0}
    }
*/

function displayHistory() {
    let count = 0;
	document.getElementById("game-board").innerHTML = "";
    for(let y = 0; y < rows; y++) {
        document.createElement('tr').innerhtml = `${flipHistory[i][0]} \t ${flipHistory[i][1]} \t ${flipHistory[i][2]} \t ${flipHistory[i][3]}`;
        document.getElementById("history-table").append(document.createElement('li'))
    }
}
