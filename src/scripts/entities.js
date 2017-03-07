Zombies = Zombies || {};

Zombies.Entity = function(aGameState, aPosition, aProperties)
{
    "use strict";
    Phaser.Sprite.call(this, aGameState.game, aPosition.x, aPosition.y, aProperties.texture);
    this.gameState = aGameState;
    this.anchor.setTo(0.5);
};
Zombies.Entity.prototype = Object.create(Phaser.Sprite.prototype);
Zombies.Entity.prototype.constructor = Zombies.Entity;

Zombies.Zombie = function(aGameState, aPosition, aProperties)
{
    "use strict";
    Zombies.Entity.call(this, aGameState, aPosition, aProperties);
    
    this.gameState.game.physics.arcade.enable(this);
    this.walkSpeed = 50;
    this.proximityQuad = 40000;
    this.lastPosition = null;
    this.body.setSize(20,20, 6, 6);
    
    this.animations.add('walk', [1,2,3,4,5,6,7,8,9,10,11,12,13,12,11,10,9,8,7,6,5,4,3,2], 8, true);
    this.animations.play('walk');
};

Zombies.Zombie.prototype = Object.create(Phaser.Sprite.prototype);
Zombies.Zombie.prototype.constructor = Zombies.Zombie;

Zombies.Zombie.prototype.update = function()
{
    if (this.lastPosition == null)
    {
        this.lastPosition = { 'x' : this.x, 'y': this.y };
    }
    
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    var xDiff = this.gameState.player.x - this.x;
    var yDiff = this.gameState.player.y - this.y;
    var quadDiff = Math.pow(xDiff,2) + Math.pow(yDiff,2);
    
    if (quadDiff < this.proximityQuad)
    {
        var line = new Phaser.Line();
        line.start.set(this.x, this.y);
        line.end.set(this.gameState.player.x, this.gameState.player.y);

        var tiles = this.gameState.blockingLayer.getRayCastTiles(line, 4, true);
        if (tiles.length == 0)
        {
            this.lastPosition = { 'x' : this.gameState.player.x, 'y' : this.gameState.player.y };
        }
    }

    xDiff = this.lastPosition.x - this.x;
    yDiff = this.lastPosition.y - this.y;
    quadDiff = Math.pow(xDiff,2) + Math.pow(yDiff,2);

    if (quadDiff < 10)
    {
        var angle = this.gameState.game.rnd.angle() / 180 * Math.PI;
        var distance = this.walkSpeed + this.gameState.game.rnd.frac() * (this.walkSpeed * 5); 
        this.lastPosition = { 'x' : this.x + distance * Math.cos(angle), 'y' : this.y + distance * Math.sin(angle) };
    }
    
    var maxChange = 0.1;
    var walkAngle = Math.atan2(yDiff,xDiff);
    this.rotation = walkAngle;
    this.body.velocity.x = this.walkSpeed * Math.cos(walkAngle);
    this.body.velocity.y = this.walkSpeed * Math.sin(walkAngle);
};