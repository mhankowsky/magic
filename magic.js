
function Point (X, Y, R){
  this.X = X; 
  this.Y = Y;
  this.R = R;
}

Point.prototype.getX = function(){
  return this.X;
}
Point.prototype.getY = function(){
  return this.Y;
}
Point.prototype.getR = function(){
  return this.R;
}



var canvas = document.getElementById("canvas");

function findLine(canvas){
  var context = canvas.getContext("2d");
  console.log(canvas.width);
  console.log(canvas.height);
  var top_points = [];
  var bot_points = [];
  var lef_points = [];
  var rig_points = [];

//Top row
  for(var i=0; i<canvas.width; i=i+5){
    for(var j=0; j<50; j=j+2){
    checkRed(canvas, i, j, top_points);
    }
  }

  //Bottom
  for(var i=0; i<canvas.width; i=i+5){
    for(var j=(canvas.height-50); j<canvas.height; j=j+2){
    checkRed(canvas, i, j, bot_points);
    }
  }

  //left
  for(var i=0; i<50; i=i+2){
    for(var j=0; j<canvas.height; j=j+5){
    checkRed(canvas, i, j, lef_points);
    }
  }

  for(var i=(canvas.width-50); i<canvas.width; i=i+2){
    for(var j=0; j<canvas.height; j=j+5){
    checkRed(canvas, i, j, rig_points);
    }
  }

        
  var t_points = top_points.length;
  var b_points = bot_points.length;
  var l_points = lef_points.length;
  var r_points = rig_points.length;

  var totals = [t_points, b_points, l_points, r_points];
  var winner = totals.indexOf(Math.max(t_points, b_points, l_points, r_points));
  console.log("Totals: "+totals);

  console.log(winner);
  var rgb_string;

  switch(winner){
    case 0: 
      winner = 'TOP';
      rgb_string = "rgb(255,0,0)";
      break;
    case 1:
      winner = 'BOT';
      rgb_string = "rgb(0,255,0)";
      break;
    case 2:
      winner = 'LEF';
      rgb_string = "rgb(0,0,255)";
      break;
    case 3:
      winner = 'RIG';
      rgb_string = "rgb(155,0,155)";
      break;
    default:
      winner = ERR;
      rgb_string = "rgb(0,0,0)";
    }

  console.log(winner);
  document.body.style.backgroundColor = rgb_string;

}

function checkRed(canvas, x, y, points){
  var rgb = getColor(canvas, x, y);
  if(rgb[0]>150 && rgb[1]<140 && rgb[2]<140){
    var toAdd = new Point(x,y,rgb[0]);
    points.push(toAdd);
    console.log("Point added X:"+x+" Y:"+y);
  }
}


function getColor(canvas, x, y) {    
    var context = canvas.getContext("2d");
    var pixel = context.getImageData(x, y, 1, 1);

    // Red = rgb[0], green = rgb[1], blue = rgb[2]
    var rgb = pixel.data;
 
    return rgb;
}
