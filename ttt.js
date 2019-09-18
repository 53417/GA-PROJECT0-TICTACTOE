let boardData = [];
let column = 0;
let row = 0;
let winCondition = 0;
let turn = 0;
let turnCount = 0;
let p1Score = 0;
let p2Score = 0;
let p1IconPic = "fa-times";
let p1IconColor = "select-black";
let p2IconPic = "fa-circle";
let p2IconColor = "select-black";

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

function gameStart() {
	//VAR CLEANSE
	boardData = [];
	turn = 1;
	turnCount = 0;
	document.getElementById("game-board").innerHTML = "";

	//VAR RENEW
	var arr = [];
	var count = 0;

	//TABLE DATA GENERATOR
	for (var i = 0; i < row; i++) {
		arr[i] = [];
		for (var y = 0; y < column; y++) {
			count = count + 1;
			arr[i].push(count);
			boardData[boardData.length] = {ID: count, RID: i + 1, CID: y + 1, PLAYER: "no-input"}
		}
	};

	// HTML TABLE GENERATOR
    let gx = 1;
	let gy = 1;
	let gCount = 1;
	let tempTable = '<table class="game-board">';
    for(let y = 0; y < row; y++) {
		tempTable += `<tr id="row${gy}">`;
        for (var x = 0; x < column; x++) {
			tempTable += `<td id="cell${gCount}" style="width:${100/column}%;height:${100/row}%"><\/td>`;
            gCount = gCount + 1;
		};
		tempTable += '<\/tr>';
        gy = gy + 1;
	};
	tempTable += '<\/table>';
	document.getElementById('game-board').innerHTML = tempTable;
	$(".game-board-box").css("height", $(".game-board-box").width());
	

	// CLICK GENERATOR
	for(var i = 1; i < boardData.length + 1; i++) {
		$('#cell' + i).click( cellClick(i) );
	};

	updateDisplay();

};

function cellClick(i){
	return function(){
		if(boardData[i-1].PLAYER !== "no-input") {
			return
		};
		turnCount = turnCount + 1;
		if(turnCount > boardData.length - 1) {
			clearDisplay();
			$("#draw-page").slideDown().delay(1200).slideUp();
			gameStart();
			turnCount = 0;
			updateDisplay();
			return;
		};
		if(turn === 1) {
			boardData[i-1].PLAYER = "X";
			if(winCheck(i - 1) === true) {
				p1Score = p1Score + 1;
				clearDisplay();
				$("#p1-winner-page").slideDown().delay(1200).slideUp();
				gameStart();
				turnCount = 0;
			};
			turn = 2;
			updateDisplay();
			return;
		};
		if (turn === 2) {
			boardData[i-1].PLAYER = "O";
			updateDisplay();
			if(winCheck(i - 1) === true) {
				p2Score = p2Score + 1;
				clearDisplay();
				$("#p2-winner-page").slideDown().delay(1200).slideUp();
				gameStart();
				turnCount = 0;
			};
			turn = 1;
			updateDisplay();
			return;
		}
	}
};

function updateDisplay() {
	if(column >= row) {
		for(let i = 0; i < boardData.length; i++) {
			if(boardData[i].PLAYER === "X") {
				document.getElementById('cell'+(i+1)).innerHTML = `<div style="margin:auto"><i class="fas ${p1IconPic} ${p1IconColor}" style="font-size:${25/column}vmin"></i></div>`;
			}
			if(boardData[i].PLAYER === "O") {
				document.getElementById('cell'+(i+1)).innerHTML = `<div style="margin:auto"><i class="fas ${p2IconPic} ${p2IconColor}" style="font-size:${25/column}vmin"></i></div>`;
			}
		};
	};
	if(column < row) {
		for(let i = 0; i < boardData.length; i++) {
			if(boardData[i].PLAYER === "X") {
				document.getElementById('cell'+(i+1)).innerHTML = `<div style="margin:auto"><i class="fas ${p1IconPic} ${p1IconColor}" style="font-size:${25/row}vmin"></i></div>`;
			};
			if(boardData[i].PLAYER === "O") {
				document.getElementById('cell'+(i+1)).innerHTML = `<div style="margin:auto"><i class="fas ${p2IconPic} ${p2IconColor}" style="font-size:${25/row}vmin"></i></div>`;
			};
		};
	};
	if(turn === 2) {
		return document.getElementById("player-scores").innerHTML =
			`<a id="p1-score" class="player-icons">${p1Score}</a>
			<a id="p1-icon" class="player-icons fas ${p1IconPic} ${p1IconColor}"></a>
			<a class="player-icons">|</a>
			<a id="p2-icon" class="player-icons fas ${p2IconPic} ${p2IconColor}"></a>
			<a id="p2-score" class="player-icons" style="background-color:#C8C8C8; border-radius:25px">${p2Score}</a>`;
	}
	if(turn === 1) {
		return document.getElementById("player-scores").innerHTML = 
			`<a id="p1-score" class="player-icons" style="background-color:#C8C8C8; border-radius:25px">${p1Score}</a>
			<a id="p1-icon" class="player-icons fas ${p1IconPic} ${p1IconColor}"></a>
			<a class="player-icons">|</a>
			<a id="p2-icon" class="player-icons fas ${p2IconPic} ${p2IconColor}"></a>
			<a id="p2-score" class="player-icons">${p2Score}</a>`;
	}
	else {
		return document.getElementById("player-scores").innerHTML =
			`<a id="p1-score" class="player-icons">${p1Score}</a>
			<a id="p1-icon" class="player-icons fas ${p1IconPic} ${p1IconColor}"></a>
			<a class="player-icons">|</a>
			<a id="p2-icon" class="player-icons fas ${p2IconPic} ${p2IconColor}"></a>
			<a id="p2-score" class="player-icons">${p2Score}</a>`;
	}
};

