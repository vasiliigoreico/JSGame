var arr=[];
var i;
var randsum=0;
var position=0;
var tds=document.getElementsByTagName('td');

function createBoardCode() {
    // This method creates and returns an array of objects representing
    // the playing board. Each object has only one property, ".end", which
    // defaults to the number or index of that object (or square). But what
    // makes this game what it is are the special behaviors at specific squares,
    // where landing on the square 'teleports' the user forward or backward in
    // big leaps (see the picture for the UI). An example will be
    //      board[13].end = 47, meaning 14th square ends up in square 48.
    // The special squares, by index and their .end points, are as follows...
    // The "Ladders": 14->48, 19->60, 55->76, 69->90, 78->97.
    // The "Snakes": 99->29. 47->18, 25->7.
	for(i=0;i<100;i++){
    	switch(i){
			case 13:
				arr[i] = {'end': 48};
			break;
			
			case 18:
			    arr[i] = {'end': 60};
			break;
			
			case 54:
			    arr[i] = {'end': 76};
			break;
			
			case 68:
			    arr[i] = {'end': 90};
			break;
			
			case 77:
			    arr[i] = {'end': 97};
			break;
			
			case 98:
			    arr[i] = {'end': 29};
			break;
			
			case 46:
			    arr[i] = {'end': 18};
			break;
			
			case 24:
			    arr[i] = {'end': 7};
			break;
			
			default:
				arr[i] = {'end': i};
				break;
		}
	}
	return arr;
}

//generates 2 random numbers - imitates bones drop
function DropBones(e){
	e.preventDefault();
	var rand1=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	var rand2=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	randsum=rand1+rand2;
	document.getElementById('drop-results').innerHTML=rand1+' and '+rand2;
	this.setAttribute('disabled', 'disabled');
	if((position+randsum)>100){
		position=100;
	}
	else{
		position+=randsum;
	}
	return randsum, position;
}

//emutales move of the chip
function MoveChip(e){
	e.preventDefault();
	var current = document.getElementById('current-pos');
	if(current){
		current.removeAttribute('id');
	}
	var changedPos=(arr[position-1].end);
	if(changedPos>=98){
		GameEnd();	
	}
	tds[changedPos].children[0].setAttribute('id', 'current-pos');
	document.getElementById('drop-bones').removeAttribute('disabled');
}

//game end
function GameEnd(){
	document.getElementById('move').setAttribute('disabled', 'disabled');
	document.getElementById('drop-bones').setAttribute('disabled', 'disabled');
	alert('Game ended');
}
createBoardCode();
//trigger event on button of drop bones
document.getElementById('drop-bones').onclick = DropBones;
document.getElementById('move').onclick = MoveChip;

