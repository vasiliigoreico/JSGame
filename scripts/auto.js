//TODO:checkup GenerateBadIndex and GenerateSuperIndex functions! Las
var str,
	rowsNumb, //number of rows of the table
	collsNumb, //number of colls of the table
	badSquares, //number of squares standing on which you fall back
	superSquares, //number of squares standing on which you go straight forward
	gameManage, //variable with html content of managing of the game buttons
	currDrop; //current drop number
var fall=[];
var position=0;
var badIndexArr=[];
var superIndexArr=[];
var tableCells=[];
var fallBackMove=[];
var forwardMove=[];

document.getElementById('generate').onclick=function(e){
	e.preventDefault();
	RunProg();
}
document.getElementById('generate-default').onclick=function(e){
	e.preventDefault();
	RunProgDefault();
}

//generate indexes of negative squares
function GenerateBadIndex(badSquares){
	for(var i=0;i<badSquares; ){
		var badSIndex=Math.floor(Math.random() * (tableCells));
		if(badIndexArr.indexOf(badSIndex)!=true){
			badIndexArr[i]={
				value: badSIndex, 
				end: (i-getRandomArbitary(1, 6))
				}
			i++;
		}
	}
	return badIndexArr;
}

//generate indexes of positive squares
function GenerateSuperIndex(superSquares){
	//create an array of bad cells
	var BadInd=[];
	for(var i=0;i<badIndexArr.length;i++){
		BadInd[i]=badIndexArr[i].value;
	}

	for(var j=0;j<superSquares; ){
		var superIndex=Math.floor(Math.random() * (tableCells ));
	
		if(superIndexArr.indexOf(superIndex)!=true && BadInd.indexOf(superIndex)!=true){ //compare for existing this generated value in array of bad indexes and in array of super indexes
			superIndexArr[j]=superIndex;
			j++;
		}
	}
	return superIndexArr;
}

//check if element is in array and returns its index or false
function IndexOfEl(el, arr){
	var indexInArr=false;
	for(var i=0;i<arr.length;i++){
		if(arr[i]==el){
			indexInArr=i;
		}
	}
	return indexInArr;
}

//general fluency
function RunProg(){
	AskTableParams();
	if(ValidateParams(15, 15)==false){
		alert('please provide numeric data about table');
	}
	else{
		GenerateTable(rowsNumb, collsNumb);
		GenerateBadIndex(badSquares);
		GenerateSuperIndex(superSquares);
		PrevHide();
		InputTable();
		AddBadCells();
		AddSuperCells();
		ShowBonesBlock();
		DropBones();
	}
}

//Default generation of the table
function RunProgDefault(){
	DefaultTableParams();
	GenerateTable(rowsNumb, collsNumb);
	GenerateBadIndex(badSquares);
	GenerateSuperIndex(superSquares);
	PrevHide();
	InputTable();
	AddBadCells();
	AddSuperCells();
	ShowBonesBlock();
	DropBones();
	MoveChip();
}

//Drop bones
function DropBones(){
	document.getElementById('drop-bones').onclick=function(e){
	e.preventDefault();
	var dropNumb1=getRandomArbitary(1,6);
	var dropNumb2=getRandomArbitary(1,6);
	var DropSum=dropNumb1+' '+dropNumb2+' drop sum='+(dropNumb1+dropNumb2);
	document.getElementById('drop-results').innerHTML=DropSum;
	DropButtDisable();
	MoveButtEnable();
	MoveChip();
	
	return currDrop=dropNumb1+dropNumb2;
	}
	
}


//generate html structure of the table
function GenerateTable(rows, colls){
	str='<h1 class="enjoy-title">Enjoy the GAME</h1><table class="dashboard" id="game-board">';
	var counter=1;
	var table=document.getElementById('game-board');
	for(var i=0; i<rows; i++){
		str=str+'<tr>';
		for(var j=0; j<colls; j++){
			if(j==0 && i==0){
				str=str+'<td id="chip"><span>'+counter+'</span></td>'
			}
			else{
				str=str+'<td><span>'+counter+'</span></td>';
			}
			counter++;
		}
		str=str+'</tr>'
	}
	str=str+'</table>';
	return str;
}

