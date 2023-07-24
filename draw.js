const { createCanvas } = require("canvas");
const fs = require("fs");

const width = 1200;
const height = 600;
const boxSpace=100;
const jumWidth=width/boxSpace;
const jumHeight=height/boxSpace;

// Add post object with the content to render
const post = {
  title: "Draw and save images with Canvas and Node"
}

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

// Set the style of the test and render it to the canvas
context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";
// 600 is the x value (the center of the image)
// 170 is the y (the top of the line of text)
context.fillText(post.title, 600, 170);

for(var h=0;h<jumHeight;h++){
    const theY=h*boxSpace;
for(var i=0;i<jumWidth;i++){
    const theX=i*boxSpace;
    context.beginPath();
context.rect(theX, theY, boxSpace, boxSpace);
context.fillStyle = 'black';
context.fill();
context.lineWidth = 0.3;
context.strokeStyle = 'yellow';
context.stroke(); 
    }
}
 
var pintu={};
var blokir={
    "1_1":true,
};
var traceDone={ 
};
for(var x=1;x<=jumWidth;x++){ 
    for(var y=1;y<=jumHeight;y++){
        pintu[x+"_"+y]={
            kiri:1,
            kanan:1,
            atas:1,
            bawah:1,
            ada:0,
            pernahBuka:0,
            jejakPintu:[[x+"_"+y]],
        };
}
}
 
 

// pintu["1_1"].kanan=0;
// drawBox(1,1);
// pintu["2_1"].kiri=0;
// pintu["2_1"].bawah=0;
// drawBox(2,1);
// pintu["2_2"].atas=0;
// drawBox(2,2);
pintu["1_1"].ada=1; 
var pintuKeluar=jumWidth+"_"+jumHeight;
var sekali=true;
var nextSearch=[];
var traceSearch=[];
cariLangkah(1,1);

for(var x=1;x<=jumWidth;x++){ 
    for(var y=1;y<=jumHeight;y++){
        if(pintu[x+"_"+y].ada==1){

            drawBox(x,y);
        }
}
}

const firstChoice=getPintu(1,1);
traceSearch.push(firstChoice);

cariJalur();

function cariJalur(){

    try{ 
        const pintuList= traceSearch.pop();
        console.log("search pintuList : "+pintuList);

        const getIdx=Math.floor(Math.random() * pintuList.length);
        const thePintu=pintuList[getIdx];
        console.log("get thePintu : "+thePintu);
        var newPintuList=[];
        pintuList.forEach(element => {
            if(element!=thePintu){
                newPintuList.push(element);
            }
        });
        if(newPintuList.length>0){
            traceSearch.push(newPintuList);
        }
        console.log("newPintuList : "+newPintuList);

        const theSplit=thePintu.split("_"); 
        const pintuChoice=getPintu(theSplit[0],theSplit[1]);
        if(thePintu==pintuKeluar){
            var lastList=pintu[thePintu].jejakPintu[pintu[thePintu].jejakPintu.length-1];
            console.log("dapet pintu keluar "+lastList);

            lastList.forEach(element => {
           
        const theSplit=element.split("_"); 
        drawTitik(theSplit[0],theSplit[1]);
        });
        const thePintuKeluarSplit=pintuKeluar.split("_"); 
        drawPintu(thePintuKeluarSplit[0],thePintuKeluarSplit[1]);
 
        }else{

            if(pintuChoice.length>0){

                traceSearch.push(pintuChoice);
            }
            
            
            cariJalur();
        }
    }catch(err){

    }
}

