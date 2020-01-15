function markSquare(x, y){
  noFill();
  stroke(255);
  ellipse(x, y, 30);
}

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function checkWin(){
  let sqCount = 0;

  let count1 = 0;
  let count2 = 0;

  for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){

    if(squares[i].full){
      sqCount++;
    }

  }

  if(sqCount == 100){
    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(squares[i].railroad1 || squares[i].city1 || squares[i].mine1){
        count1++;
      }else if(squares[i].railroad2 || squares[i].city2 || squares[i].mine2){
        count2++;
      }
    }

    count1 += team1.length;
    count2 += team2.length;

    if(count1 > count2){
      WINNING1 = true;
    }else if(count1 < count2){
      WINNING2 = true;
    }else if(count1 == count2){
      TIE = true;
    }

  }
}


function doEvent(ev){

  for(let i = 0; i<NUM_SQUARES*NUM_SQUARES; i++){
      Sqr.checkWhetherSquareIsOccupied(squares[i]);
  }

  //homestead act
  if(ev == 0){
    console.log('0');
    let team = floor(random(2));
    if(team == 0){
      for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
        if(!squares[i].full){
          let player = new Player(squares[i].center_x, squares[i].center_y, 0);
          player.character = 12;
          infoBoxes.push(new infoBox(player.x, player.y - 40));
          team1.push(player);
          numFarmers1++;
          break;
        }
      }
    }else if(team == 1){
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >=0 ; i--){
        if(!squares[i].full){
          let player = new Player(squares[i].center_x, squares[i].center_y, 1);
          player.character = 12;
          infoBoxes.push(new infoBox(player.x, player.y - 40));
          team2.push(player);
          numFarmers2++;
          break;
        }
      }
    }//Kansas Tornado
  }else if(ev == 1){
    let x;
    let y;
    for(let i = team1.length - 1; i >= 0; i--){
      if(team1[i].character == 12){
        x = team1[i].x;
        y = team1[i].y;
        team1.splice(i, 1);
        infoBoxes.splice(i, 1);
        let player = new Player(x, y, 0);
        player.character = 14;
        infoBoxes.push(new infoBox(player.x, player.y - 40));
        team1.push(player);
        break;
      }
    }

    for(let i = team2.length - 1; i >= 0; i--){
      if(team2[i].character == 12){
        x = team2[i].x;
        y = team2[i].y;
        team2.splice(i, 1);
        infoBoxes.splice(i + team1.length, 1);
        let player = new Player(x, y, 1);
        player.character = 14;
        infoBoxes.push(new infoBox(x, y - 40));
        team2.push(player);
        break;
      }
    }//Panic of 1893
  }else if(ev == 2){
    let railsgone = 0;
    let imsgone = 0;
    let farmsgone = 0;

    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(railsgone < 2){
        if(squares[i].railroad1){
          squares[i].railroad1 = false;
          numRailroads1--;
          squares[i].mine1 = false;
          railsgone++;
        }else if(squares[i].railroad2){
          squares[i].railroad2 = false;
          numRailroads2--;
          squares[i].mine2 = false;
          railsgone++;
        }
      }
    }

    let rands = [];
    for(let i = 0; i < 1; i++){
      rands.push(floor(random(2)));
    }

    for(let i = 0; i < rands.length; i++){

      if(rands[i] == 0){
        for(let j = team1.length - 1; j >= 0; j--){
          if(team1[j].character == 12 && farmsgone < 3){
            team1.splice(j, 1);
            numFarmers1--;
            infoBoxes.splice(j, 1);
            farmsgone++;
          }else if(team1[j].character == 13 && imsgone < 3){
            team1.splice(j, 1);
            numImmigrants1--;
            infoBoxes.splice(j, 1);
            imsgone++;
          }
        }
      }else if(rands[i] == 1){
        for(let j = team2.length - 1; j >= 0; j--){
          if(team2[j].character == 12 && farmsgone < 3){
            team2.splice(j, 1);
            numFarmers2--;
            infoBoxes.splice(j + team1.length, 1);
            farmsgone++;
          }else if(team2[j].character == 13 && imsgone < 3){
            team2.splice(j, 1);
            numImmigrants2--;
            infoBoxes.splice(j + team1.length, 1);
            imsgone++;
          }
        }
      }
    }//Coxey gets to Washington
  }else if(ev == 3){
    for(let k = 0; k < team1.length; k++){
      if(team1[k].character == 14){
        for(let i = 0; i < NUM_SQUARES*NUM_SQUARES ; i++){
          if(!squares[i].full){
            let player = new Player(squares[i].center_x, squares[i].center_y, 0);
            player.character = 12;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team1.push(player);
            numFarmers1++;
            break;
          }
        }
        break;
      }
    }

    for(let k = 0; k < team2.length; k++){
      if(team2[k].character == 14){
        for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >=0 ; i--){
          if(!squares[i].full){
            let player = new Player(squares[i].center_x, squares[i].center_y, 1);
            player.character = 12;
            numFarmers2++;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team2.push(player);
            break;
          }
        }
        break;
      }
    }//Ragged Dick is Published
  }else if(ev == 4){
    for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >=0 ; i--){
      if(!squares[i].full){
        let player = new Player(squares[i].center_x, squares[i].center_y, 1);
        player.character = 13;
        infoBoxes.push(new infoBox(player.x, player.y - 40));
        team2.push(player);
        numImmigrants2++;
        break;
      }
    }

    for(let i = 0; i <NUM_SQUARES*NUM_SQUARES; i++){
      if(!squares[i].full){
        let player = new Player(squares[i].center_x, squares[i].center_y, 0);
        player.character = 13;
        infoBoxes.push(new infoBox(player.x, player.y - 40));
        team1.push(player);
        numImmigrants1++;
        break;
      }
    }//Rise of Taylorism
  }else if(ev == 5){

    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(!squares[i].full){
        squares[i].mine1 = true;
        numMines1++;
        break;
      }
    }

    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(!squares[i].full){
        squares[i].railroad1 = true;
        numRailroads1++;
        break;
      }
    }

    for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
      if(!squares[i].full){
        squares[i].mine2 = true;
        numMines2++;
        break;
      }
    }

    for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
      if(!squares[i].full){
        squares[i].railroad2 = true;
        numRailroads2++;
        break;
      }
    }

  }else if(ev == 6){ //Molly Maguires Strike!
    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(squares[i].mine1){
        squares[i].mine1 = false;
        numMines1--;
      }else if(squares[i].mine2){
        squares[i].mine2 = false;
        numMines2--;
      }
    }

    let ran = floor(random(2));

    if(ran == 0){
      for(let i = team1.length - 1; i >= 0; i--){
        if(team1[i].character == 13){
          team1.splice(i, 1);
          numImmigrants1--;
          infoBoxes.splice(i, 1);
          break;
        }
      }
    }else if(ran == 1){
      for(let i = team2.length - 1; i >= 0; i--){
        if(team2[i].character == 13){
          team2.splice(i, 1);
          infoBoxes.splice(i + team1.length, 1);
          numImmigrants2--;
          break;
        }
      }
    }//Comstock Lode
  }else if(ev == 7){
    let ran = floor(random(2));

    if(ran == 0){
      for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
        if(!squares[i].full){
          let player = new Player(squares[i].center_x, squares[i].center_y, 0);
          player.character = 0;
          infoBoxes.push(new infoBox(player.x, player.y - 40));
          team1.push(player);
          break;
        }
      }
    }else if(ran == 1){
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
        if(!squares[i].full){
          let player = new Player(squares[i].center_x, squares[i].center_y, 1);
          player.character = 0;
          infoBoxes.push(new infoBox(player.x, player.y - 40));
          team2.push(player);
          break;
        }
      }
    }//Timber culture act and omstead and veaux
  }else if(ev == 8 || ev == 11){
    let ran = floor(random(100));
    if(!squares[ran].full){
      squares[ran].forest = true;
    }//baseball
  }else if(ev == 9){
    let ran = floor(random(100));
    if(!squares[ran].full){
      squares[ran].baseball = true;
    }//Immigration restriction
  }else if(ev == 10 || ev == 19){
    for(let i = team1.length - 1; i >=0; i--){
      if(team1[i].character == 13){
        team1.splice(i, 1);
        numImmigrants1--;
        infoBoxes.splice(i, 1);
        break;
      }
    }

    for(let i = team2.length - 1; i >=0; i--){
      if(team2[i].character == 13){
        team2.splice(i, 1);
        numImmigrants1--;
        infoBoxes.splice(i + team1.length, 1);
        break;
      }
    }//Pullman strike
  }else if(ev == 12){
    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(squares[i].railroad1){
        squares[i].railroad1 = false;
        numRailroads1--;
        break;
      }else if(squares[i].railroad2){
        squares[i].railroad2 = false;
        numRailroads2--;
        break;
      }
    }//Sand Creek Massacre
  }else if(ev == 13){
    for(let i = team1.length - 1; i >=0; i--){
      if(team1[i].character == 5 || team1[i].character == 6){
        team1.splice(i, 1);
        infoBoxes.splice(i, 1);
        break;
      }
    }

    for(let i = team2.length - 1; i >=0; i--){
      if(team2[i].character == 5 || team2[i].character == 6){
        team2.splice(i, 1);
        infoBoxes.splice(i + team1.length, 1);
        break;
      }
    }//Reservation
  }else if(ev == 14){
    reserved = true;
  }else if(ev == 15){ //Dawes act
    let x;
    let y;

    for(let i = team1.length - 1; i >=0; i--){
      if(team1[i].character == 5 || team1[i].character == 6){
        x = team1[i].x;
        y = team1[i].y;
        team1.splice(i, 1);
        infoBoxes.splice(i, 1);

        let player = new Player(x, y, 0);
        player.character = 12;
        infoBoxes.push(new infoBox(player.x, player.y - 40));
        team1.push(player);
        numFarmers1++;

        break;
      }
    }

    for(let i = team2.length - 1; i >=0; i--){
      if(team2[i].character == 5 || team2[i].character == 6){
        x = team2[i].x;
        y = team2[i].y;
        team2.splice(i, 1);
        infoBoxes.splice(i + team1.length, 1);

        let player = new Player(x, y, 1);
        player.character = 12;
        infoBoxes.push(new infoBox(player.x, player.y - 40));
        team2.push(player);
        numFarmers2++;

        break;
      }
    }//Drought Strikes!
  }else if(ev == 16){
    let ran = floor(random(2));

    if(ran == 0){
      for(let i = 0; i < team1.length; i++){
        if(team1[i].character == 12){
          team1.splice(i, 1);
          numFarmers1--;
          infoBoxes.splice(i, 1);
          break;
        }
      }
    }else if(ran == 1){
      for(let i = 0; i < team2.length; i++){
        if(team2[i].character == 12){
          team2.splice(i, 1);
          numFarmers2--;
          infoBoxes.splice(i +  team1.length, 1);
          break;
        }
      }
    }

    let ranSquare = floor(random(100));
    if(!squares[ranSquare].full){
      squares[ranSquare].windmill = true;
    }//African Americans in cities
  }else if(ev == 17){
    let numb1 = 0;
    let numb2 = 0;
    for(let i = 0; i < team1.length; i++){
      if(team1[i].character == 7){
        numb1++;
      }
    }
    for(let i = 0; i < team2.length; i++){
      if(team2[i].character == 7){
        numb2++;
      }
    }

    if(numb1 >= 2){
      for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
        if(!squares[i].full){
          squares[i].city1 = true;
          break;
        }
      }
    }
    if(numb2 >= 2){
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
        if(!squares[i].full){
          squares[i].city2 = true;
          break;
        }
      }
    }//Bessemer process
  }else if(ev == 18){

    let ran = floor(random(2));

    if(ran == 0){
      for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
        if(!squares[i].full){
          squares[i].railroad1 = true;
          break;
        }
      }
    }else if(ran == 1){
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
        if(!squares[i].full){
          squares[i].railroad2 = true;
          break;
        }
      }
    }//Steel girder structure
  }else if(ev == 20){
    fireAble = false;
  }else if(ev == 21 && fireAble){ //City Fires
    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(squares[i].city1){
        squares[i].city1 = false;
        numCities1 --;
        break;
      }else if(squares[i].city2){
        squares[i].city2 = false;
        numCities2--;
        break;
      }
    }//Rise of Nationalism
  }else if(ev == 22){
    let ran = floor(random(2));

    if(ran == 0){
      for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
        if(!squares[i].full){
          squares[i].city1 = true;
          numCities1++;
          break;
        }
      }
    }else if(ran == 1){
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
        if(!squares[i].full){
          squares[i].city2 = true;
          numCities2++;
          break;
        }
      }
    }//Social Darwinism
  }else if(ev == 23){
    let ran = floor(random(2));
    if(ran == 0){
      for(let i = team1.length - 1; i >= 0; i--){
        if(team1[i].character == 13){
          team1.splice(i, 1);
          numImmigrants1--;
          infoBoxes.splice(i, 1);
          break;
        }
      }
    }else if(ran == 1){
      for(let i = team2.length - 1; i >= 0; i--){
        if(team2[i].character == 13){
          team2.splice(i, 1);
          infoBoxes.splice(i + team1.length, 1);
          numImmigrants2--;
          break;
        }
      }
    }//Interstate Commerce Act
  }else if(ev == 24){

    if(numRailroads1 > 2){
      for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
        if(!squares[i].full){
          let player = new Player(squares[i].center_x, squares[i].center_y, 0);
          player.character = 12;
          infoBoxes.push(new infoBox(player.x, player.y - 40));
          team1.push(player);
          numFarmers1++;
          break;
        }
      }
    }

    if(numRailroads2 > 2){
      for(let i = NUM_SQUARES*NUM_SQUARES - 1;i >= 0; i--){
        if(!squares[i].full){
          let player = new Player(squares[i].center_x, squares[i].center_y, 1);
          player.character = 12;
          infoBoxes.push(new infoBox(player.x, player.y - 40));
          team2.push(player);
          numFarmers2++;
          break;
        }
      }
    }//Currency Act
  }else if(ev == 25){

    let ran = floor(random(2));

    if(ran == 0){
      for(let i = team1.length - 1; i >= 0; i--){
        if(team1[i].character == 14){
          team1.splice(i, 1);
          infoBoxes.splice(i, 1);
          break;
        }
      }
    }else if(ran == 1){
      for(let i = team2.length - 1; i >= 0; i--){
        if(team2[i].character == 14){
          team2.splice(i, 1);
          infoBoxes.splice(i + team1.length, 1);
          break;
        }
      }
    }

  }






}



