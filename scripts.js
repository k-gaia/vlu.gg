var champ = "Breach"; 
var map;
var ability = "Aftershock";
var abilityFilter = false;
var activePinCount = 0;
var pinSize = 26; 
var activePinIDs = [];
var activeChildPinIDs = [];
var drawingPins = false;
var calloutState = false;

var champs = ['Breach', 'Brimstone', 'Cypher', 'Jett', 'Omen', 'Phoenix', 'Raze', 'Sage', 'Sova', 'Viper'];
var abilities = [
                    ['Aftershock', 'Flashpoint', 'Fault_Line', 'Rolling_Thunder'],
                    ['Incendiary', 'Stim_Beacon', 'Sky_Smoke', 'Orbital_Strike'], 
                    ['Trapwire', 'Cyber_Cage', 'Spycam', 'Neural_Theft'],
                    ['Cloudburst', 'Updraft', 'Tailwind', 'Blade_Storm'],
                    ['Shrouded_Step', 'Paranoia', 'Dark_Cover', 'From_The_Shadows'],
                    ['Blaze', 'Curveball', 'Hot_Hands', 'Run_it_Back'],
                    ['Boom_Bot', 'Blast_Pack', 'Paint_Shells', 'Showstopper'],
                    ['Barrier_Orb', 'Slow_Orb', 'Healing_Orb', 'Resurrection'],
                    ['Shock_Bolt', 'Owl_Drone', 'Recon_Bolt', "Hunter's Fury"],
                    ['Snake_Bite', 'Poison_Cloud', 'Toxic_Screen', "Viper's_Pit"]
                
                ];

// change map function (called each time map is clicked)
function changeMap(mapRadio) {

    // the map image
    document.getElementById("mapImg").src = "maps/" + mapRadio  + "_mini-map.webp";

    // change current map variable
    map = mapRadio;

    // clear pins 
    clearPins();
    clearChildPins();

    if (champ != undefined){

        getPins();

    }

    

}

