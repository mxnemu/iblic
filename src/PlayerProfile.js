var cocos = require("cocos2d");

function PlayerProfile() {
    PlayerProfile.superclass.constructor.call(this)
}

PlayerProfile.inherit(Object, {
    _name: "bob",
    _iceCream: 0,
    _deaths: 0,
    _gruesomeDeaths: 0,
    _portalsTaken: 0,
    _decisions: {},
    
    addIceCream: function() {
        this._iceCream++;
        this.store();
    },
    
    addDeath: function() {
        this._deaths++;
        this.store();
    },
    
    addGruesomeDeath: function() {
        this._gruesomeDeaths++;
        this.store();
    },

    addPortalsTaken: function() {
        this._portalsTaken++;
        this.store();
    },
    
    getDecision: function(key) {
        return this._decisions[key];
    },
    
    setDecision: function(key, value) {
        this._decisions[key] = value;
        this.store();
    },
    
    get name() {
        return this._name;
    },
    
    set name(value) {
        this._name = value;
    },

    store: function() {
        if (localStorage) {
            var data = { 
                "name": this.name,
                "iceCream": this._iceCream,
                "deaths": this._deaths,
                "gruesomeDeaths": this._gruesomeDeaths,
                "portalsTaken": this._portalsTaken,
                "decisions": this._decisions
            }
            
            localStorage.playerProfile = JSON.stringify(data);
            console.log(JSON.stringify(data))
        }
    },
    
    restore: function() {
        if (localStorage && localStorage.playerProfile) {
            var data = JSON.parse(localStorage.playerProfile);
            
            this.name = data["name"];
            this._iceCream = data["iceCream"];
            this._deaths = data["deaths"];
            this._gruesomeDeaths = data["gruesomeDeaths"];
            this._portalsTaken = data["portalsTaken"];
            this._decisions = data["decisions"];
        }
    },
    
})

module.exports = PlayerProfile;
