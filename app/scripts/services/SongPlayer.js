(function(){
    function SongPlayer($rootScope, Fixtures){
        var SongPlayer = {};
        
        /**
        * @desc public-- currentAlbum playing
        * @type {object} of album info and songs
        **/
        SongPlayer.currentAlbum = Fixtures.getAlbumInfo();
        
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
               stopSong(song);
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
            return SongPlayer.currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @function stopSong--private
        * @desc when stopping song, stop playing audio file and record that no current song is playing
        
        **/
        var stopSong = function(song){
                currentBuzzObject.stop();
                song.playing = null;
        };
        
        /**
        * @desc current song playing through player
        * @type {Object}
        **/
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        **/
        SongPlayer.currentTime = null;
        
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
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
                /**
        * @function SongPlayer.next--public method on SongPlayer
        * @desc get the current song playing's index and play the next song in the album when this function is called
        *If the current song is at the end of the album, play the first song in the same album
        **/
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex > SongPlayer.currentAlbum.songs.length - 1){
                var song = SongPlayer.currentAlbum.songs[0];
            }else{
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
            }
                setSong(song);
                playSong(song);
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        **/
        SongPlayer.setCurrentTime = function(time){
            if(currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();