function team1Show(){
  let team1chars = [];

  //drawing headers
  let top_header = new Header("Team 1: Choose Players", 50, 25, 700, 150, 50, 60, 20);
  let bo_header = new Header("Business Owners", 50, 200, 200, 50, 20, 10, 10);
  let pol_header = new Header("Politicians", 300, 200, 200, 50, 20, 40, 8);
  let native_header = new Header("Minorities", 550, 200, 200, 50, 20, 19, 8);
  let soc_header = new Header("Social/Cultural Figures", 25, 500, 250, 50, 20, 10, 10);
  let front_header = new Header("American Frontier/Other", 525, 500, 250, 50, 20, 19, 8);

  //refactor buttons into array

  //drawing all possible business owner buttons
  team1chars.push(new Button(50, 280, 200, 50, (255, 255, 255), "Vanderbilt", 20, (0, 0, 0)));
  team1chars.push(new Button(50, 340, 200, 50, (255, 255, 255), "Gowen", 20, (0, 0, 0)));
  team1chars.push(new Button(50, 400, 200, 50, (255, 255, 255), "J.P Morgan", 20, (0, 0, 0)));

  //drawing all possible politician buttons
  team1chars.push(new Button(300, 280, 200, 50, (255, 255, 255), "Republican", 20, (0, 0, 0)));
  team1chars.push(new Button(300, 340, 200, 50, (255, 255, 255), "Democrat", 20, (0, 0, 0)));

  //drawing all possible native american buttons
  team1chars.push(new Button(550, 280, 200, 50, (255, 255, 255), "Crazy Horse", 20, (0, 0, 0)));
  team1chars.push(new Button(550, 340, 200, 50, (255, 255, 255), "Wovoka", 20, (0, 0, 0)));
  team1chars.push(new Button(550, 400, 200, 50, (255, 255, 255), "Freedman", 20, (0, 0, 0)));

  //drawing all social/cultural figure buttons
  team1chars.push(new Button(25, 560, 250, 50, (255, 255, 255), "Harriet Beecher Stowe", 20, (0, 0, 0)));
  team1chars.push(new Button(25, 620, 250, 50, (255, 255, 255), "Jacob Riis", 20, (0, 0, 0)));
  team1chars.push(new Button(25, 680, 250, 50, (255, 255, 255), "Frederick Remington", 20, (0, 0, 0)));

  //drawing all american frontier buttons
  team1chars.push(new Button(550, 560, 200, 50, (255, 255, 255), "Cowboy", 20, (0, 0, 0)));
  team1chars.push(new Button(550, 620, 200, 50, (255, 255, 255), "Farmer", 20, (0, 0, 0)));
  team1chars.push(new Button(550, 680, 200, 50, (255, 255, 255), "Immigrant", 20, (0, 0, 0)));

  team1chars.push(new Button(300, 400, 200, 50, (255, 255, 255), "Populist", 20, (0, 0, 0)))


  for(let i = 0; i < NUM_CHARACTERS; i++){
    if(clickcount1 >= 6){
      TEAM1_CHOOSING = false;
      TEAM2_CHOOSING = true;
    }
    team1chars[i].show();
    if(team1chars[i].checkClicked()){
      if(i == 13){
        numImmigrants1++;
      }else if(i == 12){
        numFarmers1++;
      }
      team1[clickcount1].character = i;
      clickcount1++;
    }
  }
}

