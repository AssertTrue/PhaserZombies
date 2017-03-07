/* global Phaser */
var Zombies = Zombies || {};

Zombies.PhaserGame = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, '');

Zombies.PhaserGame.state.add('Bootstrap', Zombies.Bootstrap);
Zombies.PhaserGame.state.add('Preload', Zombies.Preload);
Zombies.PhaserGame.state.add('Game', Zombies.Game);

Zombies.PhaserGame.state.start('Bootstrap');