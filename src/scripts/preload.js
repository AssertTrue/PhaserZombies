/* global Phaser */
var Zombies = Zombies || {}

Zombies.Preload = function(){};

Zombies.Preload.prototype = 
{
    preload : function()
    {
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);
        
        this.load.spritesheet('player','assets/player_32_32_7.png', 32, 32, 7);
        this.load.spritesheet('zombie','assets/zombie_32_32_14.png', 32, 32, 14);
        this.load.spritesheet('door','assets/door_16_32_2.png', 32, 32, 14);
        this.load.tilemap('level1', 'assets/house.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/tiles.png');
    },
    
    create : function()
    {
        this.game.state.start('Game');
    }
};