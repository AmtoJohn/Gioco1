function startGame() {
    myGameArea.start();
    //myGameArea.draw(redSquare);
    animatedObject.loadImages();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270    ;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
    } , 
    draw : function(component) {
        this.context.fillStyle = component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
      } ,
    clear : function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
    },

    move : function()
    {
      redSquare.y = redSquare.y + redSquare.speedY;
      redSquare.x = redSquare.x + redSquare.speedX;
    } ,

    drawGameObject: function(gameObject) {
      this.context.drawImage(
        gameObject.image,
        gameObject.x,
        gameObject.y,
        gameObject.width,
        gameObject.height
      )
    }
}
let move;
var animatedObject = {
  speedX: 0,
  speedY: 0,
  width: 60,
  height: 60,
  x: 10,
  y: 120,
  imageList: [], //Vettore che conterrà tutte le immagini caricate
  contaFrame: 0, //Tiene conto di quanti frame sono passati
  actualFrame: 0, //Specifica quale frame disegnare

  update: function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.contaFrame++;
    if (this.contaFrame == 1) {
      this.contaFrame = 0;
      this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
      //console.log(this.actualFrame);
      this.image = this.imageList[this.actualFrame];
    }
  },
  
  loadImages: function() {
     for (imgPath of attacking) {
      var img = new Image(this.width, this.height);
      img.src = imgPath;
      this.imageList.push(img);
      //console.log(img);
    }
    this.image = this.imageList[this.actualFrame];
  }
};

var redSquare = {
    width: 20,
    height: 20,
    x: 10,
    y: 120,
    color: "red" , 
    speedX : 0,
    speedY : 0
  };

  function moveup() {
    animatedObject.speedY -= 1;
  }
  
  function movedown() {
    animatedObject.speedY += 1;
  }
  
  function moveleft() {
    animatedObject.speedX -= 1;
  }
  
  function moveright() {
    animatedObject.speedX += 1;
  }

  function attack() {
    move = attack;
  }
  function jump() {
    move = jump;
  }

  document.addEventListener('keydown', function(event) {
    //left
    if(event.keyCode == 37) {
        animatedObject.x -= 10;
    }
    //top
    else if(event.keyCode == 38) {
        animatedObject.y -= 10;
    }
    //right
    else if(event.keyCode == 39) {
        animatedObject.x += 10;
    }
    //bottom
    else if(event.keyCode == 40) {
        animatedObject.y += 10;
    }
});

  function updateGameArea() {
    myGameArea.clear();
    myGameArea.move();
    //myGameArea.draw(redSquare);
    myGameArea.drawGameObject(animatedObject);
    animatedObject.update();
  }
  
  