let params = new URLSearchParams(document.location.search);
let uid = params.get("uid");

function getRoundedCanvas(sourceCanvas) {
  //function to get rounded canvas using ✨math✨ 
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }

  $("#pp").change(function(){
    const dd = $("#pp").prop("files")[0]//image selected
    const url = URL.createObjectURL(dd)
    const img = new Image()
    img.src = url
    console.log(url)
    img.onload=()=>{
      const width = img.width
      const height = img.height
      
      if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage(JSON.stringify({type:"dimentions",width:width,height:height}))
      }else{
        
        window.parent.postMessage({type:"dimentions",width:width,height:height},"*")
      }
    }
    
    const reader = new FileReader()
    reader.readAsDataURL(dd) //get as base 64
    reader.onload = function(){
        const datad = reader.result;
    var image = document.getElementById('image');
    image.setAttribute("src",datad)
    $("#choose").hide()
    var result = document.getElementById('result');
    var croppable = false;
    var cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      ready: function () {
        croppable = true;
        cropper.zoomTo(0.8);
      },
    });
    window.addEventListener('message',(event)=>{
      const data = JSON.parse(event.data)
      if(data.requesting==="imageToBase64"){
      if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage(convertToBase64())
        
      
    }else{
      window.parent.postMessage(convertToBase64(),"*")
    }
  }})
    function convertToBase64() {
      if($("#pp").prop("files")[0]){
      var croppedCanvas;
      var roundedCanvas;
      var roundedImage;

      if (!croppable) {
        return;
      }

      // Crop
      croppedCanvas = cropper.getCroppedCanvas();

      // Round
      roundedCanvas = getRoundedCanvas(croppedCanvas);
      
      // Show
     roundedImage=roundedCanvas.toDataURL()
     return roundedImage
    
    }}};
  })
