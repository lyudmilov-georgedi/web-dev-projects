
// Show Phrase area in Robot Creation Section/Form when "can-talk" robot option is "checked".
function ShowHidePhrase() {
	var phrasearea = document.getElementById("phrase-area");
	var isChecked = document.getElementById("can-talk").checked;

	if(isChecked == true)
		phrasearea.style.visibility = "visible";
	else
		phrasearea.style.visibility = "hidden";
}

// Check if there is empty field in Robot Creation Section/Form and display alert if one is empty.
function CheckEmptyField(){
	var checkIfEmptyName = document.getElementById("robot-name").value;
	var checkIfEmptyPhrase = document.querySelector("[name='phrase-area']").value;
	var checkTextareaVisibility = document.getElementById("phrase-area").style.visibility;

	if(checkIfEmptyName == "" || (checkTextareaVisibility == "visible" && checkIfEmptyPhrase == "")){
		alert("Could not create the robot! Please fill all of the fields in the form!");
		return false;
	}
	else
		return true;
}

// Animate Robot Jumping
function CheckRobotJumping(){
	document.getElementById('robot-id').style.animationName="jump-animate";
	document.getElementById('robot-id').style.animationDuration="2s";
	document.getElementById('robot-id').style.animationTimingFunction ="1s ease-out";
	document.getElementById('robot-id').style.animationIterationCount="infinite";
}

// Animate Robot Talking
function CheckRobotTalking(){
	document.getElementById('mouth-id').style.transformOrigin="left";
	document.getElementById('mouth-id').style.animationName="mouth-animate";
	document.getElementById('mouth-id').style.animationDuration="1s";
	document.getElementById('mouth-id').style.animationTimingFunction ="1s ease-in-out";
	document.getElementById('mouth-id').style.animationIterationCount="10";
}

// Animate Robot Blinking
function CheckRobotBlinking(){
	document.getElementById('eye-left-id').style.animationName="eyes-animate";
	document.getElementById('eye-left-id').style.animationDuration="3s";
	document.getElementById('eye-left-id').style.animationTimingFunction ="2s linear";
	document.getElementById('eye-left-id').style.animationIterationCount="infinite";
}

// Change Robot data based on entered information in Create Robot Section
function fillInRobotDetails(id){
	// Change Robot Name
	document.getElementById("robotName").innerHTML = '';
	var robotNameDiv = document.createElement('div');
	robotNameDiv.innerHTML = robots[id].name;
	document.getElementById("robotName").appendChild(robotNameDiv);

	// Change Robot Type in Ribbon
	document.getElementById("ribbon").innerHTML = '';
	var robotRibbonH1 = document.createElement('span');
	robotRibbonH1.innerHTML = robots[id].type + " Robot";
	document.getElementById("ribbon").appendChild(robotRibbonH1);

	// Change Robot Body Type
	var femaleRobotBodyOption = robots[id].type;
	if(femaleRobotBodyOption === "female"){
		document.getElementById("robotBody").style.display = "none";
		document.getElementById("robotFemaleBody").style.display = "block";
	}
	else{
		document.getElementById("robotBody").style.display = "block";
		document.getElementById("robotFemaleBody").style.display = "none";
	}

	// Change Robot Color
	document.getElementById("robotBody").style.borderTopColor = robots[id].color;
	document.getElementById("robotFemaleBody").style.borderTopColor = robots[id].color;
	document.getElementById("robotFemaleBody").style.borderBottomColor = robots[id].color;

	// Change Phrase Text
	document.getElementById("talk-bubble").innerHTML = '';
	var robotBubblePhraseDiv = document.createElement('p');
	robotBubblePhraseDiv.innerHTML = robots[id].phrase;
	document.getElementById("talk-bubble").appendChild(robotBubblePhraseDiv);
}

// Save Form data into a Robot array object.
var robots = [];
const addRobot = (ev)=>{
	ev.preventDefault();
	if(CheckEmptyField()){
		var robot = {
			id: Date.now(),
			name: document.getElementById("robot-name").value,
			type: document.getElementById("robot-type").value,
			color: document.getElementById("robot-color").value,
			canJump: document.getElementById("can-jump").checked,
			canTalk: document.getElementById("can-talk").checked,
			canBlink: document.getElementById("can-blink").checked,
			phrase: document.querySelector("[name='phrase-area']").value
		}
		robots.push(robot);
	}

	// Check if 'Jump' option is checked and start animation
	var canJump = document.getElementById("can-jump").checked;
	if(canJump){
		CheckRobotJumping();
	}

	// Check if 'Talk' option is checked and start animation and show 'talk bubble' for duration ot talking.
	setTimeout(function(){
		document.getElementById("talk-bubble-id").style.display = "none";
	}, 10000);
	var canTalk = document.getElementById("can-talk").checked;
	if(canTalk){
		document.getElementById("talk-bubble-id").style.display = "block";
		CheckRobotTalking();
	}

	// Check if 'Blink' option is checked and start animation
	var canBlink = document.getElementById("can-blink").checked;
	if(canBlink){
		CheckRobotBlinking();
	}

	document.querySelector('form').reset(); // to clear the form for the next entry
	ShowHidePhrase();

	// console.warn('added', {robots} );
	// let pre = document.querySelector("#msg pre");
	// pre.textContent = "\n" + JSON.stringify(robots, "\t", 2);
}

// Show Robot Section of created Robots
const showRobot = (ev)=>{
	ev.preventDefault();
	var robotSection = document.getElementById('slide-1');

	if(robots.length === 0)
		robotSection.style.display = "none";
	else
		robotSection.style.display = "block";

	//fillInRobotDetails(0);

	for(var i=0; i < robots.length; i++){
		fillInRobotDetails(i);
	}
}

// Trigger EventListeners
document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById("createButton").addEventListener('click', addRobot);
	document.getElementById("showCreatedRobotsButton").addEventListener('click', showRobot);
});
