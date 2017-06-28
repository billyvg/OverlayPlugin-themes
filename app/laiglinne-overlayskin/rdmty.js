// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */
var language_kr = 1;
var languagepack = {
    "lastEncounter": ["마지막 전투", "Last Encounter", "最後の戦い"],
    "totalDamage": ["총 대미지", "Tot. Dmg", "総ダメージ"],
    "totalHeal": ["총 힐량", "Tot. Heal", "総ヒーリング"],
    "RDPS": ["RDPS", "RDPS", "合計DPS"],
    "RHPS": ["RHPS", "RHPS", "合計HPS"],
    "Dodge": ["미스", "Dodge", "回避"],
    "damagesTaken": ["받은 데미지 ", "Dmg Recv ", "被撃 "],
    "healsTaken": ["받은 힐 ", "Heal Recv ", "回復 "],
    "timeOfDeath": ["회 사망", " Death", "回 死亡"],
    "accNCrit": ["기타", "Acc/Crit", "衝/極"],
    "displayName": ["미터기 유저명 표시", "Display Player Name", "ユーザ名の表示"],
    "displayMe": ["내 이름 표시", "My Name", "本人名の表示"],
    "displayResize": ["크기조절 표시", "Resize Handle Display", "サイズ変更の表示"],
    "acc": ["명중", "Acc", "衝突"],
    "crit": ["극대", "Crit", "極大"],
    "me": ["나", "Me", "自分"],
    "DPS": ["딜량", "DPS", "DPS"],
    "HPS": ["힐량", "HPS", "HPS"],
    "DMG": ["피격", "Dmg", "被撃"],
    "Limitbreak": ["리미트 브레이크", "Limit Break", "リミット"]
};
var IMAGE_PATH = 'images/laiglinne-overlayskin';
var EncountersArray = [];
var React = window.React;
var formatNumber = function(number) {
    number = parseFloat(number, 10);

    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'K';
    }

    return number.toFixed(2);
};

function checkThousand(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;

    n += '';

    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');

    return n;
}

function getStrCuts(str) {
    ns = str.substr(0, str.length - 1);
    if (ns.length != str.length) {
        ns = ns + "";
    }
    return ns;
}

function returnSpanblock(string) {
    return "<span class=\"datablock\">" + string + "</span>";
}

var ____Class0 = React.Component;
for (var ____Class0____Key in ____Class0) {
    if (____Class0.hasOwnProperty(____Class0____Key)) {
        CombatantCompact[____Class0____Key] = ____Class0[____Class0____Key];
    }
}
var ____SuperProtoOf____Class0 = ____Class0 === null ? null : ____Class0.prototype;
CombatantCompact.prototype = Object.create(____SuperProtoOf____Class0);
CombatantCompact.prototype.constructor = CombatantCompact;
CombatantCompact.__superConstructor__ = ____Class0;

function CombatantCompact() {
    "use strict";
    if (____Class0 !== null) {
        ____Class0.apply(this, arguments);
    }
}
Object.defineProperty(CombatantCompact.prototype, "jobImage", {
    writable: true,
    configurable: true,
    value: function(job) {
        "use strict";
        if (window.JSFIDDLE) {
            return window.GLOW_ICONS[job.toLowerCase()];
        }

        return IMAGE_PATH + '/glow/' + job.toLowerCase() + '.png';
    }
});

