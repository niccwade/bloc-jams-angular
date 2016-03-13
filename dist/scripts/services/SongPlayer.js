(function(){
    function SongPlayer(){
        var SongPlayer = {};
        
        /**
        * @desc current song playing through player
        * @type {Object}
        **/
        var currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        **/
        var currentBuzzObject = null;
        
        /**
        * @function playSong--private method
        * @desc plays song in currentBuzzObject and sets song.playing to true
        * @param {Object} song
        **/
        var playSong = function(song){
           currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function setSong--private method
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        **/
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            currentSong = song;
        };
        
        /**
        * @function SongPlayer.play--public method on SongPlayer
        * @desc sets and plays song if song clicked is not playing
        * if current song playing is clicked and is paused, play current song
        * @param {Object} song
        **/
        SongPlayer.play = function(song){
            if(currentSong !== song){
                currentSong = song;
                setSong(song);
                playSong(song);
                } else if(currentSong === song){
                    if(currentBuzzObject.isPaused()){
                            playSong(song);
                    }
                }                 
        };
        
        /**
        * @function SongPlayer.pause--public method on SongPlayer
        * @desc pauses currently playing song and sets currently playing song to false
        * @param {Object} song
        **/
        SongPlayer.pause = function(song){
           currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();