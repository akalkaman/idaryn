var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvas_height_width_qatynas = canvas.height / canvas.width;
let height = 160;
let width = 90;
let translateX = 0;
let translateY = 0;
let height_width_qatynas = height / width;
if(canvas_height_width_qatynas < height_width_qatynas){
    width = width * canvas.height / height;
    height = canvas.height;
    translateX = (canvas.width - width) / 2;
    ctx.translate((canvas.width - width) / 2, 0);
}
else{
    height = height * canvas.width / width;
    width = canvas.width;
    translateY = (canvas.height - height) / 2;
    ctx.translate(0, (canvas.height - height) / 2);
}

let resultNumber = Math.floor(Math.random() * 10.99 + 9);
let DataLayer = { "task": resultNumber, "answers": [], "clicked": [], "result": []};
DataLayer.clicked = ["БАСЫЛМАДЫ", "БАСЫЛМАДЫ", "БАСЫЛМАДЫ", "БАСЫЛМАДЫ"];
let IC1 = false,
    IC2 = false,
    IC3 = false,
    IC4 = false;
let ICfCh1 = false,
    ICfCh2 = false,
    ICfCh3 = false,
    ICfCh4 = false;
let color1 = [];
let color2 = [];
for(i = 1; i <= 4; i++){
    color1[i] = "#999999";
    color2[i] = "#DDDDDD";
}
let randomNumber1 = [],
    randomNumber2 = [];
