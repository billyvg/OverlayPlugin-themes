// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */

var IMAGE_PATH = 'images';

var React = window.React;


    function Stance() {"use strict";
        this.$Stance_stance = {};
    }

    Object.defineProperty(Stance.prototype,"setStance",{writable:true,configurable:true,value:function(stance, timer) {"use strict";
        if (this.clearStanceId) {
            clearTimeout(this.clearStanceId);
        }

        this.$Stance_stance = {};
        this.$Stance_stance[stance] = true;

        this.clearStanceId = setTimeout(function() {
            this.$Stance_stance = {};
        }.bind(this), timer || 10000);
    }});

    Object.defineProperty(Stance.prototype,"inStance",{writable:true,configurable:true,value:function(stance) {"use strict";
        return !!this.$Stance_stance[stance];
    }});


var stances = new Stance();

var ____Classe=React.Component;for(var ____Classe____Key in ____Classe){if(____Classe.hasOwnProperty(____Classe____Key)){Texture[____Classe____Key]=____Classe[____Classe____Key];}}var ____SuperProtoOf____Classe=____Classe===null?null:____Classe.prototype;Texture.prototype=Object.create(____SuperProtoOf____Classe);Texture.prototype.constructor=Texture;Texture.__superConstructor__=____Classe;function Texture(){"use strict";if(____Classe!==null){____Classe.apply(this,arguments);}}
    Object.defineProperty(Texture.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        var visible = !this.props.visible ? ' hidden' : '';

        return (
            React.createElement("div", {className: ("texture " + this.props.position + visible)}, 
                React.createElement("img", {src: ("images/textures/" + this.props.name + ".png")})
            )
        );
    }});

Texture.defaultProps = {
    visible: false
};

var ____Classf=React.Component;for(var ____Classf____Key in ____Classf){if(____Classf.hasOwnProperty(____Classf____Key)){SpellTimer[____Classf____Key]=____Classf[____Classf____Key];}}var ____SuperProtoOf____Classf=____Classf===null?null:____Classf.prototype;SpellTimer.prototype=Object.create(____SuperProtoOf____Classf);SpellTimer.prototype.constructor=SpellTimer;SpellTimer.__superConstructor__=____Classf;function SpellTimer(){"use strict";if(____Classf!==null){____Classf.apply(this,arguments);}}
	Object.defineProperty(SpellTimer.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        // for now parse logs in here
        if (this.props.logInfo.logLine.indexOf('You move into Raptor Form') > -1) {
            stances.setStance('raptor');
        }
        else if (this.props.logInfo.logLine.indexOf('You move into Coeurl Form') > -1) {
            stances.setStance('coeurl');
        }
        else if (this.props.logInfo.logLine.indexOf('You move into Opo-opo Form') > -1) {
            stances.setStance('opo');
        }

        return (
            React.createElement("div", {className: "texture-container"}, 
                React.createElement(Texture, {position: "left", visible: stances.inStance('raptor'), name: "Aura65"}), 
                React.createElement(Texture, {position: "middle", visible: stances.inStance('coeurl'), name: "Aura66"}), 
                React.createElement(Texture, {position: "right", visible: stances.inStance('opo'), name: "Aura67"})
            )
        );
	}});

