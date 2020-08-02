const textInput = document.getElementById('text')
const textConetntBlock = document.getElementById('textblock');
textConetntBlock.style.fontSize  = "20pt";

const opacity = document.getElementById('opacity');


let bgImgFlag = 0;

const blackscreen = document.getElementById('blackscreen')

textInput.addEventListener('input', (e) => {
  

    const str =  e.target.value.replace(/\r\n|\r|\n/g,"<br>");

    
    textConetntBlock.innerHTML = str;

})


const autInput = document.getElementById('aut');
const refInput = document.getElementById('ref');
const inform = document.getElementById('inform')

const refContentBlock = document.getElementById('reftext')

function changeRef()
{

    const aV = autInput.value;

    const rV = refInput.value;

    if(aV !== "" || rV !== "")
        inform.style.display = "flex"
    else inform.style.display = "none"

    const rTag = rV ? " «" + rV + "». " : "";
   

    refContentBlock.innerHTML = "<span  >" + "<span id = 'refspan'>Источник:   </span> <span style = 'word-break: break-word;'>" + rTag + aV + "</span></span>";

}

autInput.addEventListener('input', changeRef);

refInput.addEventListener('input', changeRef);

const textSize = document.getElementById('textSize');

textSize.addEventListener('input', (e) => {
    const val = parseInt(e.target.value) + "pt";
    console.log(val)
    textConetntBlock.style.fontSize =  val;
    document.getElementById('refspan').style.fontSize = val;
    refContentBlock.style.fontSize = val;
})

const closeopen = document.getElementById('closeopen');
let flag = 1;
const toolswrap = document.getElementById('toolswrap');

closeopen.addEventListener('click', function()
{

    console.log(1)
    if(flag){
        toolswrap.style.maxWidth = "0px";
        flag = 0;
    }
    else{
        toolswrap.style.maxWidth = "500px";
        flag = 1
    }

})

const changesize = document.getElementById('changesize');

const rez = document.getElementById('rez');







changesize.addEventListener('mousedown',(e) => {

    let startX = e.clientX;
   
    
    startWidth =   rez.style.width === "" || rez.style.width === "auto" ? (rez.clientWidth - 120) : rez.style.width;

    function changeSize(e)
    {

        //e.preventDefault();

        let x = e.clientX;

       

        rez.style.width = ( parseInt(startWidth)  + startX - x) + 'px';

    }
    

    function removeList(){

    
    
        document.removeEventListener('mousemove', changeSize);
        document.removeEventListener('mouseup', removeList);
    }

    document.addEventListener('mousemove', changeSize );
    document.addEventListener('mouseup', removeList);

});

const auto = document.getElementById('auto');

auto.addEventListener('click', () => {
    rez.style.width = "auto";

    rez.style.backgroundPosition = "50% 50%"
});

document.getElementById('imgcenter').addEventListener('click', () => {

    rez.style.backgroundPosition = "50% 50%"

})

const savebut = document.getElementById('save');

savebut.addEventListener('click', () => {
    domtoimage.toPng(rez)
    .then(function (dataUrl) {
        let link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });


});

document.getElementById('imgcenterX').addEventListener('click', () => {
    rez.style.backgroundPositionX = "50%";
  
})

document.getElementById('imgcenterY').addEventListener('click', () => {
    rez.style.backgroundPositionY = "50%";
  
});

document.getElementById('deleteimg').addEventListener('click', () => {

    rez.style.backgroundImage = "none";

    bgImgFlag = 0;

    blackscreen.style.background = "rgba(0, 0, 0, " +  (opacity.value/100).toFixed(2) + ")";

})
rez.addEventListener('mousedown', (e) => {

    if(!bgImgFlag) return;

    

    blackscreen.style.opacity = "0";

    const startTop = e.clientY;
    const startLeft = e.clientX;

    const styles = getComputedStyle(rez);
    
    const bgPY = parseInt(  rez.style.backgroundPositionY !== "50%" ?   rez.style.backgroundPositionY : 0 );
    const bgPX = parseInt(  rez.style.backgroundPositionX !== "50%" ? rez.style.backgroundPositionX : 0);

    console.log(bgPY, bgPX, rez.style.backgroundPositionY, rez.style.backgroundPositionX )

    function changeCords(e)
    {
        let top = bgPY +  e.clientY - startTop;
        let left = bgPX + e.clientX - startLeft;
       
        rez.style.backgroundPositionY =  top + "px";
        rez.style.backgroundPositionX =  left + "px";
        

    }
    

    function removeList(){

        blackscreen.style.opacity = "1";

        document.removeEventListener('mousemove', changeCords);
        document.removeEventListener('mouseup', removeList);
    }

    document.addEventListener('mousemove', changeCords );
    document.addEventListener('mouseup', removeList);


})

const img = document.getElementById('img');

img.addEventListener('click', () =>{ 

    //img.innerHTML = "Загрузка..."

    let input = document.createElement('input');

    input.type = 'file';

    input.addEventListener('change',  () => {


            var url = URL.createObjectURL(input.files[0]);

            rez.style.backgroundPosition = "50% 50%"
    
            rez.style.backgroundImage= "url(" + url + ")";

            bgImgFlag = 1;

            blackscreen.style.background = "rgba(0, 0, 0, " +  (opacity.value/100).toFixed(2) + ")";



            /*let reader = new FileReader();
            const image = document.createElement('img');

            image.style.position = "absolute";
            image.style.zIndex = "0";
            image.style.width = "100%" 
        

            image.addEventListener('load', () => {

                img.innerHTML = "Изображение";

                

                //rez.appendChild(image);

                console.lof('done')
                

            })

            reader.addEventListener('load', (e) => {

                image.src = e.target.result;

            })


            reader.readAsDataURL(input.files[0]); */

    });


    input.click();

})


opacity.addEventListener('input', () => {
    blackscreen.style.background = "rgba(0, 0, 0, " +  (opacity.value/100).toFixed(2) + ")";
})