let randomNumberForCheckingList = Math.floor(Math.random()*3.999 + 1);
let checkingList = [];
for(i = 0; i < 4; i++) {
    if (randomNumberForCheckingList > i) {
        checkingList[i] = 1;
    } else {
        checkingList[i] = 0;
    }
}
// Used like so
shuffle(checkingList);
function choosing() {
    for (i = 0; i < 4; i++) {
        randomNumber1[i] = Math.floor(Math.random() * (resultNumber - 1));
        if (checkingList[i] == 1) {
            randomNumber2[i] = resultNumber - randomNumber1[i];
        } else {
            randomNumber2[i] = (resultNumber - randomNumber1[i]) + (2 * Math.floor(Math.random() * 1.999) - 1) * Math.floor(Math.random() * (resultNumber - randomNumber1[i]) + 1);
        }
    }
    if ((randomNumber1[0] == randomNumber1[1]) ||
        (randomNumber1[0] == randomNumber1[2]) ||
        (randomNumber1[0] == randomNumber1[3]) ||
        (randomNumber1[1] == randomNumber1[2]) ||
        (randomNumber1[1] == randomNumber1[3]) ||
        (randomNumber1[2] == randomNumber1[3])){
        choosing();
    }
}
choosing();
for (i = 0; i < 4; i++) {
    DataLayer.answers.push(randomNumber1[i] + " + " + randomNumber2[i]);
    DataLayer.result.push("ДҰРЫС");
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function button(centerX, centerY, buttonWidth, buttonHeight, lineColor, fillColor, opacity, isLineDashed){
let radius = Math.min(buttonWidth, buttonHeight) * 0.2,
    linewidth = 3;
    if(opacity){
        fillColor = fillColor + opacity;
    };
    ctx.beginPath();
    if(isLineDashed){
        ctx.setLineDash([15, 15]);
        ctx.lineCap = "round";
    };
    ctx.moveTo(centerX - buttonWidth / 2 + radius, centerY - buttonHeight / 2);
    ctx.lineTo(centerX + buttonWidth / 2 - radius, centerY - buttonHeight / 2);
    ctx.arc(centerX + buttonWidth / 2 - radius, centerY - buttonHeight / 2 + radius, radius, - Math.PI / 2, 0 * Math.PI);
    ctx.lineTo(centerX + buttonWidth / 2, centerY + buttonHeight / 2 - radius);
    ctx.arc(centerX + buttonWidth / 2 - radius, centerY + buttonHeight / 2 - radius, radius, 0 * Math.PI / 2, 1 / 2 * Math.PI);
    ctx.lineTo(centerX - buttonWidth / 2 + radius, centerY + buttonHeight / 2);
    ctx.arc(centerX - buttonWidth / 2 + radius, centerY + buttonHeight / 2 - radius, radius, 1 / 2 * Math.PI, 2 / 2 * Math.PI);
    ctx.lineTo(centerX - buttonWidth / 2, centerY - buttonHeight / 2 + radius);
    ctx.arc(centerX - buttonWidth / 2 + radius, centerY - buttonHeight / 2 + radius, radius, 2 / 2 * Math.PI, 3 / 2 * Math.PI);
    ctx.closePath();
    if(fillColor){
        ctx.fillStyle = fillColor;
    }
    else{
        ctx.fillStyle = '#FFFFFF';
    };
    if(lineColor){
        ctx.strokeStyle = lineColor;
    }
    else{
        ctx.strokeStyle = '#00000000';
    };
    ctx.lineWidth = linewidth;
    ctx.fill();
    ctx.stroke();
}
function text(text, centerX, centerY, size, colorStyle){
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = size + "px Comic Sans MS";
    ctx.fillStyle = colorStyle;
    ctx.fill();
    ctx.fillText(text, centerX, centerY);
    ctx.closePath();
    ctx.stroke();
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function buttonCheck(intend){
    button(width / 2, height * 0.9 + width * 0.01, width * 0.8, width * 0.15, '', '#007700', '');
    button(width / 2, height * 0.9 + intend, width * 0.8, width * 0.15, '', '#00AA00', '');
    text("CHECK", width / 2, height * 0.9 + intend, width * 0.07, '#001100');
}
canvas.addEventListener("click", function(event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    if ((mouseX > translateX + width * 0.5 - width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseX < translateX + width * 0.5 - width * 0.35 / 2 + width * 0.3 / 2) &&
        (mouseY > translateY + height * 0.6 - width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseY < translateY + height * 0.6 - width * 0.35 / 2 + width * 0.3 / 2)
    ){
        IC1 = true;
        clearCanvas();
        draw(false);
        setTimeout(() => {
            IC1 = false;
            ICfCh1 = !ICfCh1;
            if(ICfCh1){
                color1[1] = "#189CBC";
                color2[1] = "#C6E7EF";
                DataLayer.clicked[0] = "БАСЫЛДЫ";
            }
            else{
                color1[1] = "#999999";
                color2[1] = "#DDDDDD";
                DataLayer.clicked[0] = "БАСЫЛМАДЫ";
            }
            clearCanvas();
            draw(false);
            }, 40);
    }

    if ((mouseX > translateX + width * 0.5 + width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseX < translateX + width * 0.5 + width * 0.35 / 2 + width * 0.3 / 2) &&
        (mouseY > translateY + height * 0.6 - width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseY < translateY + height * 0.6 - width * 0.35 / 2 + width * 0.3 / 2)
    ){
        IC2 = true;
        clearCanvas();
        draw(false);
        setTimeout(() => {
            IC2 = false;
            ICfCh2 = !ICfCh2;
            if(ICfCh2){
                color1[2] = "#189CBC";
                color2[2] = "#C6E7EF";
                DataLayer.clicked[1] = "БАСЫЛДЫ";
            }
            else{
                color1[2] = "#999999";
                color2[2] = "#DDDDDD";
                DataLayer.clicked[1] = "БАСЫЛМАДЫ";
            }
            clearCanvas();
            draw(false);
            }, 40);
    }

    if ((mouseX > translateX + width * 0.5 - width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseX < translateX + width * 0.5 - width * 0.35 / 2 + width * 0.3 / 2) &&
        (mouseY > translateY + height * 0.6 + width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseY < translateY + height * 0.6 + width * 0.35 / 2 + width * 0.3 / 2)
    ){
        IC3 = true;
        clearCanvas();
        draw(false);
        setTimeout(() => {
            IC3 = false;
            ICfCh3 = !ICfCh3;
            if(ICfCh3){
                color1[3] = "#189CBC";
                color2[3] = "#C6E7EF";
                DataLayer.clicked[2] = "БАСЫЛДЫ";
            }
            else{
                color1[3] = "#999999";
                color2[3] = "#DDDDDD";
                DataLayer.clicked[2] = "БАСЫЛМАДЫ";
            }
            clearCanvas();
            draw(false);
            }, 40);
    }

    if ((mouseX > translateX + width * 0.5 + width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseX < translateX + width * 0.5 + width * 0.35 / 2 + width * 0.3 / 2) &&
        (mouseY > translateY + height * 0.6 + width * 0.35 / 2 - width * 0.3 / 2) &&
        (mouseY < translateY + height * 0.6 + width * 0.35 / 2 + width * 0.3 / 2)
    ){
        IC4 = true;
        clearCanvas();
        draw(false);
        setTimeout(() => {
            IC4 = false;
            ICfCh4 = !ICfCh4;
            if(ICfCh4){
                color1[4] = "#189CBC";
                color2[4] = "#C6E7EF";
                DataLayer.clicked[3] = "БАСЫЛДЫ";
            }
            else{
                color1[4] = "#999999";
                color2[4] = "#DDDDDD";
                DataLayer.clicked[3] = "БАСЫЛМАДЫ";
            }
            clearCanvas();
            draw(false);
            }, 40);
    }

    if ((mouseX > translateX + width / 2 - width * 0.8 / 2) &&
        (mouseX < translateX + width / 2 + width * 0.8 / 2) &&
        (mouseY > translateY + height * 0.9 - width * 0.15 / 2) &&
        (mouseY < translateY + height * 0.9 + width * 0.15 / 2)
    ){
        clearCanvas();
        draw(true);
        setTimeout(() => {
            var listForChecked = [ICfCh1, ICfCh2, ICfCh3, ICfCh4];
            for(i = 1; i <= 4; i++){
                if(listForChecked[i - 1] && checkingList[i - 1]){
                    color1[i] = "#007700";
                    color2[i] = "#00AA00";
                };
                if(listForChecked[i - 1] != checkingList[i - 1]){
                    color1[i] = "#770000";
                    color2[i] = "#AA0000";
                    DataLayer.result[i - 1] = "ҚАТЕ";
                };
            }
                clearCanvas();
                draw(false);
        }, 40);

        setTimeout(() => {
            alert(DataLayer.answers);
            alert(DataLayer.clicked);
            alert(DataLayer.result);
            location.reload();
            }, 400
        );
    }
});
function draw(intend) {
    buttonCheck(width * 0.01 * intend);

    button(width * 0.5 - width * 0.35 / 2, height * 0.6 - width * 0.35 / 2 + width * 0.01, width * 0.3, width * 0.3, color1[1], color1[1], '', false);
    button(width * 0.5 - width * 0.35 / 2, height * 0.6 - width * 0.35 / 2 + width * 0.01 * IC1, width * 0.3, width * 0.3, color1[1], color2[1], '', false);
    text(randomNumber1[0] + " + " + randomNumber2[0], width * 0.5 - width * 0.35 / 2, height * 0.6 - width * 0.35 / 2 + width * 0.015 + width * 0.01 * IC1, width * 0.08, color1[1]);

    button(width * 0.5 + width * 0.35 / 2, height * 0.6 - width * 0.35 / 2 + width * 0.01, width * 0.3, width * 0.3, color1[2], color1[2], '', false);
    button(width * 0.5 + width * 0.35 / 2, height * 0.6 - width * 0.35 / 2 + width * 0.01 * IC2, width * 0.3, width * 0.3, color1[2], color2[2], '', false);
    text(randomNumber1[1] + " + " + randomNumber2[1], width * 0.5 + width * 0.35 / 2, height * 0.6 - width * 0.35 / 2 + width * 0.015 + width * 0.01 * IC2, width * 0.08, color1[2]);

    button(width * 0.5 - width * 0.35 / 2, height * 0.6 + width * 0.35 / 2 + width * 0.01, width * 0.3, width * 0.3, color1[3], color1[3], '', false);
    button(width * 0.5 - width * 0.35 / 2, height * 0.6 + width * 0.35 / 2 + width * 0.01 * IC3, width * 0.3, width * 0.3, color1[3], color2[3], '', false);
    text(randomNumber1[2] + " + " + randomNumber2[2], width * 0.5 - width * 0.35 / 2, height * 0.6 + width * 0.35 / 2 + width * 0.015 + width * 0.01 * IC3, width * 0.08, color1[3]);

    button(width * 0.5 + width * 0.35 / 2, height * 0.6 + width * 0.35 / 2 + width * 0.01, width * 0.3, width * 0.3, color1[4], color1[4], '', false);
    button(width * 0.5 + width * 0.35 / 2, height * 0.6 + width * 0.35 / 2 + width * 0.01 * IC4, width * 0.3, width * 0.3, color1[4], color2[4], '', false);
    text(randomNumber1[3] + " + " + randomNumber2[3], width * 0.5 + width * 0.35 / 2, height * 0.6 + width * 0.35 / 2 + width * 0.015 + width * 0.01 * IC4, width * 0.08, color1[4]);

    text(resultNumber, width / 2, height * 0.35, width * 0.1, "black");
    text("Тең болатын", width / 2, height * 0.2, width * 0.06, "black");
    text("бүкіл сандарды белгіле", width / 2, height * 0.2 + width * 0.08, width * 0.06, "black");
}

draw(false);