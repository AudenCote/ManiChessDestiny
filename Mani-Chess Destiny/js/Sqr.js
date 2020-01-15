class Sqr{
  constructor(x, y, dim){
    //Setting up the location of each square
    this.x = x;
    this.y = y;
    this.dim = dim;

    //getting the center value of each square
    this.center_x = x + (DIM/NUM_SQUARES)/2;
    this.center_y = y + (DIM/NUM_SQUARES)/2;

    //whether this square is occupied currently
    this.occupied = false;

    this.num_occupying_circles = 0;

    //whether this is the square of the player being currently looked at
    this.current = false;
    this.color = (120, 120, 120)

    this.city1 = false;
    this.city2 = false;

    this.railroad1 = false;
    this.railroad2 = false;

    this.mine1 = false;
    this.mine2 = false;

    this.full = false;

    this.forest = false;

    this.baseball = false;

    this.windmill = false;
  }

  draw(){
    fill(195,151,106);
    stroke(255);
    //drawing the square
    if(this.city1){
      fill(100,149,237);
    }else if(this.city2){
      fill(58, 22, 14);
    }else if(this.railroad1 || this.railroad2){
      square(this.x, this.y, this.dim);
      strokeWeight(8);

      stroke(139, 69, 19);
      line(this.x + 4, this.y + this.dim/5 + 4, this.x + this.dim  + 4, this.y + this.dim/5  - 4);
      line(this.x + 4, this.y + 4 + this.dim * .8, this.x + this.dim  + 4, this.y + this.dim * .8 - 4);

      if(this.railroad1){
        stroke(100,149,237);
      }else{
        stroke(58, 22, 14);
      }

      line(this.x + 4, this.y + 4, this.x + 4, this.y + this.dim - 4);
      line(this.x + this.dim - 4, this.y + 4, this.x + this.dim - 4, this.y + this.dim  + 4);
    }else if(this.mine1 || this.mine2){
      fill(0, 0, 0);
    }else if(this.forest){
      fill(34,139,34);
    }else if(this.baseball){
      square(this.x, this.y, this.dim);
      strokeWeight(6);
      stroke(34,139,34);
      fill(245,222,179);

      arc(this.x + this.dim/3, this.y + this.dim*.75, this.dim*.75, this.dim*.75, -2*PI/3, 0);
    }else if(this.windmill){
      square(this.x, this.y, this.dim);
      strokeWeight(8);
      stroke(58, 22, 14);

      line(this.x + this.dim/2, this.y + this.dim/2, this.x + this.dim/2, this.y + this.dim/8);
      line(this.x + this.dim/2, this.y + this.dim/2, this.x + this.dim*.875, this.y + this.dim/2);
      line(this.x + this.dim/2, this.y + this.dim/2, this.x + this.dim/2, this.y + this.dim*.875);
      line(this.x + this.dim/2, this.y + this.dim/2, this.x + this.dim/8, this.y + this.dim/2);

    }

    strokeWeight(1);

    if(!this.railroad1 && !this.railroad2 && !this.baseball && !this.windmill){
      square(this.x, this.y, this.dim);
    }

    if(this.occupied && DEBUG){
      ellipse(this.center_x, this.center_y, 40);
    }

    if(this.occupied || this.railroad1 || this.railroad2
    || this.city1 || this.city2 || this.mine1 || this.mine2 || this.forest || this.baseball || this.windmill){
      this.full = true;
    }else{
      this.full = false;
    }
  }

  static checkWhetherSquareIsOccupied(square){
    for(let i = 0; i < team1.length; i++){
      if(dist(team1[i].x, team1[i].y, square.center_x, square.center_y) < hypotenuse){
        square.occupied = true;
        square.num_occupying_circles++;
      }
    }
    for(let i = 0; i < team2.length; i++){
      if(dist(team2[i].x, team2[i].y, square.center_x, square.center_y) < hypotenuse){
        square.occupied = true;
        square.num_occupying_circles++
      }
    }

    if(square.city1 || square.city2){
      square.occupied = true;
      square.num_occupying_circles = 3;
    }
  }
}
