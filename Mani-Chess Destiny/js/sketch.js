//GLOBALS

const NUM_SQUARES = 10;
const DIM = 800;
const NUM_PLAYERS = 6;
const PLAYER_RADIUS = 20;
const DEBUG = false;
const NUM_CHARACTERS = 15;
const NUM_POWERS = 1;
const NUM_EVENTS = 26;

let start_button;
let title;

let letters = ['m', 'a', 'n', 'i', '-', 'c', 'h', 'e', 's', 's']

let INTROSCREEN = true;
let TEAM1_CHOOSING = false;
let TEAM2_CHOOSING = false;
let PLAYING = false;
let BUILDING_RAIL = false;
let COWBOYING = false;
let BUILDING_MINE = false;
let EVENTING = false;
let MOVING = true;
let WINNING1 = false;
let WINNING2 = false;
let TIE = false;
if(DEBUG){
  INTROSCREEN = false;
  PLAYING = true;
}

let hypotenuse;

let team1 = [];
let team2 = [];

let characters = [];
let clickcount1 = 0;
let clickcount2 = 0;

let squares = [];
let x = 0;
let y = 0;

let turn = 0;

let infoBoxes = [];
let showBoxes = false;

let powerButtons = [];
let powerHeader;

let busTeam;
let busIdx;

let cowTeam;
let cowIdx;

let mineTeam;
let mineIdx;

let hitRailroad1 = false;
let hitRailroad2 = false;

let killRailroads1 = false;
let killRailroads2 = false;

let killFarmers1 = false;
let killFarmers2 = false;

let killImmigrants1 = false;
let killImmigrants2 = false;

let numImmigrants1 = 0;
let numImmigrants2 = 0;

let numFarmers1 = 0;
let numFarmers2 = 0;

let numCities1 = 0;
let numCities2 = 0;

let tweed1;
let tweed2;

let numRailroads1 = 0;
let numRailroads2 = 0;

let numMines1 = 0;
let numMines2 = 0;

let mineGenned1 = false;
let mineGenned2 = false;

let event_changed = true;
let event_name;
let ev;

let reserved = false;

let fireAble = true;

let titleOffset = 0;
let parOffsetX = 0;
let parOffsetY = 0;


//================================================================//

//================================================================//


function setup() {
  hypotenuse = sqrt(((DIM/NUM_SQUARES)/2)*((DIM/NUM_SQUARES)/2) + ((DIM/NUM_SQUARES)/2)*((DIM/NUM_SQUARES)/2));

  let canvas = createCanvas(DIM, DIM + 100);
  canvas.parent('canvas-div');
  console.log("Mani-Chess Destiny");
  frameRate(10);

  myFont = loadFont('./assets/CarnivaleeFreakshow-DLrm.ttf');


  for(let i = 0; i<(NUM_SQUARES*NUM_SQUARES); i++){
    if((i % NUM_SQUARES == 0) && (i!= 0)){
      x += DIM/NUM_SQUARES;
      y = 0;
    }

    let sqr = new Sqr(x, y, DIM/NUM_SQUARES);
    squares.push(sqr);

    y+= DIM/NUM_SQUARES;
  }

  for(let i = 0; i<NUM_PLAYERS; i++){
    team1.push(new Player(0, 0, 0));
    team2.push(new Player(0, 0, 1));

    team1[i].x = squares[20 + i*10].center_x;
    team1[i].y = squares[20 + i*10].center_y;

    team2[i].x = squares[29 + i*10].center_x;
    team2[i].y = squares[29 + i*10].center_y;

    infoBoxes.push(new infoBox(team1[i].x, team1[i].y - 40))
    infoBoxes.push(new infoBox(team2[i].x, team2[i].y + 40))
  }

  for(let i = 0; i < NUM_CHARACTERS; i++){
    characters.push(i);
  }

  let start_button_width = 200;
  let start_button_height = 70;
  start_button = new Button(DIM/2 - start_button_width/2, DIM/2 + 100, start_button_width, start_button_height, (217,215,199), 'Begin Game', 45, (0, 0, 0));

  for(let i = 0; i < NUM_POWERS; i++){
    powerButtons.push(new Button(0, 0, 75, 30, (255, 255, 255), 'Click Me', 15, (0, 0, 0)))
  }

}


//=================================================================//


