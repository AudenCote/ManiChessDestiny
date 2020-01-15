class Header{
  constructor(message, x, y, width, height, text_size, xoffset, yoffset, background_color){
    this.message = message;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xoffset = xoffset;
    this.yoffset = yoffset;
    this.text_size = text_size;
    this.background_color = background_color;

    this.show();
  }

  show(){
    // fill(this.background_color);
    fill(217,215,199);
    rect(this.x, this.y, this.width, this.height, 5);
    textSize(this.text_size);
    fill(0);
    text(this.message, this.x + this.xoffset, this.y + this.height/2 + this.yoffset);
  }
}