function getPintu(x,y){
    var dafPintu=[];
    const currentPintu=x+"_"+y;
    console.log("getPintu posisi "+x+","+y);
    traceDone[x+"_"+y]=true;
    try{
if(pintu[x+"_"+y].atas==0){
    const nextKey=cariNextkey(x,y,1);
    var lastList=pintu[nextKey].jejakPintu[pintu[nextKey].jejakPintu.length-1];
    var lastOriginList=pintu[currentPintu].jejakPintu[pintu[currentPintu].jejakPintu.length-1];
  
    lastOriginList.forEach(element => {
       
        lastList.push(element);
       
    }); 
    pintu[nextKey].jejakPintu.push(lastList);

    const theSplit=nextKey.split("_"); 
if(traceDone[theSplit[0]+"_"+theSplit[1]]==null){

    dafPintu.push(theSplit[0]+"_"+theSplit[1]);
}
}
if(pintu[x+"_"+y].kanan==0){
    const nextKey=cariNextkey(x,y,2);  
    var lastList=pintu[nextKey].jejakPintu[pintu[nextKey].jejakPintu.length-1];
    var lastOriginList=pintu[currentPintu].jejakPintu[pintu[currentPintu].jejakPintu.length-1];
  
    lastOriginList.forEach(element => {
       
        lastList.push(element);
       
    }); 
     pintu[nextKey].jejakPintu.push(lastList);
    const theSplit=nextKey.split("_"); 

    if(traceDone[theSplit[0]+"_"+theSplit[1]]==null){

        dafPintu.push(theSplit[0]+"_"+theSplit[1]);
    }
}
if(pintu[x+"_"+y].bawah==0){
    const nextKey=cariNextkey(x,y,3);  
    var lastList=pintu[nextKey].jejakPintu[pintu[nextKey].jejakPintu.length-1];
    var lastOriginList=pintu[currentPintu].jejakPintu[pintu[currentPintu].jejakPintu.length-1];
  
    lastOriginList.forEach(element => {
       
        lastList.push(element);
       
    }); 
    pintu[nextKey].jejakPintu.push(lastList);
    const theSplit=nextKey.split("_"); 

    if(traceDone[theSplit[0]+"_"+theSplit[1]]==null){

        dafPintu.push(theSplit[0]+"_"+theSplit[1]);
    }
}
if(pintu[x+"_"+y].kiri==0){
    const nextKey=cariNextkey(x,y,4);  
    var lastList=pintu[nextKey].jejakPintu[pintu[nextKey].jejakPintu.length-1];
    var lastOriginList=pintu[currentPintu].jejakPintu[pintu[currentPintu].jejakPintu.length-1];
  
    lastOriginList.forEach(element => {
       
        lastList.push(element);
       
    }); 
     pintu[nextKey].jejakPintu.push(lastList);
    const theSplit=nextKey.split("_"); 

    if(traceDone[theSplit[0]+"_"+theSplit[1]]==null){

        dafPintu.push(theSplit[0]+"_"+theSplit[1]);
    }
}
    }catch(err){

    }
    console.log("result getPintu : "+dafPintu);

    return dafPintu;
}

function drawTitik(x,y){
    const firstX=x*boxSpace;
    const halfSpace=boxSpace/2;
    const finalX=firstX-halfSpace;
    const firstY=y*boxSpace;
    const finalY=firstY-halfSpace;
    context.beginPath();
    context.lineWidth = 0.7;
    context.arc(finalX, finalY, 5, 0, 2 * Math.PI); 
    context.strokeStyle = 'yellow';
    context.stroke();
}

function drawPintu(x,y){
    const firstX=x*boxSpace;
    const halfSpace=boxSpace/2;
    const finalX=firstX-halfSpace;
    const firstY=y*boxSpace;
    const finalY=firstY-halfSpace;
    context.beginPath();
    context.lineWidth = 4;
    context.arc(finalX, finalY, 15, 0, 2 * Math.PI); 
    context.strokeStyle = 'red';
    context.stroke();
}

function cariLangkah(x,y){
    console.log("cariLangkah posisi "+x+","+y);
    var availableD=[]; 
    const bisaAtas=cariLanjut(x,y,1);
    if(bisaAtas){
        availableD.push(1);
    }
    const bisaKanan=cariLanjut(x,y,2);
    if(bisaKanan){
        availableD.push(2);
    }
    const bisaBawah=cariLanjut(x,y,3);
    if(bisaBawah){
        availableD.push(3);
    }
    const bisaKiri=cariLanjut(x,y,4);
    if(bisaKiri){
        availableD.push(4);
    }
    if(availableD.length>0){

        const getIdx=Math.floor(Math.random() * availableD.length);
        const nextKey=cariNextkey(x,y,availableD[getIdx]); 
        console.log("dapat nextKey "+nextKey);
        const theSplit=nextKey.split("_");
        // blokir[theSplit[0]+"_"+theSplit[1]]=true;
        bukaLanjut(x,y,availableD[getIdx]);
        const sisaKey=availableD.length-1;
        if(sisaKey>0){
            nextSearch.push(x+"_"+y);
        }
        if(sekali==true){
            // sekali=false;
            cariLangkah(theSplit[0],theSplit[1]);
        }
        // cariLangkah(1,1);
        // cariLangkah(2,1);
    }else{
        if(nextSearch.length>0){

            const nextKey=nextSearch[nextSearch.length-1]; 
            console.log("dapat nextKey "+nextKey);
            const theSplit=nextKey.split("_");
            nextSearch.pop();
            cariLangkah(theSplit[0],theSplit[1]);
        }
    }
}