function team2Show(){
  let team2chars = [];

  //drawing headers
  let top_header = new Header("Team 2: Choose Players", 50, 25, 700, 150, 50, 60, 20, 255);
  let bo_header = new Header("Business Owners", 50, 200, 200, 50, 20, 10, 10, 255);
  let pol_header = new Header("Politicians", 300, 200, 200, 50, 20, 40, 8, 255);
  let native_header = new Header("Minorities", 550, 200, 200, 50, 20, 19, 8, 255);
  let soc_header = new Header("Social/Cultural Figures", 25, 500, 250, 50, 20, 10, 10, 255);
  let front_header = new Header("American Frontier/Other", 525, 500, 250, 50, 20, 19, 8, 255);

  //refactor buttons into array

  //drawing all possible business owner buttons
  team2chars.push(new Button(50, 280, 200, 50, (255, 255, 255), "Vanderbilt", 20, (0, 0, 0)));
  team2chars.push(new Button(50, 340, 200, 50, (255, 255, 255), "Gowen", 20, (0, 0, 0)));
  team2chars.push(new Button(50, 400, 200, 50, (255, 255, 255), "J.P Morgan", 20, (0, 0, 0)));

  //drawing all possible politician buttons
  team2chars.push(new Button(300, 280, 200, 50, (255, 255, 255), "Republican", 20, (0, 0, 0)));
  team2chars.push(new Button(300, 340, 200, 50, (255, 255, 255), "Democrat", 20, (0, 0, 0)));

  //drawing all possible native american buttons
  team2chars.push(new Button(550, 280, 200, 50, (255, 255, 255), "Crazy Horse", 20, (0, 0, 0)));
  team2chars.push(new Button(550, 340, 200, 50, (255, 255, 255), "Wovoka", 20, (0, 0, 0)));
  team2chars.push(new Button(550, 400, 200, 50, (255, 255, 255), "Freedman", 20, (0, 0, 0)));

  //drawing all social/cultural figure buttons
  team2chars.push(new Button(25, 560, 250, 50, (255, 255, 255), "Harriet Beecher Stowe", 20, (0, 0, 0)));
  team2chars.push(new Button(25, 620, 250, 50, (255, 255, 255), "Jacob Riis", 20, (0, 0, 0)));
  team2chars.push(new Button(25, 680, 250, 50, (255, 255, 255), "Frederick Remington", 20, (0, 0, 0)));

  //drawing all american frontier buttons
  team2chars.push(new Button(550, 560, 200, 50, (255, 255, 255), "Cowboy", 20, (0, 0, 0)));
  team2chars.push(new Button(550, 620, 200, 50, (255, 255, 255), "Farmer", 20, (0, 0, 0)));
  team2chars.push(new Button(550, 680, 200, 50, (255, 255, 255), "Immigrant", 20, (0, 0, 0)));

  team2chars.push(new Button(300, 400, 200, 50, (255, 255, 255), "Populist", 20, (0, 0, 0)))



  let used = false;
  for(let i = 0; i < NUM_CHARACTERS; i++){
    if(clickcount2 >= 6){
      TEAM2_CHOOSING = false;
      PLAYING = true;
    }

    team2chars[i].show();
    if(team2chars[i].checkClicked()){
      if(i == 13){
        numImmigrants2++;
      }else if(i == 12){
        numFarmers2++;
      }
      team2[clickcount2].character = i;
      clickcount2++;
    }
  }

}


