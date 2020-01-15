class Button{
  constructor(x, y, width, height, background_color, message, text_size, text_color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background_color = background_color;

    this.message = message;
    this.text_size = text_size;
    this.text_color = text_color;
    this.xoff = 0;
    this.yoff = 0;
  }

  show(){
    if(mouseX < this.x + this.width && mouseX > this.x && mouseY < this.y + this.height && mouseY > this.y){
      fill(207, 205, 189);
    }else{
      fill(217,215,199);
    }
    rect(this.x, this.y, this.width, this.height, 20);
    textSize(this.text_size);
    fill(0);
    text(this.message, this.x + 10 + this.xoff, this.y + this.height/2 + 10 + this.yoff);
  }

  checkClicked(){
    if(mouseIsPressed && mouseX < this.x + this.width && mouseX > this.x && mouseY < this.y + this.height && mouseY > this.y){
      this.background_color = (50, 50, 50);
      sleep(200);
      return true
    }
    if(!mouseIsPressed){
      return false;
    }
  }

}
