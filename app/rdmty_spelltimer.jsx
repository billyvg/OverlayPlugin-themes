// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */

var IMAGE_PATH = 'images';

var React = window.React;

class Stance {
    constructor() {
        this._stance = {};
    }

    setStance(stance, timer) {
        if (this.clearStanceId) {
            clearTimeout(this.clearStanceId);
        }

        this._stance = {};
        this._stance[stance] = true;

        this.clearStanceId = setTimeout(function() {
            this._stance = {};
        }.bind(this), timer || 10000);
    }

    inStance(stance) {
        return !!this._stance[stance];
    }
}

var stances = new Stance();

class Texture extends React.Component {
    render() {
        var visible = !this.props.visible ? ' hidden' : '';

        return (
            <div className={`texture ${this.props.position}${visible}`}>
                <img src={`images/textures/${this.props.name}.png`}/>
            </div>
        );
    }
}
Texture.defaultProps = {
    visible: false
};

class SpellTimer extends React.Component {
	render() {
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
            <div className="texture-container">
                <Texture position="left" visible={stances.inStance('raptor')} name="Aura65" />
                <Texture position="middle" visible={stances.inStance('coeurl')} name="Aura66" />
                <Texture position="right" visible={stances.inStance('opo')} name="Aura67" />
            </div>
        );
	}
}