function draw() {
  background(255);

  if(INTROSCREEN){
    stroke(58, 22, 14);
    push();
    strokeWeight(6);
    fill(195,151,106);
    rect(0, 0, DIM, DIM);
    pop()
    textFont(myFont);
    start_button.show();


    textSize(150);
    fill(58, 22, 14);
    push()
    translate(400, 400);
    rotate(4*PI/11.25);
    for(let i = 0; i < letters.length; i++){
      text(letters[letters.length - 1 - i], 0, -300);
      rotate(-PI/12);
    }
    pop();
    text('Destiny', 200, 400);

    push();
    textFont('times new roman');
    textSize(30);
    text('A redesigned Chess game in the style of the Gilded Age', 50, 700);
    pop();

    if(start_button.checkClicked()){
      TEAM1_CHOOSING = true;
      INTROSCREEN = false;
    }
  }

  textFont('times new roman');

  if(TEAM1_CHOOSING){
    stroke(58, 22, 14);
    push();
    strokeWeight(6);
    fill(195,151,106);
    rect(0, 0, DIM, DIM);
    pop()
    team1Show();
  }

  if(TEAM2_CHOOSING){
    stroke(58, 22, 14);
    push();
    strokeWeight(6);
    fill(195,151,106);
    rect(0, 0, DIM, DIM);
    pop()
    team2Show();
  }


  if(PLAYING){
    let w = 300;
    let h = 100;
    let ts = 30;
    if(turn % 2 == 0){
      fill(0);
      textSize(ts);
      text("Player One's Turn", DIM/2 - 120, 850);
    }else{
      fill(0);
      textSize(ts);
      text("Player Two's Turn", DIM/2 - 120, 850);
    }

    let toggleboxes = new Button(DIM/2 + DIM/4, 815, 150, 50, (255, 255, 255), 'Toggle Info-Boxes', 15, (0, 0, 0));
    toggleboxes.show();
    if(toggleboxes.checkClicked()){
      showBoxes = !showBoxes;
    }

    for(let i=0; i<NUM_SQUARES*NUM_SQUARES; i++){
      squares[i].occupied = false;
      squares[i].current = false;
      squares[i].num_occupying_circles = 0;
      Sqr.checkWhetherSquareIsOccupied(squares[i]);
      squares[i].draw()
    }

    for(let i = 0; i<team1.length; i++){
      team1[i].draw();
    }for(let i = 0; i<team2.length; i++){
      team2[i].draw();
    }

    if(numCities1 > 4 && numCities2 <= 4){
      tweed1 = true;
    }else if(numCities2 > 4 && numCities1 <= 4){
      tweed2 = true;
    }else{
      tweed1 = false;
      tweed2 = false;
    }

    checkMinesToGen();

    if(MOVING){
      Player.move();
    }

    Player.checkKills();

    if(turn != 0 && turn % 5 == 0){
      MOVING = false;
      EVENTING = true;
    }

    if(tweed1){
      console.log('Tweed 1');
    }else if(tweed2){
      console.log('Tweed 2');
    }

    checkWin();

    delete toggleboxes;
  }

  if(EVENTING){
    //drawing popup background
    let p_width = 400;
    let p_height = 400;
    push();
    fill(58, 22, 14);
    stroke(165,121,76);
    strokeWeight(6);
    rect(DIM/2 - p_width/2, DIM/2 - p_height/2, p_width, p_height, 5);
    pop();

    if(event_changed){
      let ev = floor(random(NUM_EVENTS));

      switch(ev){
        case 0:
          event_name = "Homestead Act";
          explanation = popupExplanations.homesteadAct;
          titleOffset = -20;
          parOffsetX = 20;
          parOffsetY = -45;
          titleSize = 40;
          break;
        case 1:
          event_name = "Kansas Tornado";
          explanation = popupExplanations.kansasTornado;
          titleOffset = -20;
          parOffsetX = 20;
          parOffsetY = -45;
          titleSize = 40;
          break;
        case 2:
          event_name = "Panic of 1893";
          explanation = popupExplanations.panicOf1893;
          titleOffset = -20;
          parOffsetX = 20;
          parOffsetY = -45;
          titleSize = 40;
          break;
        case 3:
          event_name = "Coxey gets to Washington";
          explanation = popupExplanations.coxeyGetsToWashington;
          titleOffset = -42.5;
          parOffsetX = 20;
          parOffsetY = -45;
          titleSize = 30;
          break;
        case 4:
          event_name = "Ragged Dick is Published";
          explanation = popupExplanations.raggedDick;
          titleOffset = -45;
          parOffsetX = 20;
          parOffsetY = -45;
          titleSize = 30;
          break;
        case 5:
          event_name = "Rise of Taylorism";
          explanation = popupExplanations.riseOfTaylorism;
          titleOffset = -30;
          parOffsetX = 20;
          parOffsetY = -40;
          titleSize = 37.5;
          break;
        case 6:
          event_name = "Molly Maguires Strike!";
          explanation = popupExplanations.mollyMaguires;
          titleOffset = -70;
          parOffsetX = 20;
          parOffsetY = -40;
          titleSize = 37.5;
          break;
        case 7:
          event_name = "Comstock Lode";
          explanation = popupExplanations.comstockLode;
          titleOffset = -20;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 8:
          event_name = "Timber Culture Act";
          explanation = popupExplanations.timberCultureAct;
          titleOffset = -42.5;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 9:
          event_name = "Baseball";
          explanation = popupExplanations.baseball;
          titleOffset = 15;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 10:
          event_name = "Immigration Restiction";
          explanation = popupExplanations.immigrationRestrictionLeague;
          titleOffset = -52.5;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 35;
          break;
        case 11:
          event_name = "Olmstead and Vaux";
          explanation = popupExplanations.olmsteadAndVaux;
          titleOffset = -45;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 12:
          event_name = "Pullman Strike";
          explanation = popupExplanations.pullmanStrike;
          titleOffset = -20;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 13:
          event_name = "Sand Creek Massacre";
          explanation = popupExplanations.sandCreekMassacre;
          titleOffset = -50;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 35;
          break;
        case 14:
          event_name = "Reservation";
          explanation = popupExplanations.reservations;
          titleOffset = 0;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 15:
          event_name = "Dawes Act";
          explanation = popupExplanations.dawesAct;
          titleOffset = 0;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 16:
          event_name = "Drought Strikes!";
          explanation = popupExplanations.drought;
          titleOffset = -20;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 17:
          event_name = "African Americans in Cities";
          explanation = popupExplanations.africanAmericanCities;
          titleOffset = -78;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 32.5;
          break;
        case 18:
          event_name = "Bessemer Process";
          explanation = popupExplanations.bessemerProcess;
          titleOffset = -38;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 19:
          event_name = "Haymarket Square";
          explanation = popupExplanations.haymarketSquare;
          titleOffset = -38;
          parOffsetX = 20;
          parOffsetY = -45;
          titleSize = 40;
          break;
        case 20:
          event_name = "Steel Girder Structure";
          explanation = popupExplanations.steelGirderStructure;
          titleOffset = -68;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 21:
          event_name = "City Fire";
          explanation = popupExplanations.cityFire;
          titleOffset = 10;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 22:
          event_name = "Rise of Nationalism";
          explanation = popupExplanations.lookingBackward;
          titleOffset = -50;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 23:
          event_name = "Social Darwinism";
          explanation = popupExplanations.socialDarwinism;
          titleOffset = -40;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
        case 24:
          event_name = "Interstate Commerce Act";
          explanation = popupExplanations.commerceAct;
          titleOffset = -70;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 35;
          break;
        case 25:
          event_name = "Currency Act";
          explanation = popupExplanations.currencyAct;
          titleOffset = -12;
          parOffsetX = 20;
          parOffsetY = -37.5;
          titleSize = 40;
          break;
      }

      doEvent(ev);
      event_changed = false;
    }

    fill(195,151,106);
    stroke(165,121,76);
    strokeWeight(1);
    textSize(titleSize);
    text(event_name, DIM/2 - p_width/4 + titleOffset, DIM/2 - p_height*.46, p_width, p_height);
    line(DIM/2 - p_width/3, DIM/2 - p_height*.35, DIM/2 + p_width/3, DIM/2 - p_height*.35);

    textSize(14);
    text(explanation, DIM/2 - p_width/2 + parOffsetX, DIM/2 - p_height*.3 + parOffsetY, p_width*.925, p_height*.85);

    let close_button = new Button(DIM/2 + p_width/2 - 100, DIM/2 + p_height/2 - 40, 90, 30, (255, 255, 255), 'Close', 15, (0, 0, 0));
    close_button.show();
    if(close_button.checkClicked()){
      EVENTING = false;
      MOVING = true;
      turn++;
      turn++;
      event_changed = true;
    }

    delete close_button;
  }

  if(BUILDING_RAIL){
    let charIdx;
    let dipped = 0;

    if(busTeam == 0){
      charIdx = Player.getIdx(team1[busIdx].x, team1[busIdx].y);
    }else{
      charIdx = Player.getIdx(team2[busIdx].x, team2[busIdx].y);
    }

    let midx = Player.getIdx(mouseX, mouseY);
    if(!squares[midx - 1].full && abs((midx - 1) - (charIdx - 1)) != 10
    && abs((midx - 1) - (charIdx - 1)) != 1){
      if(mouseIsPressed){
          if(busTeam == 0 && turn % 2 == 0 && numImmigrants1 >= 1){
            squares[midx - 1].railroad1 = true;
            turn++;
            mineGenned1 = false;

            numRailroads1++;
            if(numRailroads1 == 7){

              killRailroads1 = true;
              killFarmers1 = true;
              killImmigrants1 = true;

            }
          }else if(busTeam == 1 && turn % 2 != 0 && numImmigrants2 >= 1){
            squares[midx - 1].railroad2 = true;
            turn++;
            mineGenned2 = false;

            numRailroads2++;
            if(numRailroads2 == 7){

              killRailroads2 = true;
              killFarmers2 = true;
              killImmigrants2 = true;

            }
          }
          BUILDING_RAIL = false;
      }
    }
  }

  if(COWBOYING){
    let charIdx;

    if(cowTeam == 0){
      charIdx = Player.getIdx(team1[cowIdx].x, team1[cowIdx].y);
    }else{
      charIdx = Player.getIdx(team2[cowIdx].x, team2[cowIdx].y);
    }

    let midx = Player.getIdx(mouseX, mouseY);
    if((abs((midx - 1) - (charIdx - 1)) == 10 || abs((midx - 1) - (charIdx - 1)) == 1)
    || (abs((midx - 1) - (charIdx - 1)) == 11 || abs((midx - 1) - (charIdx - 1)) == 9)){
      if(cowTeam == 0 && turn % 2 == 0){
        if(mouseIsPressed && squares[midx - 1].railroad1){
          hitRailroad1 = true;
          MOVING = false;
        }else if(mouseIsPressed && squares[midx - 1].city1 && hitRailroad1){
          hitRailroad1 = false;
          Player.generatePlayer(0, 13, midx)
          MOVING = true;
          COWBOYING = false;
          turn++;
          mineGenned1 = false;
        }
      }else if(cowTeam == 1 && turn % 2 == 1){
        if(mouseIsPressed && squares[midx - 1].railroad2){
          if(cowTeam == 1 && turn % 2 != 0){
            hitRailroad2 = true;
            MOVING = false;
          }
        }else if(mouseIsPressed && squares[midx - 1].city2 && hitRailroad2){
          hitRailroad2 = false;
          Player.generatePlayer(1, 13, midx)
          MOVING = true;
          COWBOYING = false;
          turn++;
          mineGenned2 = false;
        }
      }
    }
  }


  if(BUILDING_MINE){
    let charIdx;
    let dipped = 0;

    if(mineTeam == 0){
      charIdx = Player.getIdx(team1[mineIdx].x, team1[mineIdx].y);
    }else{
      charIdx = Player.getIdx(team2[mineIdx].x, team2[mineIdx].y);
    }

    let midx = Player.getIdx(mouseX, mouseY);
    if(!squares[midx - 1].full){
      if(mouseIsPressed){
          if(mineTeam == 0 && turn % 2 == 0 && numImmigrants1 >= 1){
            squares[midx - 1].mine1 = true;
            numMines1++;
            turn++;
            mineGenned1 = false;
          }else if(mineTeam == 1 && turn % 2 != 0 && numImmigrants2 >= 1){
            squares[midx - 1].mine2 = true;
            numMines2++;

            turn++;
            mineGenned2 = false;
          }
          BUILDING_MINE = false;
      }
    }
  }

  if(WINNING1){
    let w_width = 400;
    let w_height = 200;
    push();
    fill(58, 22, 14);
    stroke(165,121,76);
    strokeWeight(6);
    rect(DIM/2 - w_width/2, DIM/2 - w_height/2, w_width, w_height, 5);
    pop();

    fill(195,151,106);
    stroke(165,121,76);
    strokeWeight(1);
    textSize(40);
    text("Team 1 Wins!", DIM/2 - w_width/4, DIM/2 - w_height*.46, w_width, w_height);
  }else if(WINNING2){
    let w_width = 400;
    let w_height = 200;
    push();
    fill(58, 22, 14);
    stroke(165,121,76);
    strokeWeight(6);
    rect(DIM/2 - w_width/2, DIM/2 - w_height/2, w_width, w_height, 5);
    pop();

    fill(195,151,106);
    stroke(165,121,76);
    strokeWeight(1);
    textSize(40);
    text("Team 2 Wins!", DIM/2 - w_width/4, DIM/2 - w_height*.46, w_width, w_height);
  }else if(TIE){
    let w_width = 400;
    let w_height = 200;
    push();
    fill(58, 22, 14);
    stroke(165,121,76);
    strokeWeight(6);
    rect(DIM/2 - w_width/2, DIM/2 - w_height/2, w_width, w_height, 5);
    pop();

    fill(195,151,106);
    stroke(165,121,76);
    strokeWeight(1);
    textSize(40);
    text("Tie!", DIM/2 - w_width/4, DIM/2 - w_height*.46, w_width, w_height);
  }
}
