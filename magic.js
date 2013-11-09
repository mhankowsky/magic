
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




function findLine(canvas){
  var context = canvas.getContext("2d");
  console.log(canvas.width);
  console.log(canvas.height);
  var TL_points = [];
  var BL_points = [];
  var TR_points = [];
  var BR_points = [];

//TL
  for(var i=0; i<100; i=i+10){
    for(var j=0; j<100; j=j+10){
    checkRed(canvas, i, j, TL_points);
    }
  }

  //BL
  for(var i=0; i<100; i=i+10){
    for(var j=(canvas.height-100); j<canvas.height; j=j+10){
    checkRed(canvas, i, j, BL_points);
    }
  }

  //TR
  for(var i=(canvas.width-100); i<canvas.width; i=i+10){
    for(var j=0; j<100; j=j+10){
    checkRed(canvas, i, j, TR_points);
    }
  }
  //BR
  for(var i=(canvas.width-100); i<canvas.width; i=i+10){
    for(var j=(canvas.height-100); j<canvas.height; j=j+10){
    checkRed(canvas, i, j, BR_points);
    }
  }

        
  var t_points = TL_points.length;
  var b_points = BL_points.length;
  var l_points = TR_points.length;
  var r_points = BR_points.length;

  var totals = [t_points, b_points, l_points, r_points];
  var winner = totals.indexOf(Math.max(t_points, b_points, l_points, r_points));
  console.log("Totals: "+totals);

  if(Math.max(t_points, b_points, l_points, r_points)==0){
    winner = -1;
  }
  console.log(winner);
  var rgb_string;

  switch(winner){
    case 0: 
      winner = 'TL';
      rgb_string = "rgb(255,0,0)";
      break;
    case 1:
      winner = 'BL';
      rgb_string = "rgb(0,255,0)";
      break;
    case 2:
      winner = 'TR';
      rgb_string = "rgb(0,0,255)";
      break;
    case 3:
      winner = 'BR';
      rgb_string = "rgb(155,0,155)";
      break;
    default:
      winner = ERR;
      rgb_string = "rgb(0,0,0)";
    }

  console.log(winner);
  setTimeout(function() {
  document.body.style.backgroundColor = rgb_string;
  }, (1000));

}

function checkRed(canvas, x, y, points){
  var rgb = getColor(canvas, x, y);
  if(rgb[0]>150 && rgb[1]>150 && rgb[2]>150){
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