Object.defineProperty(CombatantCompact.prototype, "render", {
    writable: true,
    configurable: true,
    value: function() {
        "use strict";
        //var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
        var width = Math.min(100, parseInt(this.props.total / this.props.max * 100, 10)) + '%';

        return (
            this.props.perSecond === '---' ? null :
            React.createElement("li", {
                    className: 'row ' + this.props.job.toLowerCase() + (this.props.isSelf ? ' self' : ''),
                    onClick: this.props.onClick
                },


                React.createElement("div", {
                    className: "bar" + (this.props.isSelf ? ' self' : ''),
                    style: {
                        width: width
                    }
                }),

                React.createElement("div", {
                    className: "bar-back",
                    style: {
                        width: getStrCuts(width) * this.props.additional1 + '%'
                    }
                }),

                React.createElement("div", {
                        className: "text-overlay"
                    },
                    React.createElement("div", {
                            className: "stats"
                        },
                        React.createElement("span", {
                                className: "total"
                            },
                            this.props.totalFormatted
                        ),
                        this.props.additional ?
                        React.createElement("span", {
                                className: "additional"
                            },
                            this.props.additional
                        ) : null
                    ),
                    React.createElement("div", {
                            className: "info"
                        },
                        React.createElement("span", {
                                className: "job-icon"
                            },
                            React.createElement("img", {
                                src: this.jobImage(this.props.job),
                                className: this.props.job
                            })
                        ),
                        React.createElement("span", {
                                className: "rank"
                            },
                            this.props.rank, "."
                        ),
                        React.createElement("span", {
                                className: "character-name"
                            },
                            this.props.characterName
                        ),
                        React.createElement("span", {
                                className: "character-job " + this.props.job
                            },
                            this.props.displayJobName
                        )
                    )
                )
            )
        );
    }
});

CombatantCompact.defaultProps = {
    onClick: function() {}
};

var ____Class1 = React.Component;
for (var ____Class1____Key in ____Class1) {
    if (____Class1.hasOwnProperty(____Class1____Key)) {
        ChartView[____Class1____Key] = ____Class1[____Class1____Key];
    }
}
var ____SuperProtoOf____Class1 = ____Class1 === null ? null : ____Class1.prototype;
ChartView.prototype = Object.create(____SuperProtoOf____Class1);
ChartView.prototype.constructor = ChartView;
ChartView.__superConstructor__ = ____Class1;

function ChartView() {
    "use strict";
    if (____Class1 !== null) {
        ____Class1.apply(this, arguments);
    }
}
Object.defineProperty(ChartView.prototype, "render", {
    writable: true,
    configurable: true,
    value: function() {
        "use strict";
        return (
            React.createElement("div", {
                className: "chart-view"
            })
        );
    }
});


var ____Class2 = React.Component;
for (var ____Class2____Key in ____Class2) {
    if (____Class2.hasOwnProperty(____Class2____Key)) {
        Header[____Class2____Key] = ____Class2[____Class2____Key];
    }
}
var ____SuperProtoOf____Class2 = ____Class2 === null ? null : ____Class2.prototype;
Header.prototype = Object.create(____SuperProtoOf____Class2);
Header.prototype.constructor = Header;
Header.__superConstructor__ = ____Class2;

function Header(props) {
    "use strict";
    ____Class2.call(this, props);
    this.state = {
        expanded: false,
        showEncountersList: false
    };
}

Object.defineProperty(Header.prototype, "shouldComponentUpdate", {
    writable: true,
    configurable: true,
    value: function(nextProps) {
        "use strict";
        if (nextProps.encounter.encdps === '---') {
            return false;
        }

        return true;
    }
});

Object.defineProperty(Header.prototype, "handleExtraDetails", {
    writable: true,
    configurable: true,
    value: function(e) {
        "use strict";
        this.props.onExtraDetailsClick(e);

        this.setState({
            expanded: !this.state.expanded
        });
    }
});

Object.defineProperty(Header.prototype, "handleEncounterClick", {
    writable: true,
    configurable: true,
    value: function(e) {
        "use strict";
        this.setState({
            showEncountersList: !this.state.showEncountersList
        });
    }
});

