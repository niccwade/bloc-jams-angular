(function(){
    function AlbumCtrl() {
        this.albumData = [
             { name: 'Blue', length: 161.71, audioUrl: '/assets/music/blue' },
             { name: 'Green', length: 103.96, audioUrl: '/assets/music/green' },
             { name: 'Red', length: 268.45, audioUrl: '/assets/music/red' },
             { name: 'Pink', length: 153.14, audioUrl: '/assets/music/pink' },
             { name: 'Magenta', length: 374.22, audioUrl: '/assets/music/magenta' }
            ];
            this.albumInfo = [
            { name: 'The Colors', 
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '/assets/images/album_covers/01.png'}
        ];
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();