(function(){
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumInfo = Fixtures.getAlbumInfo();
        this.songPlayer = SongPlayer;
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();