Object.defineProperty(Header.prototype, "render", {
    writable: true,
    configurable: true,
    value: function() {
        "use strict";
        var encounter = this.props.encounter;
        var rdps = parseFloat(encounter.encdps);
        var rdps_max = 0;

        if (!isNaN(rdps) && rdps !== Infinity) {
            rdps_max = Math.max(rdps_max, rdps);
        }

        return (
            React.createElement("div", {
                    className: ("header " + (this.state.expanded ? '' : 'collapsed'))
                },
                React.createElement("div", {
                        className: "encounter-header"
                    },
                    React.createElement("div", {
                            className: "encounter-data ff-header"
                        },
                        React.createElement("span", {
                                className: "duration"
                            },
                            "[", encounter.duration, "]"),
                        React.createElement("span", {
                                className: "target-name dropdown-parent",
                                onClick: this.handleEncounterClick.bind(this)
                            },
                            encounter.title + " (" + encounter.encdps.substr(0, encounter.encdps.indexOf(".")) + " DPS)",


                            React.createElement("div", {
                                    className: ("dropdown-menu encounters-list-dropdown " + (this.state.showEncountersList ? '' : 'hidden'))
                                },
                                React.createElement("div", {
                                        onClick: this.props.onSelectEncounter.bind(this, null)
                                    },
                                    languagepack.lastEncounter[language_kr]
                                ),

                                EncountersArray.map(function(encounter, i) {
                                    return (
                                        React.createElement("div", {
                                                key: i,
                                                onClick: this.props.onSelectEncounter.bind(this, i)
                                            },
                                            encounter.Encounter.title
                                        )
                                    );

                                }.bind(this))
                            )
                        ),
                        React.createElement("span", {
                            className: ("arrow " + (this.state.expanded ? 'up' : 'down')),
                            onClick: this.handleExtraDetails.bind(this)
                        })
                    ),

                    React.createElement("div", {
                            className: "chart-view-switcher",
                            onClick: this.props.onViewChange
                        },
                        this.props.currentView
                    )
                ),
                React.createElement("div", {
                        className: "extra-details"
                    },
                    React.createElement("div", {
                            className: "extra-row damage"
                        },
                        React.createElement("div", {
                            className: "detailTitle"
                        }, encounter.title),
                        React.createElement("div", {
                                className: "cell"
                            },
                            React.createElement("span", {
                                className: "label ff-header"
                            }, languagepack.totalDamage[language_kr] + " :"),
                            React.createElement("span", {
                                    className: "value ff-text"
                                },
                                checkThousand(encounter.damage)
                            )
                        ),
                        React.createElement("div", {
                                className: "cell"
                            },
                            React.createElement("span", {
                                className: "label ff-header"
                            }, languagepack.RDPS[language_kr] + " :"),
                            React.createElement("span", {
                                    className: "value ff-text"
                                },
                                checkThousand(encounter.encdps)
                            )
                        ),
                        React.createElement("div", {
                                className: "cell"
                            },
                            React.createElement("span", {
                                className: "label ff-header"
                            }, languagepack.Dodge[language_kr] + " :"),
                            React.createElement("span", {
                                    className: "value ff-text"
                                },
                                encounter['misses']
                            )
                        )
                    ),
                    React.createElement("div", {
                            className: "extra-row healing"
                        },
                        React.createElement("div", {
                                className: "cell"
                            },
                            React.createElement("span", {
                                className: "label ff-header"
                            }, languagepack.totalHeal[language_kr] + " :"),
                            React.createElement("span", {
                                    className: "value ff-text"
                                },
                                checkThousand(encounter.healed)
                            )
                        ),
                        React.createElement("div", {
                                className: "cell"
                            },
                            React.createElement("span", {
                                className: "label ff-header"
                            }, languagepack.RHPS[language_kr] + " :"),
                            React.createElement("span", {
                                    className: "value ff-text"
                                },
                                checkThousand(encounter.enchps)
                            )
                        )
                    )
                )
            )
        );
    }
});


Header.defaultProps = {
    encounter: {},
    onViewChange: function() {},
    onSelectEncounter: function() {},
    onExtraDetailsClick: function() {}
};


