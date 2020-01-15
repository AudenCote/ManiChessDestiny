class infoBox{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 120;

    this.showing = false;
    this.character;
    this.playerIdx;
    this.team;

    this.buttonClicked = false;
    this.done = false

    this.characterName;
  }

  static doPlayerAbility1(idx, team, character){
    let charIdx;

    if(team == 0){
      charIdx = Player.getIdx(team1[idx].x, team1[idx].y);
    }else{
      charIdx = Player.getIdx(team2[idx].x, team2[idx].y);
    }


    //Immigrants - build city
    if(character == 13){
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
        Sqr.checkWhetherSquareIsOccupied(squares[i]);
        if(!squares[i].full && (abs(i - (charIdx - 1)) == 10 || abs(i - (charIdx - 1)) == 1) && i % 10 != 0){
          if(team == 0 && turn % 2 == 0){
            if(numCities1 <= 2 && numFarmers1 > 0 && numFarmers1 <= 5){
              console.log('1');
              squares[i].city1 = true;
              numCities1++;
              turn++;
              mineGenned1 = false;
            }else if(numCities1 >= 2 && (numRailroads1 >= 2 || numMines1 >= 2) && numFarmers1 > 0 && numFarmers1 <= 5){
              console.log('2');
              squares[i].city1 = true;
              numCities1++;
              turn++;
              mineGenned2 = false;
            }
          }else if(team == 1 && turn % 2 != 0){
            if(numCities2 < 2 && numFarmers2 > 0 && numFarmers2 <= 5){
              squares[i].city2 = true;
              numCities2++;
              turn++;
              mineGenned1 = false;
            }else if(numCities2 >= 2 && (numRailroads2 >= 2 || numMines2 >= 2) && numFarmers2 > 0 && numFarmers2 <= 5){
              squares[i].city2 = true;
              numCities2++;
              turn++;
              mineGenned2 = false;
            }
          }
          break;
        }
      }
    }

    //Business Owners - build railroads
    if(character == 0 || character == 2){
      BUILDING_RAIL = true;
      busTeam = team; busIdx = idx;
    }

    if(character == 11){
      COWBOYING = true;
      cowTeam = team; cowIdx = idx;
    }

    if(character == 1){
      BUILDING_MINE = true;
      mineTeam = team; mineIdx = idx;
    }

    //Social/cultural reformers - expose
    if(character == 8 || character == 9){

      if(team == 0 && (turn + 1) % 5 == 0){
        let x;
        let y;
        for(let i = team2.length - 1; i >= 0; i--){
          if(team2[i].character == 13){
            x = team2[i].x; y = team2[i].y;
            team2.splice(i, 1);
            numImmigrants2--;
            infoboxes.splice(i + team1.length, 1);
            let player = new Player(x, y, 0);
            player.character = 13;
            team1.push(player);
            numImmigrants1++;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            turn++;
            mineGenned1 = false;
            break;
          }
        }
      }else if(team == 1 && turn % 5 == 0){
        let x;
        let y;
        for(let i = team1.length - 1; i >= 0; i--){
          if(team1[i].character == 13){
            console.log('0');
            x = team1[i].x; y = team1[i].y;
            team1.splice(i, 1);
            numImmigrants1++;
            infoboxes.splice(i, 1);
            let player = new Player(x, y, 1);
            player.character = 13;
            team2.push(player);
            numImmigrants2--;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            turn++;
            mineGenned2 = false;
            break;
          }
        }
      }

    }

    //Frederick Remington - Recruit
    if(character == 10){
      if(team == 0 && turn % 2 == 0){
        for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
          if(!squares[i].full && numCities2 > 0){
            console.log('2');
            let player = new Player(squares[i].center_x, squares[i].center_y, 0);
            player.character = 12;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team1.push(player);
            numFarmers1++;
            turn++;
            mineGenned1 = false;
            break;
          }
        }
      }else if(team == 1 && turn % 2 == 1){
        for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0 ; i--){
          if(!squares[i].full && numCities1 > 0){
            let player = new Player(squares[i].center_x, squares[i].center_y, 1);
            player.character = 12;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team2.push(player);
            numFarm++;
            turn++;
            mineGenned2 = false;
            break;
          }
        }
      }
    }

    //Populist - make farmers
    if(character == 14){
      if(team == 0 && turn % 2 == 0 && tweed1){
        console.log('here');
        for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
          if(!squares[i].full){
            console.log('2');
            let player = new Player(squares[i].center_x, squares[i].center_y, 0);
            player.character = 12;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team1.push(player);
            numFarmers1++;
            turn++;
            mineGenned1 = false;
            break;
          }
        }
      }else if(team == 1 && turn % 2 == 1 && tweed2){
        for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0 ; i--){
          if(!squares[i].full){
            let player = new Player(squares[i].center_x, squares[i].center_y, 1);
            player.character = 12;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team2.push(player);
            numFarmers2++;
            turn++;
            mineGenned2 = false;
            break;
          }
        }
      }
    }

    //Republican - make b.o.
    if(character == 3){
      if(team == 0 && turn % 2 == 0 && tweed1){
        for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
          if(!squares[i].occupied && !squares[i].railroad1 && !squares[i].railroad2 && !squares[i].city1 && !squares[i].city2){
            console.log('2');
            let player = new Player(squares[i].center_x, squares[i].center_y, 0);
            player.character = 0;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team1.push(player);
            turn++;
            mineGenned1 = false;
            break;
          }
        }
      }else if(team == 1 && turn % 2 == 1 && tweed2){
        for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0 ; i--){
          if(!squares[i].occupied && !squares[i].railroad1 && !squares[i].railroad2 && !squares[i].city1 && !squares[i].city2){
            let player = new Player(squares[i].center_x, squares[i].center_y, 1);
            player.character = 0;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team2.push(player);
            turn++;
            mineGenned2 = false;
            break;
          }
        }
      }
    }

    //Democrat - kill freedmen
    if(character == 4){
      if(team == 0 && turn % 2 == 0 && tweed1){
        for(let i = team2.length - 1; i >= 0; i--){
          if(team2[i].character == 7){
            team2.splice(i, 1);
            infoBoxes.splice(i + team1.length, 1);
            break;
          }
        }
      }else if(team == 1 && turn % 2 == 1 && tweed2){
        for(let i = team1.length - 1; i >= 0; i--){
          if(team1[i].character == 7){
            team1.splice(i, 1);
            infoBoxes.splice(i, 1);
            break;
          }
        }
      }
    }

    //Wovoka - kill farmer
    if(character == 6){
      if(team == 0 && turn % 2 == 0){
        for(let i = team2.length - 1; i >= 0; i--){
          if(team2[i].character == 12){
            team2.splice(i, 1);
            infoBoxes.splice(i + team1.length, 1);
            numFarmers2--;
            break;
          }
        }
      }else if(team == 1 && turn % 2 == 1){
        for(let i = team1.length - 1; i >= 0; i--){
          if(team1[i].character == 12){
            team1.splice(i, 1);
            numFarmers1--;
            infoBoxes.splice(i, 1);
            break;
          }
        }
      }
    }

    //Crazy Horse - kill politician
    if(character == 5){
      if(team == 0 && turn % 2 == 0){
        for(let i = team2.length - 1; i >= 0; i--){
          if(team2[i].character == 4){
            team2.splice(i, 1);
            infoBoxes.splice(i + team1.length, 1);
            break;
          }
        }
      }else if(team == 1 && turn % 2 == 1){
        for(let i = team1.length - 1; i >= 0; i--){
          if(team1[i].character == 4){
            team1.splice(i, 1);
            infoBoxes.splice(i, 1);
            break;
          }
        }
      }
    }

    //Beecher Stowe - add freedman
    if(character == 8){
      if(team == 0 && turn % 2 == 0){
        for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
          if(!squares[i].full){
            let player = new Player(squares[i].center_x, squares[i].center_y, 0);
            player.character = 7;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team1.push(player);
            turn++;
            mineGenned1 = false;
            break;
          }
        }
      }else if(team == 1 && turn % 2 == 1){
        for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0 ; i--){
          if(!squares[i].occupied && !squares[i].railroad1 && !squares[i].railroad2 && !squares[i].city1 && !squares[i].city2){
            let player = new Player(squares[i].center_x, squares[i].center_y, 1);
            player.character = 7;
            infoBoxes.push(new infoBox(player.x, player.y - 40));
            team2.push(player);
            turn++;
            mineGenned2 = false;
            break;
          }
        }
      }
    }


  }

  updatePos(x, y){
    this.x = x;
    this.y = y;
  }

  draw(){
    if(this.showing && showBoxes){
      fill(255);
      rect(this.x, this.y, this.width, this.height, 5);

      switch(this.character){
        case 0:
          this.characterName = "Vanderbilt";
          break;
        case 1:
          this.characterName = "Gowen";
          break;
        case 2:
          this.characterName = "J.P. Morgan";
          break;
        case 3:
          this.characterName = "Republican";
          break;
        case 4:
          this.characterName = "Democrat";
          break;
        case 5:
          this.characterName = "Crazy Horse";
          break;
        case 6:
          this.characterName = "Wovoka";
          break;
        case 7:
          this.characterName = "Freedman";
          break;
        case 8:
          this.characterName = "Beecher Stowe";
          break;
        case 9:
          this.characterName = "Anthony";
          break;
        case 10:
          this.characterName = "Remington";
          break;
        case 11:
          this.characterName = "Cowboy";
          break;
        case 12:
          this.characterName = "Farmer";
          break;
        case 13:
          this.characterName = "Immigrant";
          break;
        case 14:
          this.characterName = "Populist";
      }

      powerHeader = new Header(this.characterName, this.x + 10, this.y + 10, 75, 30, 10, 5, 5, (255, 255, 255))

      if(this.character >= 0){
        for(let i = 0; i < NUM_POWERS; i++){
          powerButtons[i].x = this.x + 12.5;
          powerButtons[i].y = this.y + 50 + (i * 48);
          if(this.character == 13){
            powerButtons[i].message = "Build City";
            powerButtons[i].text_size = 15;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 0 || this.character == 2){
            powerButtons[i].message = "Build Rail";
            powerButtons[i].text_size = 15;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 11){
            powerButtons[i].message = "Run Cattle";
            powerButtons[i].text_size = 14;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 9 || this.character == 8){
            powerButtons[i].message = "Expose";
            powerButtons[i].text_size = 15;
            powerButtons[i].xoff = 0;
            powerButtons[i].yoff = -5;
          }else if(this.character == 10){
            powerButtons[i].message = "Recruit";
            powerButtons[i].text_size = 15;
            powerButtons[i].xoff = 0;
            powerButtons[i].yoff = -5;
          }else if(this.character == 3){
            powerButtons[i].message = "Get B.O.";
            powerButtons[i].text_size = 15;
            powerButtons[i].xoff = 0;
            powerButtons[i].yoff = -5;
          }else if(this.character == 4){
            powerButtons[i].message = "Racism";
            powerButtons[i].text_size = 15;
            powerButtons[i].xoff = 0;
            powerButtons[i].yoff = -5;
          }else if(this.character == 14){
            powerButtons[i].message = "Get Farmer";
            powerButtons[i].text_size = 14;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 1){
            powerButtons[i].message = "Build Mine";
            powerButtons[i].text_size = 15;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 12){
            powerButtons[i].message = "No Abilities";
            powerButtons[i].text_size = 14;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 6){
            powerButtons[i].message = "Rmv Farmer";
            powerButtons[i].text_size = 13;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 5){
            powerButtons[i].message = "Rmv Pol";
            powerButtons[i].text_size = 13;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }else if(this.character == 7){
            powerButtons[i].message = "No Abilities";
            powerButtons[i].text_size = 14;
            powerButtons[i].xoff = -4;
            powerButtons[i].yoff = -5;
          }
          powerButtons[i].show();
        }

        if(powerButtons[0].checkClicked()){
          if(this.playerIdx > team1.length - 1){
            this.playerIdx = this.playerIdx - team1.length;
            this.team = 1;
          }else{
            this.team = 0;
          }
          infoBox.doPlayerAbility1(this.playerIdx, this.team, this.character);
        }
      }

    }
  }
}