//insert generated table and buttons
function InputTable(){
	var content=document.getElementById('content');
	var tableWr=document.createElement('div');
	gameManage=document.createElement('div');
	var gameManageHTML='<form method="post" action="#"><button id="drop-bones">Drop</button><button id="move">Move</button></form><div id="drop-results">0</div>';
	
	tableWr.setAttribute('class', 'table-wr');
	tableWr.innerHTML=str;
	
	gameManage.setAttribute('class', 'manage-steps cf');
	gameManage.innerHTML=gameManageHTML;
	
	content.appendChild(tableWr);
	content.appendChild(gameManage);
	
	return gameManage;
}

//generate indexes of negative squares
/*function GenerateBadIndex(badSquares){
	for(var i=0;i<badSquares; ){
		var badSIndex=Math.floor(Math.random() * (tableCells));
		if(badIndexArr.indexOf(badSIndex)!=true){
			badIndexArr[i]=badSIndex;
			i++;
		}
	}
	return badIndexArr;
}*/


//draw bad cells
function AddBadCells(){
	tableCells=document.getElementById('game-board').getElementsByTagName('td');

	for(var i=0;i<badIndexArr.length;i++){
		var ind=badIndexArr[i].value;
		tableCells[ind].setAttribute('class', 'badCell');
	}
}


//hide prev content
function PrevHide(){
	document.getElementById('preview').setAttribute('style', 'display:none');
}

//number check
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//input table rows and colls via prompt
function AskTableParams(){
	rowsNumb=+document.getElementById('rows-i').value;
	collsNumb=+document.getElementById('colls-i').value;
	badSquares=+document.getElementById('badS-i').value;
	superSquares=+document.getElementById('goodS-i').value;
	tableCells=rowsNumb*collsNumb;
	return rowsNumb, collsNumb, badSquares, superSquares, tableCells;
}

//default params
function DefaultTableParams(){
	rowsNumb=10;
	collsNumb=10;
	badSquares=10;
	superSquares=10;
	tableCells=100;
	return rowsNumb, collsNumb, badSquares, superSquares, tableCells;
}

//validate inputed params
function ValidateParams(collsMax, rowsMax){
	var newArr=[rowsNumb, collsNumb, badSquares, superSquares];
	var allCells=rowsNumb*collsNumb;
	var unifiedCellsCount=badSquares+superSquares;
	for(i=0; i<newArr.length;i++){
		if(isNumber(newArr[i])!=true || newArr[i]=='' || newArr[i]==' ' || unifiedCellsCount>=allCells || rowsNumb>collsMax || collsNumb>rowsMax){
			return false;
		}
	}
}

//Create random number
function getRandomArbitary(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//draw super cells
function AddSuperCells(){
	var tableCells=document.getElementById('game-board').getElementsByTagName('td');
	
	for(var key in superIndexArr){
		var ind=+superIndexArr[key];
		tableCells[ind].setAttribute('class', 'superCell');
	}
}

//show manage bones
function ShowBonesBlock(){
	gameManage.setAttribute('style', 'display:block');
}

//make move of chip
function MoveChip(){
	document.getElementById('move').onclick=function(e){
	e.preventDefault();
	MoveButtDisable();
	DropButtEnable();
	var chip=document.getElementById('chip').removeAttribute('id');
	position+=currDrop;
	if(position>tableCells.length){
		position=99;
		MoveButtDisable();
		DropButtDisable();
		alert('Game Ended');
	}
	tableCells[position].setAttribute('id', 'chip');
	
	
	return position;
	}
}

//disable Drop button
function DropButtDisable(){
	document.getElementById('drop-bones').setAttribute('disabled', 'disabled');
}

//enable Drop button
function DropButtEnable(){
	document.getElementById('drop-bones').removeAttribute('disabled');
}

//disable Move button
function MoveButtDisable(){
	document.getElementById('move').setAttribute('disabled', 'disabled');
}

//enable Move button
function MoveButtEnable(){
	document.getElementById('move').removeAttribute('disabled');
}






