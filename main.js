navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.ogGetUserMedia;

if(!navigator.getUserMedia) {
    console.error('navigator.getUserMedia not Support in your Browser...');
}


const trackPermissions = {
    video : true,
    // video : true,
};

var video = document.getElementById("localStreamer");

//navigator.getUserMedia(trackPermissions ,handleStream, handleErrorStream)

navigator.mediaDevices
    .getUserMedia(trackPermissions)
    .then(handleStream)
    .catch(handleErrorStream);


function handleStream (stream) {
    var track = stream.getVideoTracks();

    console.log(track)
    video.srcObject = stream;
}

function handleErrorStream (err) {

    
    if(err.name == 'ConstraintNotSatisfiedError') {
        console.log('invalid Options');    
    }

    if(err.name == 'PermissionDinedError' || err.name == 'NotAllowedError') {
        console.log('Permissio Dinied');    
    }


}



//console.log(navigator.getUserMedia)