var ____Class3 = React.Component;
for (var ____Class3____Key in ____Class3) {
    if (____Class3.hasOwnProperty(____Class3____Key)) {
        Combatants[____Class3____Key] = ____Class3[____Class3____Key];
    }
}
var ____SuperProtoOf____Class3 = ____Class3 === null ? null : ____Class3.prototype;
Combatants.prototype = Object.create(____SuperProtoOf____Class3);
Combatants.prototype.constructor = Combatants;
Combatants.__superConstructor__ = ____Class3;

function Combatants() {
    "use strict";
    if (____Class3 !== null) {
        ____Class3.apply(this, arguments);
    }
}
Object.defineProperty(Combatants.prototype, "shouldComponentUpdate", {
    writable: true,
    configurable: true,
    value: function(nextProps) {
        "use strict";
        // if data is empty then don't re-render
        if (Object.getOwnPropertyNames(nextProps.data).length === 0) {
            return false;
        }

        return true;
    }
});

Object.defineProperty(Combatants.prototype, "render", {
    writable: true,
    configurable: true,
    value: function() {
        "use strict";
        var rows = [];
        var maxRows = 24;
        var isDataArray = _.isArray(this.props.data);
        var dataArray = isDataArray ? this.props.data : Object.keys(this.props.data);
        var limit = Math.max(dataArray.length, maxRows);
        var names = dataArray.slice(0, maxRows - 1);
        var maxdps = false;
        var combatant;
        var row;
        var isSelf;
        var rank = 1;
        var stats;
        var displayJob = "";

        for (var i = 0; i < names.length; i++) {
            combatant = isDataArray ? this.props.data[i] : this.props.data[names[i]];
            stats = null;

            if (language_kr == 1)
                displayJob = combatant.Job.toUpperCase();
              console.log(combatant.Job)
            if (combatant.Job == "Acn") {
                combatant.Job = '비술사';
            } else if (combatant.Job == "Arc") {
                combatant.Job = '궁술사';
            } else if (combatant.Job == "Blm") {
                combatant.Job = '흑마도사';
            } else if (combatant.Job == "Brd") {
                combatant.Job = '음유시인';
            } else if (combatant.Job == "Cnj") {
                combatant.Job = '환술사';
            } else if (combatant.Job == "Drg") {
                combatant.Job = '용기사';
            } else if (combatant.Job == "Gld") {
                combatant.Job = '검술사';
            } else if (combatant.Job == "Lnc") {
                combatant.Job = '창술사';
            } else if (combatant.Job == "Mnk") {
                combatant.Job = '몽크';
            } else if (combatant.Job == "Mrd") {
                combatant.Job = '도끼술사';
            } else if (combatant.Job == "Nin") {
                combatant.Job = '닌자';
            } else if (combatant.Job == "Pgl") {
                combatant.Job = '격투가';
            } else if (combatant.Job == "Pld") {
                combatant.Job = '나이트';
            } else if (combatant.Job == "Rog") {
                combatant.Job = '쌍검사';
            } else if (combatant.Job == "Smn") {
                combatant.Job = '소환사';
            } else if (combatant.Job == "Thm") {
                combatant.Job = '주술사';
            } else if (combatant.Job == "War") {
                combatant.Job = '전사';
            } else if (combatant.Job == "Whm") {
                combatant.Job = '백마도사';
            } else if (combatant.Job == "Sch") {
                combatant.Job = '학자';
            } else if (combatant.Job == "Drk") {
                combatant.Job = '암흑기사';
            } else if (combatant.Job == "Mch") {
                combatant.Job = '기공사';
            } else if (combatant.Job == "Ast") {
                combatant.Job = '점성술사';
            } else if (combatant.Job == "Sam") {
                combatant.Job = 'sam';
            } else if (combatant.Job == "Rdm"){
                combatant.Job = 'rdm';
            } else if (combatant.Job == "") {
                if (combatant.name.indexOf("가루다 에기") === 0) {
                    combatant.Job = "가루다";
                } else if (combatant.name.indexOf("이프리트 에기") === 0) {
                    combatant.Job = "이프리트";
                } else if (combatant.name.indexOf("타이탄 에기") === 0) {
                    combatant.Job = "타이탄";
                } else if (combatant.name.indexOf("요정 에오스") === 0) {
                    combatant.Job = "에오스";
                } else if (combatant.name.indexOf("요정 셀레네") === 0) {
                    combatant.Job = "셀레네";
                } else if (combatant.name.indexOf("카벙클 에메랄드") === 0) {
                    combatant.Job = "카벙클";
                } else if (combatant.name.indexOf("카벙클 토파즈") === 0) {
                    combatant.Job = "카벙클";
                } else if (combatant.name.indexOf("자동포탑 룩") === 0) {
                    combatant.Job = "포탑";
                } else if (combatant.name.indexOf("자동포탑 비숍") === 0) {
                    combatant.Job = "포탑";
                } else if (combatant.name.indexOf("Limit Break") === 0) {
                    combatant.Job = "리미트";
                    combatant.JobN = " "; //languagepack.Limitbreak[language_kr];
                } else if (combatant.name.match(/[^a-zA-Z()'\s]/)) {
                    combatant.Job = "초코보";
                } else {
                    combatant.Job = "";
                }
            }

            if (language_kr == 0)
                displayJob = combatant.Job;

            if (combatant.JobN == "" || combatant.JobN === undefined)
                combatant.JobN = displayJob;

            isSelf = combatant.name === 'YOU' || combatant.name === 'You' || combatant.name === $("#mynameval").val();
            if (isSelf) {
                if ($("input:checkbox[id='myname']").is(":checked")) {
                    combatant.name = $("#mynameval").val();
                }
            }

            var virtualname = combatant.name;

            if (!$("input:checkbox[id='showname']").is(":checked") && !isSelf) {
                virtualname = "";
            }

            if (combatant.JobN == " ")
                virtualname = languagepack.Limitbreak[language_kr];

            if (combatant.Job !== "") {
                // should probably fix this
                if (this.props.currentView === '2') {
                    if (parseInt(combatant.healed, 10) > 0) {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.healed);
                        }
                        stats = {
                            displayJobName: combatant.JobN,
                            job: combatant.Job || '',
                            characterName: virtualname,
                            total: combatant.healed,
                            totalFormatted: React.createElement("span", {
                                    className: "datas"
                                },
                                Math.round(combatant.enchps) + ' HPS',
                                React.createElement("span", {
                                        className: "hoverview"
                                    },
                                    '[' + combatant.healed + ' (' + combatant['healed%'] + ') ] Ov.H [' + combatant['OverHealPct'] + ']'
                                )
                            ),
                            //additional: '['+checkThousand(Math.round(combatant.healed*(1-getStrCuts(combatant['OverHealPct'])/100)))+']',
                            additional1: 1 - (getStrCuts(combatant['OverHealPct']) / 100),
                            crithit: languagepack.Dodge[language_kr] + ':' + combatant.cures + ', ',
                            percentage: combatant['healed%']
                        }
                    }
                } else if (this.props.currentView === '3') {
                    if (parseInt(combatant.damagetaken, 10) > 0) {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.damagetaken);
                        }
                        stats = {
                            displayJobName: combatant.JobN,
                            job: combatant.Job || '',
                            characterName: virtualname,
                            total: combatant.damagetaken,
                            totalFormatted: checkThousand(combatant.damagetaken) + ' (' + combatant.deaths + languagepack.timeOfDeath[language_kr] + ')',
                            perSecond: languagepack.healsTaken[language_kr] + checkThousand(combatant.healstaken),
                            percentage: combatant.deaths + languagepack.timeOfDeath[language_kr],
                            /*                          perSecond: combatant.ParryPct,
                                                        percentage: combatant.BlockPct */
                            additional1: 1,
                        }
                    }
                } else if (this.props.currentView === '1') {
                    if (!maxdps) {
                        maxdps = parseFloat(combatant.damage);
                    }
                    stats = {
                        displayJobName: combatant.JobN,
                        job: combatant.Job || '',
                        characterName: virtualname,
                        total: combatant.damage,
                        totalFormatted: React.createElement("span", {
                                className: "datas"
                            },
                            Math.round(combatant.encdps) + ' DPS',
                            React.createElement("span", {
                                    className: "hoverview"
                                },
                                '[' + checkThousand(combatant.damage) + ' (' + combatant['damage%'] + ') ]'
                            )
                        ),
                        //perSecond: Math.round(combatant.encdps)+' DPS',
                        additional1: 1,
                        percentage: combatant['damage%']

                    }
                } else if (this.props.currentView === '4') {
                    if (!maxdps) {
                        maxdps = combatant.damage;
                    }
                    stats = {
                        displayJobName: combatant.JobN,
                        job: combatant.Job || '',
                        characterName: virtualname,
                        total: combatant.damage,
                        additional: React.createElement("span", {
                                className: "datas"
                            },
                            React.createElement("span", {
                                    className: "datablock",
                                    style: {
                                        width: "23px"
                                    }
                                },
                                combatant.TOHIT
                            ),
                            React.createElement("span", {
                                    className: "datablock",
                                    style: {
                                        width: "23px"
                                    }
                                },
                                combatant["misses"]
                            ),
                            React.createElement("span", {
                                    className: "datablock",
                                    style: {
                                        width: "20px"
                                    }
                                },
                                combatant['crithit%'].replace("%", "")
                            )
                        ),
                        crithit: languagepack.crit[language_kr] + ' ' + combatant['crithit%'],
                        TOHIT: languagepack.acc[language_kr] + ' ' + combatant.TOHIT + '%',
                        additional1: 1
                    }
                }

                if (stats) {
                    rows.push(
                        React.createElement(CombatantCompact, React.__spread({
                                onClick: this.props.onClick,
                                encounterDamage: this.props.encounterDamage,
                                rank: rank,
                                data: combatant,
                                isSelf: isSelf,
                                key: combatant.name,
                                max: maxdps
                            },
                            stats))
                    );
                    rank++;
                }
            }

        }

        return (
            React.createElement("ul", {
                    className: "combatants"
                },
                rows
            )
        );
    }
});


