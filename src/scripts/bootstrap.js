/* global Phaser */

var Zombies = Zombies || {};

Zombies.Bootstrap = function () {};

Zombies.Bootstrap.prototype =
{
    preload : function()
    {
        this.load.image('logo', 'assets/ship.png');
    },

    create : function()
    {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.state.start('Preload');
    }
};