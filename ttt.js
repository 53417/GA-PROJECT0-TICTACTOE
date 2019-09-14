let boardData = [];
let column = 0;
let row = 0;
let winCondition = 0;
let turn = 1
let turnCount = 0;
let p1Score = 0;
let p2Score = 0;
let p1IconPic = "fa-times";
let p1IconColor = "select-black";
let p2IconPic = "fa-circle";
let p2IconColor = "select-black";

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
      boardData[boardData.length] = {ID: count, RID: i + 1, CID: y + 1, PLAYER: "no-input"}
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
		return true
	};
	return false
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
			tempTable += `<td id="cell${count}" style="width:${100/column}%;height:${100/row}%" class="game-cell"><\/td>`;
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

		if(boardData[i-1].PLAYER !== "no-input") {
			return
		};

		turnCount = turnCount + 1;
		if(turnCount > boardData.length - 1) {
			$("#draw-page").slideDown().delay(1200).slideUp();
			gameStartFull();
			turnCount = 0;
		};

		let tCell = `cell${i}`;
		if(turn === 1) {
			//document.getElementById('cell'+i).innerHTML = "X";
			boardData[i-1].PLAYER = "X";
			updateDisplay();
			if(winCheck(i - 1) === true) {
				p1Score = p1Score + 1;
				updateDisplay();
				clearDisplay();
				$("#p1-winner-page").slideDown().delay(1200).slideUp();
				gameStartFull();
				turnCount = 0;
			};
			turn = 2;
			return;
		};
		if (turn === 2) {
			//document.getElementById('cell'+i).innerHTML = "O";
			boardData[i-1].PLAYER = "O";
			updateDisplay();
			if(winCheck(i - 1) === true) {
				p2Score = p2Score + 1;
				updateDisplay();
				clearDisplay();
				$("#p2-winner-page").slideDown().delay(1200).slideUp();
				gameStartFull();
				turnCount = 0;
			};
			turn = 1;
			return;
		}
	}
};

function updateDisplay() {
	//document.getElementById("p1-score").innerHTML = p1Score;
	//document.getElementById("p2-score").innerHTML = p2Score;
	for(let i = 0; i < boardData.length; i++) {
		if(boardData[i].PLAYER === "X") {
			document.getElementById('cell'+(i+1)).innerHTML = `<i class="fas ${p1IconPic} ${p1IconColor}"></i>`;
		}
		if(boardData[i].PLAYER === "O") {
			document.getElementById('cell'+(i+1)).innerHTML = `<i class="fas ${p2IconPic} ${p2IconColor}"></i>`;
		}
	};
	let scores = `
		<a id="p1-score" class="player-icons">${p1Score}</a>
		<a id="p1-icon" class="player-icons fas ${p1IconPic} ${p1IconColor}"></a>
		<a class="player-icons">|</a>
		<a id="p2-icon" class="player-icons fas ${p2IconPic} ${p2IconColor}"></a>
		<a id="p2-score" class="player-icons">${p2Score}</a>`;
	document.getElementById("player-scores").innerHTML = scores;

};

function clearDisplay() {
	$("#settings-page").slideUp();
	$("#set-p1-icon-page").slideUp();
	$("#set-p2-icon-page").slideUp();
	$("#p1-winner-page").slideUp();
	$("#p2-winner-page").slideUp();
	$("#draw-page").slideUp();
};

function gameStartFull() {
	boardData = [];
	document.getElementById("game-board").innerHTML = "";
	gameStart();
	gameStartHtml();
	for(var i = 1; i < boardData.length + 1; i++) {
		$('#cell' + i).click( cellClick(i) );
	};
};

$(document).ready(function(){  
	$("#set-p1-button").click(function(){  
		clearDisplay();
		$("#set-p1-icon-page").slideDown();
	});

	$("#set-p2-button").click(function(){  
		clearDisplay();
		$("#set-p2-icon-page").slideDown();
	});

	$("#settings-button").click(function(){  
		clearDisplay();
		$("#settings-page").slideDown();
	});

	$("#gameplay-button").click(function(){  
		clearDisplay();
	});

	$(".selColorBox1").on('click', function(e){
		// console.log($(this).children().children().closest('i'))
		//console.log($(e.target).closest('i').prevObject[0].parentNode.classList[3]);
		p1IconColor = $(e.target).closest('i').prevObject[0].parentNode.classList[3];
		updateDisplay();
	});

	$(".selColorBox2").on('click', function(e){
		//console.log($(e.target).closest('i').prevObject[0].parentNode.classList[3]);
		p2IconColor = $(e.target).closest('i').prevObject[0].parentNode.classList[3];
		updateDisplay();
	});

	$(".selIconBox1").on('click', function(e){
		//console.log($(e.target).closest('i').prevObject[0].parentNode.classList[1]);
		p1IconPic = $(e.target).closest('i').prevObject[0].parentNode.classList[1];
		updateDisplay();
	});

	$(".selIconBox2").on('click', function(e){
		//console.log($(e.target).closest('i').prevObject[0].parentNode.classList[1]);
		p2IconPic = $(e.target).closest('i').prevObject[0].parentNode.classList[1];
		updateDisplay();
	});

	$("#start-game").click(function(){
		clearDisplay();
		gameStartFull();
	});

	$("#reset").click(function(){
		console.clear();
		clearDisplay();
		boardData = [];
		column = 0;
		row = 0;
		winCondition = 0;
		turn = 1
		turnCount = 0;
		p1Score = 0;
		p2Score = 0;
		updateDisplay;
	});

});
//end doc ready functions