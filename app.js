class Hour
{

  constructor(hour, img = null)
  {
    this.hour = hour;
    this.img = img;
    this.next = null;
    this.prev = null;
  }
}

class HourWheel
{
  constructor()
  {
    this.start =  null;
    this.end = null;
    this.length = null;
    this.current = null;
  }

  append(hour, img){
    
    this.length++;

    let newHour = new Hour(hour, img);

    if(this.start === null) {
      this.start = this.end =  newHour;
      this.start.prev = this.start.next = this.start;
    }                                
    else{

      newHour.next = this.start;
      this.end.next = newHour;
      newHour.prev = this.end;
      this.end = newHour;
      this.start.prev = this.end;

    }
  }

  changeHour(node, callback)
  {

    let startTime = new Date();

    startTime.setHours( startTime.getUTCHours() + 3);

    startTime = startTime.getHours();

    console.log(startTime);
    
    let rez = null;

    if(startTime >= 20){
      let date = new Date();

      date.setHours( date.getHours() + 3);

       console.log(date.getHours());

      let sT = (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) * 1000;
      let eT = ((23 * 60 * 60 + 59 * 60 + 59) + ( 6 * 60 * 60)) * 1000;
      rez = eT - sT;

    } else{
        let date = new Date();
        let sT = (date.getHours()  * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) * 1000;
        let eT = node.next.hour * 60 * 60 * 1000;
       rez = eT - sT;
    }


    if(node.jpg !== null){

      callback(node);

    }

    console.log(node.hour)
    console.log(new Date(), " измнено.")

    const next = () => {
      this.changeHour(node.next, callback);
    }

    setTimeout( next, rez);

  };


  go(callback)
  {
    let startTime = new Date();

    startTime.setHours( startTime.getUTCHours() + 3);

    startTime = startTime.getHours();

    let node = this.start;

    for(let i = 0; i < this.length; i++){
          if(startTime >= 21 || startTime < 6){
            break;
          }
          if(startTime >= node.prev.hour && startTime < node.hour){

            break;
          }

          node = node.next;

    };

    node = node.prev;

    this.changeHour(node, callback);
  
  }

  print(){

    let str = "start -> ";

    let node = this.start;

    for(let i = 0; i < this.length; i++){
      str += node.hour + " -> ";
      node = node.next;
    };

    str += "end;"

    console.log(str);

  }
}

const easyvk = require('easyvk');
const fs = require('fs');

const token = "f4c13fc13a43e3d265960cc3674ab16dfcb95080334dea14614afbba96bd26417ef5512643fe1b6dc7b93";


let imagesPath = __dirname + "/Шапки/";

//let images = fs.readdirSync(imagesPath);

let hW = new HourWheel();

hW.append(6, imagesPath + "6.jpg");
hW.append(9, imagesPath + "9.jpg");
hW.append(12, imagesPath + "12.jpg");
hW.append(17, imagesPath + "17.jpg");
hW.append(21, imagesPath + "21.jpg");


function changeImg(vk)
{

  
  return  (node) => {

     vk.uploader.upload({
      getUrlMethod: "photos.getOwnerCoverPhotoUploadServer",
      getUrlParams: {
        group_id: 197317584,
        crop_x: 0,
        crop_y: 0,
        crop_x2: 1590,
        crop_y2: 400
      },
      saveMethod: "photos.saveOwnerCoverPhoto",
      saveParams: {
        group_id: 197317584
        },
        file: node.img
    });


  }

 

}
easyvk({
  token: token
}).then(async vk => {

  console.log(vk.session.group_id)

  let a = hW.go( changeImg(vk));



})