Combatants.defaultProps = {
    onClick: function() {}
};

var ____Class4 = React.Component;
for (var ____Class4____Key in ____Class4) {
    if (____Class4.hasOwnProperty(____Class4____Key)) {
        DamageMeter[____Class4____Key] = ____Class4[____Class4____Key];
    }
}
var ____SuperProtoOf____Class4 = ____Class4 === null ? null : ____Class4.prototype;
DamageMeter.prototype = Object.create(____SuperProtoOf____Class4);
DamageMeter.prototype.constructor = DamageMeter;
DamageMeter.__superConstructor__ = ____Class4;

function DamageMeter(props) {
    "use strict";
    ____Class4.call(this, props);
    this.state = {
        currentViewIndex: 0
    };
}

Object.defineProperty(DamageMeter.prototype, "shouldComponentUpdate", {
    writable: true,
    configurable: true,
    value: function(nextProps, nextState) {
        "use strict";
        if (nextProps.parseData.Encounter.encdps === '---') {
            return false;
        }

        if (this.state.currentViewIndex !== nextState.currentViewIndex) {
            return true;
        }

        if (this.state.selectedEncounter) {
            return false;
        }

        return true;
    }
});

Object.defineProperty(DamageMeter.prototype, "componentWillReceiveProps", {
    writable: true,
    configurable: true,
    value: function(nextProps) {
        "use strict";
        // save this encounter data
        if (this.props.parseData.Encounter.title === 'Encounter' &&
            nextProps.parseData.Encounter.title !== 'Encounter') {
            EncountersArray.unshift({
                Encounter: nextProps.parseData.Encounter,
                Combatant: nextProps.parseData.Combatant
            });

            // Only keep the last 10 fights
            if (EncountersArray.length > 10) {
                EncountersArray.pop();
            }
        }
    }
});

