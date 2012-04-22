var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    Map = require("/Map"),
    Person = require("/Person"),
    Planet = require("/Planet"),
    Crate  = require("/Crate"),
    IceCream  = require("/IceCream");

function StartScreen() {
    StartScreen.superclass.constructor.call(this)
    
}

StartScreen.inherit(Map, {

    setup: function(game) {
        this.game = game;
        StartScreen.superclass.constructor.call(this, game)
        // Get size of canvas
        var s = cocos.Director.sharedDirector.winSize
    
        var planet = new Planet();
        planet.position = new geom.Point(s.width/2, s.height/2);
        planet.createPhysics(game.world, {isStatic:true, shapeType:"circle"});
        game.planet = planet;
        game.addChild({child:planet});
        
        game.player.position = new geom.Point(s.width/2, s.height);
        game.player.createPhysics(game.world, {fixedRotation:true});
        game.addChild({child:game.player});
        /*
        for (var i=0; i < 1; ++i) {
            var crate = new Crate();
            crate.position = new geom.Point(s.width/4 + (crate.contentSize.width*(i+1)), 0);
            crate.createPhysics(game.world, {});
            game.addChild({child:crate});
        }
        */
        var self = this;
        var spawnIceCream = function() {
            var s = cocos.Director.sharedDirector.winSize
        
            var ice = new IceCream();
            ice.position = new geom.Point(s.width/2, 0);
            ice.rotation = 180;
            ice.createPhysics(game.world, {shapeType:"circle"});
            ice.map = "Icemap2";
            game.addChild({child:ice});
            
            var freeSign = new cocos.nodes.Sprite({
                file: "/gfx/freesign.png",
                rect: new geom.Rect(0,0, 213, 151)
            });
            freeSign.position = new geom.Point(s.width/2, s.height/2);
            freeSign.zOrder = -1;
            freeSign.rotation = 220;
            
            var moveAction = new cocos.actions.MoveTo({ 
                position: new geom.Point(s.width/2 - 128, s.height/2 - 128),
                duration: 2
            })
            
            var showCredits = function() {
                console.log("callback");
                var credits = new cocos.nodes.Sprite({
                    file: "/gfx/credits.png",
                    rect: new geom.Rect(0,0, 133, 45)
                });
                credits.anchorPoint = new geom.Point(1,1);
                credits.position = new geom.Point(s.width, 0);
                credits.zOrder = 10;
                
                var moveAction = new cocos.actions.MoveTo({ 
                    position: new geom.Point(s.width, 45),
                    duration: 2
                })
                
                credits.runAction(moveAction);
                game.addChild({child:credits});            
            }
            
            var seq = new cocos.actions.Sequence({ actions: [
                new cocos.actions.CallFunc({ target:self, method: "showCredits" }),
                moveAction
            ]});
            
            freeSign.runAction(moveAction);
            game.addChild({child:freeSign});
        }
        
        
        game.player.say([new TextLine({string: 'Hello', delay:3}),
                         new TextLine({string: 'I like icecream', delay:3, onEndedCallback:spawnIceCream})
        ]);
    },
    
    showCredits: function() {
        console.log("callback");
        var s = cocos.Director.sharedDirector.winSize
        var credits = new cocos.nodes.Sprite({
            file: "/gfx/credits.png",
            rect: new geom.Rect(0,0, 133, 45)
        });
        credits.anchorPoint = new geom.Point(1,1);
        credits.position = new geom.Point(s.width, 0);
        credits.zOrder = 10;
        
        var moveAction = new cocos.actions.MoveTo({ 
            position: new geom.Point(s.width, 45),
            duration: 2
        })
        
        credits.runAction(moveAction);
        this.gamegame.addChild({child:credits});            
    },
    
    update:function(dt) {
    },
});

module.exports = StartScreen;
