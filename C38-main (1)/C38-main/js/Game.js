class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
    
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200);
    car2=createSprite(300,200);
    car3=createSprite(500,200);
    car4=createSprite(700,200);
    cars=[car1,car2,car3,car4]
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();
  
    if(allPlayers !== undefined){
      //var display_position = 130;
      background(rgb(198,135,103));

      //index of the array
      var index=0;
      //x and y position of the car 
      var x=0;
      var y;
      
      for(var plr in allPlayers){
        //if (plr === "player" + player.index)
        index=index+1;

        //position of the car little away from eachother 
        x=x+200;

       //use data from database display the cars  y direction 
       y= displayHeight-allPlayers[plr.distance];
       cars [index-1].x=x;
       cars [index-1].y=y;

       if(index=== player.index ){
         fill("red")
         camera.position.x=displayWidht/2;
         camera.position.y=cars[index-1].y
       }
       else{
       fill("white")
       }
        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