function cariLanjut(x,y,d){
    console.log("Mencari posisi "+x+","+y+" ke "+d);
    const nextKey=cariNextkey(x,y,d); 

    console.log("nextKey "+nextKey);
    try {
        if(blokir[nextKey]!=null){
        
            throw("nextKey "+nextKey+" sudah pernah terblokir");
        }
        if(pintu[nextKey]==null){
    
        throw("nextKey "+nextKey+" tidak ditemukan");
        }
        if(pintu[nextKey].pernahBuka==1){
            throw("nextKey "+nextKey+" pernah dibuka");
        }
      }
      catch(err) {
        blokir[nextKey]=true;
       console.log(err);
       return false;
      } 
      console.log("nextKey "+nextKey+" tersedia");
  return true;
}

function cariNextkey(x,y,d){

    switch(d){
        case 1:
            var nextKey=x+"_"+(Number(y)-1);
            return nextKey;
            case 2:
                var nextKey=(Number(x)+1)+"_"+y;
                return nextKey;
                case 3:
                    var nextKey=x+"_"+(Number(y)+1);
                    return nextKey;
                    case 4:
                        var nextKey=(Number(x)-1)+"_"+y;
                        return nextKey;
    }
}
 
function bukaLanjut(x,y,d){
    const nextKey=cariNextkey(x,y,d);
    switch(d){
        case 1: 
            if(pintu[nextKey].pernahBuka==1){
                return;
            }
            pintu[nextKey].pernahBuka=1;
            pintu[x+"_"+y].atas=0;
            pintu[nextKey].bawah=0; 
            pintu[nextKey].ada=1; 
            blokir[nextKey]=true;
            break;
            case 2: 
                if(pintu[nextKey].pernahBuka==1){
                    return;
                }
                pintu[nextKey].pernahBuka=1;
                pintu[x+"_"+y].kanan=0;
                pintu[nextKey].kiri=0;  
                pintu[nextKey].ada=1;  
                blokir[nextKey]=true;
                break;
                case 3: 
                    if(pintu[nextKey].pernahBuka==1){
                        return;
                    }
                    pintu[nextKey].pernahBuka=1;
                    pintu[x+"_"+y].bawah=0;
                    pintu[nextKey].atas=0;   
                    pintu[nextKey].ada=1;   
                    blokir[nextKey]=true;
                    break;
                    case 4: 
                        if(pintu[nextKey].pernahBuka==1){
                            return;
                        }
                        pintu[nextKey].pernahBuka=1;
                        pintu[x+"_"+y].kiri=0;
                        pintu[nextKey].kanan=0;  
                        pintu[nextKey].ada=1;   
                        blokir[nextKey]=true;
                        break;
    }
}
 
function drawBox(x,y) {
    pintu[x+"_"+y].ada=1;

    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.shadowColor = 'black';
 
    if(pintu[x+"_"+y].kiri!=0){ 
    context.beginPath();
    context.moveTo((x-1)*boxSpace, (y-1)*boxSpace);
    context.lineTo((x-1)*boxSpace, y*boxSpace);
    context.stroke();
}
 

    if(pintu[x+"_"+y].kanan!=0){ 
        context.beginPath();
        context.moveTo((((x-1)*boxSpace)+boxSpace),(y-1)*boxSpace);
        context.lineTo((((x-1)*boxSpace)+boxSpace), y*boxSpace);
        context.stroke();
    }

    if(pintu[x+"_"+y].atas!=0){ 
    context.beginPath();
    context.moveTo((x-1)*boxSpace, (y-1)*boxSpace);
    context.lineTo((((x-1)*boxSpace)+boxSpace), (y-1)*boxSpace);
    context.stroke();
}

if(pintu[x+"_"+y].bawah!=0){ 
    context.beginPath();
    context.moveTo((x-1)*boxSpace, y*boxSpace);
    context.lineTo((((x-1)*boxSpace)+boxSpace), y*boxSpace);
    context.stroke();
}
  
}
  

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);