function clearDisplay() {
	$("#settings-page").slideUp();
	$("#set-p1-icon-page").slideUp();
	$("#set-p2-icon-page").slideUp();
	$("#p1-winner-page").slideUp();
	$("#p2-winner-page").slideUp();
	$("#draw-page").slideUp();
	$("#error-on-start").slideUp();
	$("#splash-page").slideUp();
};

$(document).ready(function(){
	$("#splash-button").click(function(){  
		clearDisplay();
		$("#settings-page").slideDown();
	});
	
	$("#settings-button").click(function(){  
		$("#set-p1-icon-page").slideUp();
		$("#set-p2-icon-page").slideUp();
		$("#p1-winner-page").slideUp();
		$("#p2-winner-page").slideUp();
		$("#draw-page").slideUp();
		$("#error-on-start").slideUp();
		$("#splash-page").slideUp();
		$("#settings-page").slideToggle();
	});

	$("#set-p1-button").click(function(){  
		$("#settings-page").slideUp();
		$("#set-p2-icon-page").slideUp();
		$("#p1-winner-page").slideUp();
		$("#p2-winner-page").slideUp();
		$("#draw-page").slideUp();
		$("#error-on-start").slideUp();
		$("#splash-page").slideUp();
		$("#set-p1-icon-page").slideToggle();
	});

	$("#set-p2-button").click(function(){  
		$("#settings-page").slideUp();
		$("#set-p1-icon-page").slideUp();
		$("#p1-winner-page").slideUp();
		$("#p2-winner-page").slideUp();
		$("#draw-page").slideUp();
		$("#error-on-start").slideUp();
		$("#splash-page").slideUp();
		$("#set-p2-icon-page").slideToggle();
	});

	$("#home-button").click(function(){  
		clearDisplay();
		$("#splash-page").slideDown();
	});

	$(".selColorBox1").on('click', function(e){
		p1IconColor = $(e.target).closest('i').prevObject[0].parentNode.classList[3];
		updateDisplay();
	});

	$(".selColorBox2").on('click', function(e){
		p2IconColor = $(e.target).closest('i').prevObject[0].parentNode.classList[3];
		updateDisplay();
	});

	$(".selIconBox1").on('click', function(e){
		p1IconPic = $(e.target).closest('i').prevObject[0].parentNode.classList[1];
		updateDisplay();
	});

	$(".selIconBox2").on('click', function(e){
		p2IconPic = $(e.target).closest('i').prevObject[0].parentNode.classList[1];
		updateDisplay();
	});

	$("#start-game").click(function(){
		column = parseInt(document.getElementById('input-columns').value);
		row = parseInt(document.getElementById('input-rows').value);
		winCondition = parseInt(document.getElementById('input-wincond').value);
		if(column < 0 || row < 0 || winCondition < 0) {
			$("#error-on-start").html("<h2>Variables must be greater than 0</h2>");
			$("#error-on-start").slideDown().delay(1200).slideUp();
			return
		};
		if(winCondition > column && winCondition > row) {
			$("#error-on-start").html("<h2>Win condition not possible</h2>");
			$("#error-on-start").slideDown().delay(1200).slideUp();
			return
		};
		clearDisplay();
		gameStart();
	});

	$("#3x3Game").click(function(){
		column = 3;
		row = 3;
		winCondition = 3;
		clearDisplay();
		gameStart();
	});

	$("#7x7Game").click(function(){
		column = 7;
		row = 7;
		winCondition = 4;
		clearDisplay();
		gameStart();
	});

	$("#10x10Game").click(function(){
		column = 10;
		row = 10;
		winCondition = 5;
		clearDisplay();
		gameStart();
	});

	$("#reset").click(function(){
		document.getElementById("game-board").innerHTML = "";
		clearDisplay();
		boardData = [];
		column = 0;
		row = 0;
		winCondition = 0;
		turn = 0;
		turnCount = 0;
		p1Score = 0;
		p2Score = 0;
		updateDisplay();
		$("#settings-page").slideDown();
	});

});