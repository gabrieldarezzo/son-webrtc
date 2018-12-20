//var Peer = require('peerjs');
//var $ = require("jquery");


(function() {
    var app = {
        peers: []
    }
    app.checkRTC = function(cb) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (!navigator.getUserMedia) {
            return cb({ err: 'RTC Failed ' }, false)
        }
        navigator.getUserMedia({ audio: true, video: true }, cb, function(err) {
            console.log('CheckRTC => ', err)
        })
    }
    app.onRecieveStream = function(stream, name) {
        var video = $('#' + name)[0]
        video.src = window.URL.createObjectURL(stream)
        window.peer_stream = stream
    }
    app.newPeer = function() {
        $("#id").text(app.peer.id)
    }
    app.login = function() {
        var peerID = $('#peer_id').val();
        if (peerID) {
            app.peers.push(peerID)
            con = app.peer.connect(peerID)
            // con.on('data')
        }
    }
    app.peerConnect = function(con) {
        app.peer.peer_id = con.peer;
        app.peer.con = con
        console.log('A new connection')
    }
    app.call = function() {
        var call  = app.peer.call(app.peer.peer_id, window.localStream)
        call.on('stream', function(stream) {
            window.peer_stream = stream
            app.onRecieveStream(stream, 'pattern')
        })
    }
    app.onReceiveCall = function(call) {
        call.answer(window.localStream)
        call.on('stream', function(stream) {
            window.peer_stream = stream
            app.onRecieveStream(stream, 'pattern')
        })
    }
    app.peerCall = function(call) {
        return app.onReceiveCall(call)
    }
    app.init = function() {

        
        /*
        // Local Settings peerjs-server\bin
        ///node peerjs --port 9000 --key peerjs
        const confPeers = {
            key : 'peerjs',
            host : 'localhost',
            port : 9000,
            path: '/',            
            debug : 3, // default 0
        };
        app.peer = new Peer(confPeers);
        */

        app.peer = new Peer({ key: 'sdj30v644pfd2t9', debug: 3 })


        app.peer.on('open', app.newPeer)
        app.peer.on('connection', app.peerConnect)
        app.peer.on('call', app.peerCall)
        app.checkRTC(function(stream) {
            window.localStream = stream
            app.onRecieveStream(stream, 'local')
        })
        $("#login").on('click', app.login)
        $("#call").on('click', app.call)
    }
    app.init()
})();