let boardData = [];
let column = 0;
let row = 0;
let winCondition = 0;
let turn = 1

//generator
function gameStart() {
	let columns = document.getElementById('input-columns').value;
	let rows = document.getElementById('input-rows').value;
	let winConditions = document.getElementById('input-wincond').value;
	var arr = [];
	var count = 0;
	column = columns;
    row = rows;
    winCondition = winConditions;

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
    for (var y = 0; y < columns; y++) {
      count = count + 1;
      arr[i].push(count);
      boardData[boardData.length] = {ID: count, RID: i + 1, CID: y + 1, PLAYER: 0}
    }
    //console.log(arr[i])
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

function gameStartHtml() {
    let count = 1;
    let gx = 1;
    let gy = 1;
	document.getElementById("game-board").innerHTML = "";
	let tempTable = '<table class="game-board">';
    for(let y = 0; y < row; y++) {
		tempTable += `<tr id="row${gy}">`;
        for (var x = 0; x < column; x++) {
			tempTable += `<td id="cell${count}" style="width:${100/column}%;height:${100/row}%" class="game-cell">${count}<\/td>`;
            count = count + 1;
		};
		tempTable += '<\/tr>';
        gy = gy + 1;
	};
	tempTable += '<\/table>';
	document.getElementById('game-board').innerHTML = tempTable;
	$(".game-board-box").css("height", $(".game-board-box").width());
};

function cellClick(i){
	return function(){
		console.log(`you clicked ${i}`);
		let tCell = `cell${i}`;
		if(turn === 1) {
			document.getElementById('cell'+i).innerHTML = "X";
			boardData[i-1].PLAYER = "X";
			winCheck(i-1);
			turn = 2;
			return console.log(turn);
		};
		if (turn === 2) {
			document.getElementById('cell'+i).innerHTML = "O";
			boardData[i-1].PLAYER = "O";
			winCheck(i-1);
			turn = 1;
			return console.log(turn);
		}
	}
};

$(document).ready(function(){  
	$("#set-p1-button").click(function(){  
//		$("#set-p1-icon-page").slideToggle();
		$("#set-p1-icon-button").css("display", "none");
		console.log("clicked");
	});
});  

$(document).ready(function(){  
	//start game button on click
	$("#start-game").click(function(){
		boardData = [];
		document.getElementById("game-board").innerHTML = "";
		gameStart();
		gameStartHtml();
		console.log(boardData);
		for(var i = 1; i < boardData.length + 1; i++) {
			$('#cell' + i).click( cellClick(i) );
		};
	});
});

$(document).ready(function(){  
	$("#reset").click(function(){
		console.clear();
		boardData = [];
		document.getElementById("game-board").innerHTML = "";
		gameStart();
		gameStartHtml();
		console.log(boardData);
		for(var i = 1; i < boardData.length + 1; i++) {
			$('#cell' + i).click( cellClick(i) );
		};
	});
});
//end doc ready functions