Object.defineProperty(DamageMeter.prototype, "handleCombatRowClick", {
    writable: true,
    configurable: true,
    value: function(e) {
        "use strict";
    }
});

Object.defineProperty(DamageMeter.prototype, "handleClick", {
    writable: true,
    configurable: true,
    value: function(e) {
        "use strict";
    }
});

Object.defineProperty(DamageMeter.prototype, "handleViewChange", {
    writable: true,
    configurable: true,
    value: function(e) {
        "use strict";
        var index = this.state.currentViewIndex;

        if (index > this.props.chartViews.length - 2) {
            index = 0;
        } else {
            index++;
        }

        this.setState({
            currentViewIndex: index
        });
    }
});

Object.defineProperty(DamageMeter.prototype, "handleSelectEncounter", {
    writable: true,
    configurable: true,
    value: function(index, e) {
        "use strict";
        if (index >= 0) {
            this.setState({
                selectedEncounter: EncountersArray[index]
            });
        } else {
            this.setState({
                selectedEncounter: null
            });
        }

        console.log('handle select', index);
        this.render();
    }
});

Object.defineProperty(DamageMeter.prototype, "render", {
    writable: true,
    configurable: true,
    value: function() {
        "use strict";
        var data = this.props.parseData.Combatant;
        var encounterData = this.props.parseData.Encounter;

        if (this.state.selectedEncounter) {
            data = this.state.selectedEncounter.Combatant;
            encounterData = this.state.selectedEncounter.Encounter;
        } else {
            // Healing
            // need to resort data if currentView is not damage
            if (this.state.currentViewIndex === 1) {
                data = _.sortBy(_.filter(data, function(d) {
                    return parseInt(d.healed, 10) > 0;
                }), function(d) {
                    if (this.state.currentViewIndex === 1) {
                        return -parseInt(d.healed, 10);
                    }
                }.bind(this));
            }
            // Tanking
            else if (this.state.currentViewIndex === 2) {
                data = _.sortBy(_.filter(data, function(d) {
                    return parseInt(d.damagetaken, 10) > 0;
                }), function(d) {
                    if (this.state.currentViewIndex === 2) {
                        return -parseInt(d.damagetaken, 10);
                    }
                }.bind(this));
            } else if (this.state.currentViewIndex === 4) {
                data = _.sortBy(_.filter(data, function(d) {
                    return parseInt(Math.abs(d.damagetaken - d.healstaken), 10) > 0;
                }), function(d) {
                    if (this.state.currentViewIndex === 4) {
                        return -parseInt(d.damagetaken - d.healstaken, 10);
                    }
                }.bind(this));
            } else if (this.state.currentViewIndex === 3) {
                data = _.sortBy(_.filter(data, function(d) {
                    return parseInt(d.damage, 10) > 0;
                }), function(d) {
                    if (this.state.currentViewIndex === 5) {
                        return -parseInt(d.damage, 10);
                    }
                }.bind(this));
            }
        }
        return (
            React.createElement("div", {
                    onClick: this.handleClick,
                    className: 'damage-meter' + (!this.props.parseData.isActive ? ' inactive' : '') + (!this.props.noJobColors ? ' show-job-colors' : '')
                },
                React.createElement(Header, {
                    encounter: encounterData,
                    onViewChange: this.handleViewChange.bind(this),
                    onSelectEncounter: this.handleSelectEncounter.bind(this),
                    currentView: this.props.chartViews[this.state.currentViewIndex]
                }),
                React.createElement(Combatants, {
                    currentView: this.props.chartViews[this.state.currentViewIndex],
                    onClick: this.handleCombatRowClick,
                    data: data,
                    encounterDamage: encounterData.damage
                })
            )
        );
    }
});

DamageMeter.defaultProps = {
    chartViews: [
        '1',
        '2',
        '3',
        '4'
    ],
    parseData: {},
    noJobColors: false
};