function checkMinesToGen(){
  console.log('-2');
  let x;
  let y;
  let tog;

  for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
    if(turn % 2 == 0 && squares[i].mine1 && mineGenned1 == false){
      if(i < 99 && i > 9){
        if(squares[i + 10].city1 || squares[i-10].city1 || squares[i+1].city1 || squares[i-1].city1){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i > 90 && i < 99){
        if(squares[i-10].city1 || squares[i+1].city1 || squares[i-1].city1){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 99){
        if(squares[i-10].city1 || squares[i-1].city1){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i > 0 && i < 9){
        if(squares[i+10].city1 || squares[i+1].city1 || squares[i-1].city1){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 0){
        if(squares[i+10].city1 || squares[i+1].city1){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 9){
        if(squares[i + 10].city1 || squares[i-1].city1 || squares[i+1].city1){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 90){
        if(squares[i-10].city1 || squares[i+1].city1 || squares[i-1].city1){
          tog = true;
        }else{
          tog = false;
        }
      }

      if(tog){
        if(!squares[i + 10].full){
          x = squares[i+10].center_x;
          y = squares[i+10].center_y;
        }else if(!squares[i - 10].full){
          x = squares[i-10].center_x;
          y = squares[i-10].center_y;
        }else if(!squares[i - 1].full){
          x = squares[i-1].center_x;
          y = squares[i-1].center_y;
        }else if(!squares[i + 1].full){
          x = squares[i+1].center_x;
          y = squares[i+1].center_y;
        }else if(!squares[i+11].full){
          x = squares[i+11].center_x;
          y = squares[i+11].center_y;
        }else if(!squares[i-11].full){
          x = squares[i-11].center_x;
          y = squares[i-11].center_y;
        }else if(!squares[i+9].full){
          x = squares[i+9].center_x;
          y = squares[i+9].center_y;
        }else if(!squares[i-9].full){
          x = squares[i-9].center_x;
          y = squares[i-9].center_y;
        }

        if(x !== undefined && y !== undefined){
          let player = new Player(x, y, 0);
          player.character = 13;
          infoBoxes.push(new infoBox(x, y - 40));
          team1.push(player);
          numImmigrants1++;
          mineGenned1 = true;
          break;
        }
      }
    }else if(turn % 2 == 1 && squares[i].mine2 && mineGenned2 == false){
      console.log('-1');
      console.log(i);
      if(i < 99 && i > 9){
        if(squares[i + 10].city2 || squares[i-10].city2 || squares[i+1].city2 || squares[i-1].city2){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i > 90 && i < 99){
        if(squares[i-10].city2 || squares[i+1].city2 || squares[i-1].city2){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 99){
        if(squares[i-10].city2 || squares[i-1].city2){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i > 0 && i < 9){
        if(squares[i+10].city2 || squares[i+1].city2 || squares[i-1].city2){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 0){
        if(squares[i+10].city2 || squares[i+1].city2){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 9){
        if(squares[i + 10].city2 || squares[i-1].city2 || squares[i+1].city2){
          tog = true;
        }else{
          tog = false;
        }
      }else if(i == 90){
        if(squares[i-10].city2 || squares[i+1].city2 || squares[i-1].city2){
          tog = true;
        }else{
          tog = false;
        }
      }

      if(tog){
        console.log('-.5');
        if(!squares[i + 10].full){
          x = squares[i+10].center_x;
          y = squares[i+10].center_y;
        }else if(!squares[i - 10].full){
          x = squares[i-10].center_x;
          y = squares[i-10].center_y;
        }else if(!squares[i - 1].full){
          x = squares[i-1].center_x;
          y = squares[i-1].center_y;
        }else if(!squares[i + 1].full){
          x = squares[i+1].center_x;
          y = squares[i+1].center_y;
        }else if(!squares[i+11].full){
          x = squares[i+11].center_x;
          y = squares[i+11].center_y;
        }else if(!squares[i-11].full){
          x = squares[i-11].center_x;
          y = squares[i-11].center_y;
        }else if(!squares[i+9].full){
          x = squares[i+9].center_x;
          y = squares[i+9].center_y;
        }else if(!squares[i-9].full){
          x = squares[i-9].center_x;
          y = squares[i-9].center_y;
        }

        if(x !== undefined && y !== undefined){
          console.log('0');
          let player = new Player(x, y, 1);
          player.character = 13;
          infoBoxes.push(new infoBox(x, y - 40));
          team2.push(player);
          numImmigrants2++;
          mineGenned2 = true;
          break;
        }
      }
    }
  }
}
