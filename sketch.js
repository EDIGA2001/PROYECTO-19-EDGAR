var PLAY = 1;
var END = 0;
var gameState = PLAY;
var piso; 
var paisaje, paisajeImg;
var mario,mariocorre, mariopierde;
var enemigosGroup, enemigo1, enemigo2,enemigo3;
var puntuacion=0;  
var gameOver, restart;

function preload(){
    paisajeImg=loadImage("fondo1.png");
    mariocorre=loadAnimation("mario-camina.png","mario-salta2.png");
    mariopierde=loadAnimation("mariopierde.png");
    enemigo1=loadImage("enem1.png");
    enemigo2=loadImage("enem2.png");
    enemigo3=loadImage("enem3.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(800,600);
    //Crear el fondo-paisaje
    //paisaje=createSprite(300,200);
   // paisaje.addImage("paisaje",paisajeImg);
    //Crear  al  personaje Mario bros
    mario=createSprite(80,405,4,4);
    mario.addAnimation("corriendo",mariocorre);
    mario.addAnimation("pierde",mariopierde); 
    mario.scale=0.07;
    //paisaje.velocityX=-2;
    piso=createSprite(45,570,1450,10);
    piso.shapeColor="brown";
    gameOver = createSprite(350,100,10,10);
    gameOver.addImage(gameOverImg);
    restart = createSprite(380,200, 20,20);
    restart.addImage(restartImg);
    gameOver.scale=0.5;
    restart.scale=0.5;
    enemigosGroup = new Group();
    
    gameOver.visible=false;
    restart.visible=false;
}

function draw() {
    background(paisajeImg);
      text("Puntuacion: " + puntuacion, 280, 400);
      if(gameState===PLAY){
           puntuacion=puntuacion + Math.round(getFrameRate()/60);           
           if (keyDown("space") ) {
             mario.velocityY= -10;
            }
         mario.velocityY=mario.velocityY + 0.5
         mario.collide(piso); 
         //if(paisaje.x<200){
           //  paisaje.x=400;
            //}
         losenemigos();  
         if (enemigosGroup.isTouching(mario)){
             gameState = END;
            }  
        }
       else if (gameState===END){
              gameOver.visible = true;
              restart.visible = true;
              //Detener los objetos-velocidad en 0
              //paisaje.velocityX = 0;
              mario.velocityY = 0; 
              enemigosGroup.setVelocityXEach(0);
             //cambiar animacion del mario - aun  falta esa  imagen
             mario.changeAnimation("pierde",mariopierde); 
             //establecer tiempo de vida a los objetos de juego para que nunca se destruyan
             enemigosGroup.setLifetimeEach(-1);

             if(mousePressedOver(restart)){
                  reset ();
                }
            } 
   drawSprites();
}
function losenemigos(){
    if(frameCount% 90 === 0) {
       var enemigo = createSprite(735,510,1,1);
       enemigo.velocityX= -3;
       //generar enemigos aleatorios
       var rand = Math.round(random(1,3)) 
       switch(rand) {
           case 1: enemigo.addImage(enemigo1);
                   break;
           case 2: enemigo.addImage(enemigo2);
                   break;
           case 3: enemigo.addImage(enemigo3);
                   break;
           default:break; 
       }
       //dar tamaño y tiempo de vida a los enemigos
       enemigo.scale = 0.1; 
       enemigo.lifetime = 200;
       //agregar los enemigos  al grupo
       enemigosGroup.add(enemigo);
    }
}
function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false; 
    enemigosGroup.destroyEach();
    mario.changeAnimation("corriendo",mariocorre);
    puntuacion=0;
}  

