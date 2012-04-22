var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    UseTrigger = require("/UseTrigger");

function MapPortal() {
    MapPortal.superclass.constructor.call(this)
}

MapPortal.inherit(UseTrigger, {
    isUseTrigger: true,
    map: null,
    
    trigger:function(person) {
        person.game.loadMapByName(this.map);
        person.useTrigger = null;
    },
});

module.exports = MapPortal;
