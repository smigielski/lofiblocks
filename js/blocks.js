//Flot Line Chart
$(document).ready(function() {

  metics='mm';
  documentWidth=300;
  documentHeight=300;
  elementSize=3.1;

  lineWidth=0.1;

  firstColor='#f00';
  secondColor='#00f';

  var r = 0.5;
  var d = 0.3;

    console.log("document ready");

    // This example was created using Protovis & jQuery
// Base64 provided by http://www.webtoolkit.info/javascript-base64.html
// Modern web browsers have a builtin function to this as well 'btoa'
function encode_as_img_and_link(){

 var svg = $("#svg-drawing").html();
 var b64 = btoa(unescape(encodeURIComponent(svg)));

 $("#download").attr('href',"data:image/svg+xml;base64,\n"+b64);

}

function main(){
  var draw = SVG('svg-drawing').size(documentWidth+metics, documentHeight+metics);
  draw.viewbox(0, 0, documentWidth/elementSize, documentHeight/elementSize);
  return draw;
}


function drawPlainRect(n,m){

// create svg drawing


    var mainGroup = draw.group();
     mainGroup.rect(3*n, 3*m)
      .radius(r)
      .fill('none')
      .stroke({ color: secondColor, width: lineWidth })
      .move(1,1);

     var holesGroup = mainGroup.group();

     for (var i = 1; i <= n; i++) {
       for (var j = 1; j <= m; j++) {

         holesGroup.rect(1, 1)
          .fill('none')
          .stroke({ color: firstColor, width: lineWidth })
          .move(3*i-1,3*j-1);

        }
      }
      return mainGroup;
}

function teethX(x,y,direction){
  return 'L '+x+ ' ' + y +
  'L '+(x+direction)+ ' ' + y +
  'L '+(x+direction)+ ' ' + (y+direction) +
  'L '+(x)+ ' ' + (y+direction);
}

function teethY(x,y,direction){
  return 'L '+x+ ' ' + y +
  'L '+(x)+ ' ' + (y-direction) +
  'L '+(x+direction)+ ' ' + (y-direction) +
  'L '+(x+direction)+ ' ' + y;
}



function gapX(x,y,direction){


  return 'L '+x+ ' ' + y +
  'L '+(x-1*direction)+ ' ' + y +
  'L '+(x-1*direction)+ ' ' + (y-d*direction) +
  'L '+(x-2*direction)+ ' ' + (y-d*direction) +
  'L '+(x-2*direction)+ ' ' + y +
  'L '+(x-2*(1+d)*direction)+ ' ' + y +
  'L '+(x-2*(1+d)*direction)+ ' ' + (y+direction) +
  'L '+(x-2*direction)+ ' ' + (y+direction) +
  'L '+(x-2*direction)+ ' ' + (y+direction + d*direction) +
  'L '+(x-1*direction)+ ' ' + (y+direction + d*direction) +
  'L '+(x-1*direction)+ ' ' + (y+direction) +
  'L '+x+ ' ' + (y+direction);
}

function gapY(x,y,direction){

  return 'L '+x+ ' ' + y +
  'L '+x+ ' ' + (y+1*direction) +
  'L '+(x-d*direction)+ ' ' + (y+1*direction) +
  'L '+(x-d*direction)+ ' ' + (y+2*direction) +
  'L '+x+ ' ' + (y+2*direction) +
  'L '+x+ ' ' + (y+2*(1+d)*direction) +
  'L '+(x+direction)+ ' ' + (y+2*(1+d)*direction) +
  'L '+(x+direction)+ ' ' + (y+2*direction) +
  'L '+(x+direction + d*direction)+ ' ' + (y+2*direction) +
  'L '+(x+direction + d*direction)+ ' ' + (y+1*direction) +
  'L '+(x+direction)+ ' ' + (y+1*direction) +
  'L '+(x+direction)+ ' ' + y;
}

function arc(){
  return 'A '+ r+ ' ' + r + ' 0 0 1 ';
}


function drawConnectorX(n,m){


  var mainGroup = draw.group();


    var path = 'M '+ (3*n-r)+' 0 '+
      arc()+ 3*n+ ' '+ r;

    for (var j =0;j<m;j++){
      if (j % 2 == 0 || n==1){
        path = path + teethX(3*n,(3*j+1),1);
      } else {
        path = path + gapX(3*n,(3*j+1),1);
      }

    }

    path = path +
    'L '+3*n+' '+(3*m-r)+
    arc()+ (3*n-r)+' '+(3*m)+
    'L '+r+' '+3*m+
    arc()+ 0 + ' ' + (3*m-r);

    for (var j =m;j>0;j--){
      if ((j +m) % 2 == 0 || n==1){
        path = path + teethX(0,(3*j-1),-1);
      } else {
        path = path + gapX(0,(3*j-1),-1);
      }

    }

    path = path +
      'L '+0+' '+r+
      arc()+ r + ' '+ 0 +
      'Z';

     mainGroup.path(path)
      .fill('none')
      .stroke({ color: secondColor, width: lineWidth })
      .move(1,1);

     var holesGroup = mainGroup.group();

     for (var i = 1; i <= n; i++) {
       for (var j = 1; j <= m; j++) {
         if (n!=1 && i == 1 && (j+m) % 2 == 1 ||
             n!=1 && i == n && (j) % 2 == 0 ){
             //do nothing
           } else {
           holesGroup.rect(1, 1)
            .fill('none')
            .stroke({ color: firstColor, width: lineWidth })
            .move(3*i,3*j-1);
          }
        }
      }

      return mainGroup;
}

function drawConnectorY(n,m){

  var mainGroup = draw.group();

    var path = 'M '+ (3*n-r)+' 0 '+
      arc()+ 3*n+ ' '+ r +
      'L '+3*n+' '+(3*m-r)+
      arc()+ (3*n-r)+' '+(3*m);

    for (var i =n;i>0;i--){
      if (i % 2 != 0 || m==1){
        path = path + teethY((3*i-1),(3*m),-1);
      } else {
        path = path + gapY((3*i-1),(3*m),-1);
      }

    }

    path = path +
    'L '+r+' '+3*m+
    arc()+ 0 + ' ' + (3*m-r)+
    'L '+0+' '+r+
    arc()+ r + ' '+ 0;

    for (var i =0;i<n;i++){
      if ((i +n) % 2 != 0 || m==1 ){
        path = path + teethY((3*i+1),0,1);
      } else {
        path = path + gapY((3*i+1),0,1);
      }
    }

    path = path +
      'Z';

     mainGroup.path(path)
      .fill('none')
      .stroke({ color: secondColor, width: lineWidth })
      .move(1,1);

     var holesGroup = mainGroup.group();

     for (var i = 1; i <= n; i++) {
       for (var j = 1; j <= m; j++) {
         if (m!=1 && j == 1 && (i+n) % 2 == 1 ||
             m!=1 && j == m && (i) % 2 == 0 ){
             //do nothing
           } else {
           holesGroup.rect(1, 1)
            .fill('none')
            .stroke({ color: firstColor, width: lineWidth })
            .move(3*i-1,3*j);
          }
        }
      }

      return mainGroup;
}

function drawConnectorXY(n,m){

  var mainGroup = draw.group();


    var path = 'M '+ (3*n-r)+' 0 '+
      arc()+ 3*n+ ' '+ r;



      for (var j =0;j<m;j++){
        if (j % 2 == 0 || n==1 || j==m-1){
          path = path + teethX(3*n,(3*j+1),1);
        } else {
          path = path + gapX(3*n,(3*j+1),1);
        }

      }

      path = path + 'L '+3*n+' '+(3*m-r)+
      arc()+ (3*n-r)+' '+(3*m);

    for (var i =n;i>0;i--){
      if ((i+n-1) % 2 != 0 || m==1 || i==1){
        path = path + teethY((3*i-1),(3*m),-1);
      } else {
        path = path + gapY((3*i-1),(3*m),-1);
      }

    }

    path = path +
    'L '+r+' '+3*m+
    arc()+ 0 + ' ' + (3*m-r);

    for (var j =m;j>0;j--){
      if ((j +m-1)% 2 != 0 || n==1 || j==1){
        path = path + teethX(0,(3*j-1),-1);
      } else {
        path = path + gapX(0,(3*j-1),-1);
      }

    }

    path = path + 'L '+0+' '+r+
    arc()+ r + ' '+ 0;

    for (var i =0;i<n;i++){
      if (i % 2 == 0 || m==1 || i == n-1){
        path = path + teethY((3*i+1),0,1);
      } else {
        path = path + gapY((3*i+1),0,1);
      }
    }

    path = path +
      'Z';

     mainGroup.path(path)
      .fill('none')
      .stroke({ color: secondColor, width: lineWidth })
      .move(1,1);

     var holesGroup = mainGroup.group();

     for (var i = 1; i <= n; i++) {
       for (var j = 1; j <= m; j++) {
         if (i==1&&(j==1||j==m)||i==n&&(j==1||j==m)||
           !(m!=1 && j == 1 && i % 2 == 0 ||
             m!=1 && j == m && (i+n) % 2 == 1 ||
             n!=1 && i == 1 && (j+m) % 2 == 1 ||
             n!=1 && i == n && j % 2 == 0)){
           holesGroup.rect(1, 1)
            .fill('none')
            .stroke({ color: firstColor, width: lineWidth })
            .move(3*i,3*j);
          }
        }
      }
      return mainGroup;
}

// base rectangle
// mainGroup.path('M '+ (3*n-r)+' 0 '+
// arc+ 3*n+ ' '+ r+
// 'L '+3*n+' '+(3*m-r)+
// arc+ (3*n-r)+' '+(3*m)+
// 'L '+r+' '+3*m+
// arc+ 0 + ' ' + (3*m-r)+
// 'L '+0+' '+r+
// arc+ r + ' '+ 0 +
// 'Z')


    var draw = main();

    drawPlainRect(3,3);
    drawConnectorXY(3,3).move(15,0);
    drawConnectorX(3,3).move(30,0);
    drawConnectorY(3,3).move(45,0);

    drawPlainRect(3,1).move(0,15);;
    drawConnectorXY(3,1).move(15,15);
    drawConnectorX(3,1).move(30,15);
    drawConnectorY(3,1).move(45,15);

    drawPlainRect(1,1).move(0,30);;
    drawConnectorXY(1,1).move(15,30);
    drawConnectorX(1,1).move(30,30);
    drawConnectorY(1,1).move(45,30);

    drawPlainRect(2,2).move(0,45);;
    drawConnectorXY(2,2).move(15,45);
    drawConnectorX(2,2).move(30,45);
    drawConnectorY(2,2).move(45,45);


    drawPlainRect(3,2).move(0,60);;
    drawConnectorXY(3,2).move(15,60);
    drawConnectorX(3,2).move(30,60);
    drawConnectorY(3,2).move(45,60);

     encode_as_img_and_link();

});
