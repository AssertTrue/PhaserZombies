/* global Phaser */
var Zombies = Zombies || {};

Zombies.Game = function () {};

Zombies.Game.prototype = 
{
    preload : function()
    {
    },

    create : function()
    {
        this.map = this.game.add.tilemap('level1');
        this.map.addTilesetImage('Blarg', 'gameTiles');
        
        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockingLayer = this.map.createLayer('blockingLayer');
        //this.blockingLayer.debug = true;
        this.map.setCollisionBetween(1, 1000, true,'blockingLayer');
        this.backgroundlayer.resizeWorld();

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('run', [1,2,3,4,5,6], 10, true);
        
        this.game.physics.arcade.enable(this.player);
        this.player.body.setSize(20,20, 6, 6);
        this.game.camera.follow(this.player);
        
        this.zombies = this.game.add.group();
        this.zombies.physicsBodyType = Phaser.Physics.ARCADE;
        this.zombies.enableBody = true;
        
        for (var zombieIndex=0; zombieIndex < 20; ++zombieIndex)
        {
            var zombie = new Zombies.Zombie(this,
                                            { 'x' : this.game.rnd.integerInRange(0, this.game.world.width),
                                              'y' : this.game.rnd.integerInRange(0, this.game.world.height) },
                                            { 'texture' : 'zombie' });
            this.zombies.add(zombie);
        }
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    
    update : function()
    {
        this.game.physics.arcade.collide(this.player, this.blockingLayer);
        this.game.physics.arcade.collide(this.zombies, this.blockingLayer);
        this.game.physics.arcade.collide(this.zombies);
        this.game.physics.arcade.overlap(this.player, this.zombies, function(aSprite, aZombies)
        {
            this.game.state.start('Game');
        }, null, this);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        var speed = 400;
        
        var play = true;
        if (this.cursors.up.isDown && this.cursors.left.isDown)
        {
            this.player.body.velocity.x -= 0.707 * speed;
            this.player.body.velocity.y -= 0.707 * speed;
            this.player.rotation = Math.PI * -0.75;
        }
        else if (this.cursors.up.isDown && this.cursors.right.isDown)
        {
            this.player.body.velocity.x += 0.707 * speed;
            this.player.body.velocity.y -= 0.707 * speed;
            this.player.rotation = Math.PI * -0.25;
        }
        else if (this.cursors.down.isDown && this.cursors.left.isDown)
        {
            this.player.body.velocity.x -= 0.707 * speed;
            this.player.body.velocity.y += 0.707 * speed;
            this.player.rotation = Math.PI * +0.75;
        }
        else if (this.cursors.down.isDown && this.cursors.right.isDown)
        {
            this.player.body.velocity.x += 0.707 * speed;
            this.player.body.velocity.y += 0.707 * speed;
            this.player.rotation = Math.PI * +0.25;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.body.velocity.y -= speed;
            this.player.rotation = Math.PI * -0.5;
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.velocity.y += speed;
            this.player.rotation = Math.PI * +0.5;
        }
        else if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x -= speed;
            this.player.rotation = Math.PI;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x += speed;
            this.player.rotation = 0;
        }
        else
        {
            play = false;
        }
        
        if (play && this.player.animations.currentAnum == null)
        {
            this.player.animations.play('run')
        }
        else if (!play && this.player.animations.currentAnim != null)
        {
            this.player.animations.stop();
            this.player.frame = 0;
        }
    }
    
};