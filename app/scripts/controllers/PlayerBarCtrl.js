(function(){
    function PlayerBarCtrl(Fixtures, SongPlayer){
        this.albumInfo = Fixtures.getAlbumInfo();
        this.songPlayer = SongPlayer;
    }
    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
    
})();