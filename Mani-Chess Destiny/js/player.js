class Player {
  constructor(x, y, team) {
    this.x = x;
    this.y = y;
    this.team = team;

    //remember to change this back to undeclared
    this.character;

    //in-turn variables
    this.dist = [];

    this.dragBuffer = 5;
  }

  static getIdx(x, y){
    let xco = ceil(x/(DIM/NUM_SQUARES));
    let yco = ceil(y/(DIM/NUM_SQUARES));
    return (xco-1)*NUM_SQUARES + yco;
  }

  static generatePlayer(team, char, idx){
    let generated1 = false;
    let generated2 = false;
    for(let i = 0; i < NUM_SQUARES*NUM_SQUARES; i++){
      if(!squares[i].occupied){
        if(abs(idx - 1) - i == 10 || abs(idx - 1) - i == 1
        || abs(idx - 1) - i == 11 || abs(idx - 1) - i == 9){
          if(team == 0 && !generated1){
            let player = new Player(squares[i].center_x, squares[i].center_y, 0);
            player.character = 13;
            team1.push(player);

            infoBoxes.push(new infoBox(player.x, player.y - 40));

            generated1 = true;
          }
          if(team == 1 && !generated2){
            let player = new Player(squares[i].center_x, squares[i].center_y, 1);
            player.character = 13;
            team2.push(player);
            infoBoxes.push(new infoBox(player.x, player.y - 40));

            generated2 = true;
          }
        }
      }
    }
  }

  place(x, y){
    this.checkIfPlayerInOccupiedSquare();

    if(!this.inOccupiedSquare){
      if(this.dist.length > 0){
        this.x = x;
        this.y = y;
      }
    }else{
      for(let i=0; i<NUM_SQUARES*NUM_SQUARES; i++){
        if(squares[i].current){
          if(this.dist.length > 0){
            this.x = squares[Player.getIdx(this.dist[0][0], this.dist[0][1]) - 1].center_x;
            this.y = squares[Player.getIdx(this.dist[0][0], this.dist[0][1]) - 1].center_y;
          }else{
            this.x = squares[i].center_x;
            this.y = squares[i].center_y;
          }
          this.inOccupiedSquare = false;
        }
      }
    }
  }

  static move(){
    if(mouseIsPressed){
      if(turn % 2 == 0){
        for(let i=0; i < team1.length; i++){
          if(dist(team1[i].x, team1[i].y, mouseX, mouseY) < PLAYER_RADIUS + 10 && team1[i].character > 4 && team1[i].character != 14){
            team1[i].dist.push([team1[i].x, team1[i].y]);
            team1[i].place(mouseX, mouseY);
          }
        }
      }else{
        for(let i=0; i < team2.length; i++){
          if(dist(team2[i].x, team2[i].y, mouseX, mouseY) < PLAYER_RADIUS + 10 && team2[i].character > 4 && team2[i].character != 14){
            team2[i].dist.push([team2[i].x, team2[i].y]);
            team2[i].place(mouseX, mouseY);
          }
        }
      }
    }else{
      for(let i=0; i<team1.length; i++){
        if(team1[i].dist.length > 0){
          let endIdx = Player.getIdx(team1[i].dist[team1[i].dist.length - 1][0], team1[i].dist[team1[i].dist.length - 1][1]);
          let startIdx = Player.getIdx(team1[i].dist[0][0],  team1[i].dist[0][1])

          //frontier/immigrant characters can only move one square horizontally or vertically - change it for cowboys so they can make cattle runs to railroads
          if(team1[i].character == 7 || team1[i].character == 13 || team1[i].character == 12 || team1[i].character == 11){
            if(abs(endIdx - startIdx) != 10 && abs(endIdx - startIdx) != 1){
              team1[i].x = team1[i].dist[0][0];
              team1[i].y = team1[i].dist[0][1];
            }//social/cultural reformers can move any amount on the diagonal
          }else if(team1[i].character == 10 || team1[i].character == 9 || team1[i].character == 8){
            if(abs(endIdx - startIdx) % 11 != 0 && abs(endIdx - startIdx) % 9 != 0){
              team1[i].x = team1[i].dist[0][0];
              team1[i].y = team1[i].dist[0][1];
            }//native americans can move any distance in the horizontal or vertical
          }else if(team1[i].character == 6 || team1[i].character == 5){
            if(abs(endIdx - startIdx) % 10 != 0 && abs(endIdx - startIdx) % 11 == 0 || abs(endIdx - startIdx) % 9 == 0 || reserved){
              team1[i].x = team1[i].dist[0][0];
              team1[i].y = team1[i].dist[0][1];
            }
          }

          let thisIdx = Player.getIdx(team1[i].x, team1[i].y);

          if(thisIdx != startIdx){
            turn++;
            mineGenned1 = false;
          }
        }

        team1[i].placePlayerInCenter();
        team1[i].dist = [];
      }

      for(let i = 0; i < team2.length; i++){
        if(team2[i].dist.length > 0){
          let endIdx = Player.getIdx(team2[i].dist[team2[i].dist.length - 1][0], team2[i].dist[team2[i].dist.length - 1][1]);
          let startIdx = Player.getIdx(team2[i].dist[0][0],  team2[i].dist[0][1])

          if(team2[i].character == 7 || team2[i].character == 13 || team2[i].character == 12 || team2[i].character == 11){
            if(abs(endIdx - startIdx) != 10 && abs(endIdx - startIdx) != 1){
              team2[i].x = team2[i].dist[0][0];
              team2[i].y = team2[i].dist[0][1];
            }
          }else if(team2[i].character == 10 || team2[i].character == 9 || team2[i].character == 8){
            if(abs(endIdx - startIdx) % 11 != 0 && abs(endIdx - startIdx) % 9 != 0){
              team2[i].x = team2[i].dist[0][0];
              team2[i].y = team2[i].dist[0][1];
            }
          }else if(team2[i].character == 6 || team2[i].character == 5){
            if(abs(endIdx - startIdx) % 10 != 0 && abs(endIdx - startIdx) % 11 == 0 || abs(endIdx - startIdx) % 9 == 0 || reserved){
              team2[i].x = team2[i].dist[0][0];
              team2[i].y = team2[i].dist[0][1];
            }
          }

          let thisIdx = Player.getIdx(team2[i].x, team2[i].y);

          if(thisIdx != startIdx){
            turn++;
            mineGenned2 = false;
          }
        }

        team2[i].placePlayerInCenter();
        team2[i].dist = [];
      }
    }

    // infoBox stuff
    for(let i=0; i<team1.length; i++){
      if(abs(team1[i].x - mouseX) < PLAYER_RADIUS + infoBoxes[i].width/4
      && abs(team1[i].y - mouseY) < PLAYER_RADIUS + team1[i].dragBuffer && (team1[i].dist.length == 0 ||
      dist(team1[i].dist[team1[i].dist.length - 1][0], team1[i].dist[team1[i].dist.length - 1][1],
      team1[i].dist[0][0], team1[i].dist[0][1]) == 0)){
        infoBoxes[i].updatePos(team1[i].x  - infoBoxes[i].width/2, team1[i].y - 40);
        infoBoxes[i].showing = true;
        infoBoxes[i].draw();
        infoBoxes[i].character = team1[i].character;
        infoBoxes[i].playerIdx = i;
        team1[i].dragBuffer = infoBoxes[i].height;
      }
    }
    for(let i = 0; i < team2.length; i++){
      if(abs(team2[i].x - mouseX) < PLAYER_RADIUS + infoBoxes[i + team1.length].width/4
      && abs(team2[i].y - mouseY) < PLAYER_RADIUS + team2[i].dragBuffer && (team2[i].dist.length == 0 ||
      dist(team2[i].dist[team2[i].dist.length - 1][0], team2[i].dist[team2[i].dist.length - 1][1],
      team2[i].dist[0][0], team2[i].dist[0][1]) == 0)){
        infoBoxes[i + team1.length].updatePos(team2[i].x - infoBoxes[i + team1.length].width/2, team2[i].y - infoBoxes[i + team1.length].height + 40);
        infoBoxes[i + team1.length].draw();
        infoBoxes[i + team1.length].showing = true;
        infoBoxes[i + team1.length].character = team2[i].character;
        infoBoxes[i + team1.length].playerIdx = i + team1.length;
        team2[i].dragBuffer = infoBoxes[i + team1.length].height;
      }else if(abs(team2[i].x - mouseX) >= PLAYER_RADIUS + infoBoxes[i].width/4
      && abs(team2[i].y - mouseY) >= PLAYER_RADIUS + team2[i].dragBuffer){
        infoBoxes[i].showing = false;
        team2[i].dragBuffer = 5;
      }
      if(abs(team2[i].x - mouseX) >= PLAYER_RADIUS + infoBoxes[i + team1.length].width/4
      && abs(team2[i].y - mouseY) >= PLAYER_RADIUS + team2[i].dragBuffer){
        infoBoxes[i + team1.length].showing = false;
        team2[i].dragBuffer = 5;
      }
    }
  }

  checkIfPlayerInOccupiedSquare(){

    let thisIdx = Player.getIdx(this.x, this.y);

    for(let i=0; i<NUM_SQUARES*NUM_SQUARES; i++){
      if(squares[i].occupied && abs(dist(squares[i].center_x, squares[i].center_y, this.x, this.y)) < hypotenuse){
        squares[i].current = true;
      }
    }

    if(this.dist.length > 0){
      let startIdx = Player.getIdx(this.dist[0][0], this.dist[0][1]);

      if(thisIdx != startIdx && squares[thisIdx - 1].occupied && squares[thisIdx - 1].num_occupying_circles > 1){
        this.inOccupiedSquare = true;
        console.log("%c \n You can't move into an occupied square! \n", 'color: #FF0000');
      }
    }


  }

  placePlayerInCenter(){
    this.place(squares[Player.getIdx(this.x, this.y) - 1].center_x, squares[Player.getIdx(this.x, this.y) - 1].center_y);
  }

  draw(){
    strokeWeight(1);
    if(this.team==1){
      fill(58, 22, 14);
      stroke(0);
    }else{
      fill(100,149,237);
      stroke(0);
    }

    if(this.character <= 2){
      square(this.x - PLAYER_RADIUS/2, this.y - PLAYER_RADIUS/2, PLAYER_RADIUS);
    }else if((this.character > 2 && this.character <= 4) || this.character == 14){
      noFill();
      strokeWeight(4);
      if(this.team==1){
        stroke(58, 22, 14);
      }else{
        stroke(100,149,237);
      }
      square(this.x - PLAYER_RADIUS/2, this.y - PLAYER_RADIUS/2, PLAYER_RADIUS);
    }else if(this.character >= 11){
      circle(this.x , this.y, PLAYER_RADIUS);
    }else if(this.character > 4 && this.character <= 7){
      noFill();
      strokeWeight(4);
      if(this.team==1){
        stroke(58, 22, 14);
      }else{
        stroke(100,149,237);
      }
      circle(this.x , this.y, PLAYER_RADIUS);
    }else{
      let height = sqrt((PLAYER_RADIUS*PLAYER_RADIUS) - ((PLAYER_RADIUS/2)*(PLAYER_RADIUS/2)))

      triangle(this.x - PLAYER_RADIUS/2, this.y + height/2, this.x, this.y - height/2, this.x + PLAYER_RADIUS/2, this.y + height/2)
    }
    strokeWeight(1);
  }

  static checkKills(){
    if(killRailroads1){
      let numKills = 0;
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
        if(squares[i].railroad1 && numKills < 2){
          numKills++;
          squares[i].railroad1 = false;
          numRailroads1--;
        }
      }
      killRailroads1 = false;
    }

    if(killFarmers1){
      for(let i = team1.length - 1; i >= 0; i--){
        if(team1[i].character == 12){
          team1.splice(i, 1);
          numFarmers1--;
          break;
        }
      }
      killFarmers1 = false;
    }

    if(killImmigrants1){
      for(let i = team1.length - 1; i >= 0; i--){
        if(team1[i].character == 13){
          team1.splice(i, 1);
          numImmigrants1--;
          break;
        }
      }
      killImmigrants1 = false;
    }


    if(killRailroads2){
      let numKills = 0;
      for(let i = NUM_SQUARES*NUM_SQUARES - 1; i >= 0; i--){
        if(squares[i].railroad2 && numKills < 2){
          numKills++;
          squares[i].railroad2 = false;
          numRailroads2--;
        }
      }
      killRailroads2 = false;
    }

    if(killFarmers2){
      for(let i = team2.length - 1; i >= 0; i--){
        if(team2[i].character == 12){
          team2.splice(i, 1);
          numFarmers2--;
          break;
        }
      }
      killFarmers2 = false;
    }

    if(killImmigrants2){
      for(let i = team2.length - 1; i >= 0; i--){
        if(team2[i].character == 13){
          team2.splice(i, 1);
          numImmigrants2--;
          break;
        }
      }
      killImmigrants2 = false;
    }



  }

}