// change champ function (called each time champ is clicked)
function changeChamp(selectedChamp){  

    // clear pins 
    clearPins(champ);

    abilityFilter = false;

    // change current champ variable
    champ = selectedChamp;

    // 
    champGet = (element) => element == champ

    // ability variables taken from champ array
    ability1 = '"' + abilities[champs.findIndex(champGet)][0] + '"';
    ability2 = '"' + abilities[champs.findIndex(champGet)][1] + '"';
    ability3 = '"' + abilities[champs.findIndex(champGet)][2] + '"';
    ability4 = '"' + abilities[champs.findIndex(champGet)][3] + '"';

    // change champ 
    document.getElementById('agentImg').src = "champIcons/" + champ + "_icon.webp";
    document.getElementById('agentText').innerText = champ;

    // setup ability dropdown 
    document.getElementById('ability1').innerHTML = "<button href='#' onclick='changeAbility("+ ability1 +")'>" + ability1.replace(/"/g, " ").replace(/_/g, " ") + "</button>"
    document.getElementById('ability2').innerHTML = "<button href='#' onclick='changeAbility("+ ability2 +")'>" + ability2.replace(/"/g, " ").replace(/_/g, " ") + "</button>"
    document.getElementById('ability3').innerHTML = "<button href='#' onclick='changeAbility("+ ability3 +")'>" + ability3.replace(/"/g, " ").replace(/_/g, " ") + "</button>"
    document.getElementById('ability4').innerHTML = "<button href='#' onclick='changeAbility("+ ability4 +")'>" + ability4.replace(/"/g, " ").replace(/_/g, ' ') + "</button>"

    // get pins for the selected champ
    getPins();
    clearChildPins();
}

// change ability function (called when abilities are filtered)
function changeAbility(selectedAbility){

    abilityFilter = true;

    clearPins(champ);

    ability = selectedAbility;

    console.log(ability);

    getPins()
    clearChildPins()

}

// load line-up pins after main pin press
function pinButtonFunc(pinsToCreate){

    //debug
    //console.log("Passed in: " + pinsToCreate);

    for (i = 0; i < pinsToCreate.length; i++){

        // create button element
        var pin = document.createElement("BUTTON");
        
        // use pin css
        pin.className = 'pinButton';

        const pinLabel = " <p id=pinLabel> " + pinsToCreate[i][3] + " </p>";

        //pin.innerHTML = '<img src="pinImg.png" width="20px" height="20px">';
        // set pin image & size
        pin.innerHTML = '<img src="pinImg.png" width=10px height=10px">' + pinLabel;

        // set pin note to display on playback
        document.getElementById("smokeVideoNote").innerText = pinsToCreate[i][4];
        if (pinsToCreate[i][4] == undefined){
            document.getElementById("smokeVideoNote").innerText = "";
        }

        // setup aboslute position
        pin.style.cssText = 'position: absolute;';
        
        // use pin details for x-y position
        pin.style.left = pinsToCreate[i][0] + 'px';
        pin.style.top = pinsToCreate[i][1]  + 'px';

        // set pin id for manipulation incl. directory 
        pin.id = champ + ' pin¬' + pinsToCreate[i][2];

        const lineUpDir = pinsToCreate[i][2].toString();

        // pin onclick 
        pin.onclick = function(){pinPlayBack(lineUpDir)};

        console.log(lineUpDir);

        // add active pin ID to array for cleanup later
        activeChildPinIDs.push(pin.id);

        // incr active pins 
        activePinCount++; 

        // add pin to map/site
        document.body.appendChild(pin);
    }
}

// get pin data
function getPins(){

    // pin details to store pins to display
     pinDetails = [];

    // debug
    console.log("Champ is: " + champ + ", Map is: " + map);

    // loop through pins 
    for (i = 0; i < pins.length; i++){

        // get champs pins for map
        if (abilityFilter == true){
            if (pins[i][0] == map && pins[i][1] == champ && pins[i][2] == ability){

                // create new pin entry in pinDetails array
                pinDetails.push([]);

                //debug
                //console.log("Pin Details: " + pinDetails);

                // for entry in pin details add pin coords to entry
                for (j = 0; j < pinDetails.length; j++){

                    // add pins to entry j is entry, i is pins from pin array

                    // Push X-Coordinate
                    pinDetails[j].push(pins[i][3]);

                    // Push Y-Coordinate
                    pinDetails[j].push(pins[i][4]);

                    // Push Child Lineup Pins
                    pinDetails[j].push(pins[i][5]);

                    // Push Lineup Name
                    pinDetails[j].push(pins[i][6]);

                    // Push Ability for Icon 
                    pinDetails[j].push(pins[i][2]);

                }
                //console.log(pinDetails[0]);
                //console.log(pinDetails[1]);

                console.log(pinDetails);
            }
        }

        else {

            if (pins[i][0] == map && pins[i][1] == champ){

                // create new pin entry in pinDetails array
                pinDetails.push([]);

                //debug
                //console.log("Pin Details: " + pinDetails);

                // for entry in pin details add pin coords to entry
                for (j = 0; j < pinDetails.length; j++){

                    // add pins to entry j is entry, i is pins from pin array

                    // Push X-Coordinate
                    pinDetails[j].push(pins[i][3]);

                    // Push Y-Coordinate
                    pinDetails[j].push(pins[i][4]);

                    // Push Child Lineup Pins
                    pinDetails[j].push(pins[i][5]);

                    // Push Lineup Name
                    pinDetails[j].push(pins[i][6]);

                    // Push Ability for Icon 
                    pinDetails[j].push(pins[i][2]);

                }
                //console.log(pinDetails[0]);
                //console.log(pinDetails[1]);

                console.log(pinDetails);
                }
            }
        }

    // loop through pin details and create pins
    for (i = 0; i < pinDetails.length; i++){

        // create button element
        var pin = document.createElement("BUTTON");
        
        // use pin css
        pin.className = 'pinButton';

        //pin.innerHTML = '<img src="pinImg.png" width="20px" height="20px">';
        // set pin image & size

        const pinLabel = " <p id=pinLabel> " + pinDetails[i][3] + " </p>";

        pin.innerHTML = '<img src="abilityIcons/' + pinDetails[i][4] + '.webp" width="' + pinSize + 'px" height="' + pinSize + 'px">' + pinLabel;

        // setup aboslute position
        pin.style.cssText = 'position: absolute;';
        
        // use pin details for x-y position
        pin.style.left = pinDetails[i][0]+ 'px';
        pin.style.top = pinDetails[i][1]+ 'px';

        // set pin id for manipulation incl. directory 
        pin.id = champ + " " + pinDetails[i][3];

        const lineUpPins = pinDetails[i][2];
      
        // pin onclick 
        pin.onclick = function(){pinButtonFunc(lineUpPins, clearChildPins())};

        // add active pin ID to array for cleanup later
        activePinIDs.push(pin.id);

        // incr active pins 
        activePinCount++; 

        // add pin to map/site
        document.body.appendChild(pin);

        //console.log(pin.id);
        console.log("Out: " + pinDetails[i][2]);
        }
}
 
// clear pin function 
function clearPins(champToClear){

    //console.log(activePinIDs)
    //console.log(activePinCount);

    // if champ isn't selected and no pins are active skip clear pins call
    // without this check this can break the first getPins() call
    if (champ == undefined && activePinCount > 0){
        return;
    }

    // if a champ has been selected thus having active pins clear
    else {
        // for each active pin get their element and remove
        for (i = 0; i < activePinIDs.length; i++){
                
            var elem = document.getElementById(activePinIDs[i]);

            document.body.removeChild(elem);
          
            // decr. pins 
            activePinCount--;
        }
        activePinIDs = [];
    }
}

// clear pin function 
function clearChildPins(champToClear){

    // if champ isn't selected and no pins are active skip clear pins call
    // without this check this can break the first getPins() call
    if (champ == undefined && activePinCount > 0){
        return;
    }

    // if a champ has been selected thus having active pins clear
    else {
        // for each active pin get their element and remove
        for (i = 0; i < activeChildPinIDs.length; i++){
        
            var elem = document.getElementById(activeChildPinIDs[i]);

            document.body.removeChild(elem);
          
            //decr. pin count for each child pin removed
            activePinCount--;
        }

        activeChildPinIDs = [];
        // debug
        //console.log(activeChildPinIDs)
        //console.log(activePinCount);
    }
}

// play lightbox video function
function lightbox_open(vidSrc) {

        const lightBoxVideo = document.getElementById('smokeVideo');
        changeSource(vidSrc);
        window.scrollTo(0, 0);
        document.getElementById('light').style.display = 'block';
        document.getElementById('fade').style.display = 'block';
        lightBoxVideo.play();
  }
  
// close lightbox video
function lightbox_close(vidSrc) {

        var lightBoxVideo = document.getElementById('smokeVideo');
        document.getElementById('light').style.display = 'none';
        document.getElementById('fade').style.display = 'none';
        lightBoxVideo.src = lightBoxVideo;
    }

// change source function -> used every pin call to show new video
function changeSource(newSource){

    var video = document.getElementById("smokeVideo");

    video.setAttribute('src', newSource);


  }

  // pin playback 
function pinPlayBack(vidSrc){
    lightbox_open(vidSrc);
}

// create pin function -> use this to make pins for live site
function createPin(){

    // get pins name, and add to pinToSave output 
    const pinName = prompt("Enter pin name: ");

    // variable to store final array to output
    var pinToSave = [map, document.getElementById('champs').value, document.getElementById('newPin').style.getPropertyValue('top'), document.getElementById('newPin').style.getPropertyValue('left'), [], pinName];

    for (i = 0; i < activeChildPinIDs.length; i++){

        if (activeChildPinIDs[i].includes('newChildPin')){

            var childPinName = prompt("Enter Pin " + i + "s Name: ");

            const childPinNote = prompt("Enter Pin " + i + "s Note: ");

            const pinDirectory = prompt("Video Name: ");

            pinToSave[4].push("[" + document.getElementById(activeChildPinIDs[i]).style.left.replace("px", ""), 
            document.getElementById(activePinIDs[i]).style.top.replace("px", ""), "'"+pinDirectory+"', '" + childPinName + "', '" + childPinNote + "']");
        }

    }

    alert("['" + map + "','" + document.getElementById('champs').value 
    + "','" + document.getElementById('abilities').value + "'," +    
    document.getElementById('newPin').style.getPropertyValue('left').replace("px", "") 
    + "," + document.getElementById('newPin').style.getPropertyValue('top').replace("px", "") 
    + ", [" + pinToSave[4] + "], '" + pinName +  "']");

    clearPins();
    document.getElementById('pinType').value = "Main Pin";
}

// draw pin function 
function drawPin(){

    // check if drawing pins button has been checked 
    if (drawingPins == true){

        // get ability drop down
        var abilityDrop = document.getElementById('abilities');

        // coords
        var x = event.pageX;   // Get the horizontal coordinate
        var y = event.pageY;     // Get the vertical coordinate

        // create new pin button
        newBoi = document.createElement("BUTTON");

        // css + positioning
        newBoi.style.cssText = "position: absolute; top: " + (y - 10) + "px; left: " + (x - 17) + "px;";
        newBoi.className = 'pinButton';
        newBoi.id = 'newPin';
        
        // if main pin selected use ability icon
        if (document.getElementById('pinType').value == "Main Pin"){
            
            // set image values 
            newBoi.innerHTML = "<img src='abilityIcons/"+ abilityDrop.value +".webp' width=22px>";

            // push new button id to active ids array 
            activePinIDs.push(newBoi.id);
            
        }

        // else use child pin image
        else {

            newBoi.innerHTML = "<img src='pinImg.png' width=10px>";

            newBoi.id = 'newChildPin ' + newBoi.style.top + " " + newBoi.style.left;
          
            // push new button id to active ids array 
            activeChildPinIDs.push(newBoi.id);

        }

        activePinCount++;

        document.body.appendChild(newBoi);

    }

    // return out of function if drawing pins not selected
    else {

        return;

    }

}

/* Depracated now added on pinCreator script tag, to keep page consistency plus map 'FIXES' lmao
// on load function -> sets up on click events for pin creation
window.onload = function () {

    // add to map click listener
    document.getElementById('mapImg').addEventListener("click", function() {drawPin()}, false);

    // get champ drop down selector
    var champDrop = document.getElementById('champs');

    // iterate through champ array and add to drop down
    for (i = 0; i < this.champs.length; i++){
        var option = document.createElement("option");
        option.text = champs[i];
        champDrop.add(option); 
    }  

    
}
*/

// update ability function, called on drop down value select
function updateAbilities(){

    // get drop downs
    var champDrop = document.getElementById('champs');
    var abilityDrop = document.getElementById('abilities');

    // clear abilities from previous champ
    for (i = 0; i < 4; i++){

        abilityDrop.remove(abilityDrop[i]); 
    }

    // add abilities for champs in drop downs
    for (i = 0; i < 4; i++){

        var option = document.createElement("option");
        option.text = abilities[champDrop.selectedIndex][i];
        abilityDrop.add(option); 
    }
}

// enable draw function to flip boolean
function enableDraw(){

    if (drawingPins == false) {

        drawingPins = true;

    }

    else {

        drawingPins = false;

    }
}

function calloutEnabler(){
    calloutsImage = document.getElementById('mapImg2');
    if (calloutState == true){
        calloutState = false;
        calloutsImage.className = 'fade-out';
    }
    else {
        calloutState = true;
        calloutsImage.className = 'fade-in';
    }
}
