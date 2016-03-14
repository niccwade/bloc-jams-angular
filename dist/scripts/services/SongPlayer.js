(function(){
    function SongPlayer(Fixtures){
        var SongPlayer = {};
        
        /**
        * @desc private-- currentAlbum playing
        * @type {object} of album info and songs
        **/
        var currentAlbum = Fixtures.getAlbumInfo();
        
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
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function getSongIndex--private method
        * @desc get the index of the currently playing song in album
        * @param {Object} song
        * @return {int} index of the currenly playing song
        **/
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc current song playing through player
        * @type {Object}
        **/
        SongPlayer.currentSong = null;
        
        /**
        * @function SongPlayer.play--public method on SongPlayer
        * @desc sets and plays song if song clicked is not playing
        * if current song playing is clicked and is paused, play current song
        * @param {Object} song
        **/
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                SongPlayer.currentSong = song;
                setSong(song);
                playSong(song);
                } else if(SongPlayer.currentSong === song){
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        * @function SongPlayer.previous--public method on SongPlayer
        * @desc get the current song playing's index and play the previous song in the album when this function is called
        *If the current song is less than zero, meaning that was the first song in the album, stop playing
        **/
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();