var showFullName,
    maxCombatantsShown,
    showDpsBar,

    encounterDefine,
    useHTMLEncounterDefine,

    headerDefine,
    bodyDefine,
    viewModes,
    vMode = "damage",
    data;

    function setMode(mode) {
        vMode = mode;
        update(data);
    }

        // 順位を表示する（text に関数を指定する例）
        // 引数:
        //  combatant : キャラクターのデータ。combatant["..."]でデータを取得できる。
        //  index : キャラクターの並び順。一番上は 0 で、その後は 1 ずつ増える。
        // 戻り値:
        //  表示するテキスト。
        //  ACT のタグは展開されないので、展開したい場合は parseActFormat 関数を使用してください。
        function rankingText(combatant, index) {
            // 1 から始まる番号を返す
            return (index + 1).toString();
        }

        //
        // 以下表示用スクリプト
        //

        // onOverlayDataUpdate イベントを購読
        document.addEventListener("onOverlayDataUpdate", function (e) {
            update(e.detail);
            data = e.detail;
        });

        // 表示要素の更新
        function update(data) {
            updateEncounter(data);
            if ( dpsMeterHeader.childNodes.length === 0 ) {
                updateCombatantListHeader();
            }
            updateCombatantList(data);
        }

        // エンカウント情報を更新する
        function updateEncounter(data) {
            // 要素取得
            // テキスト取得
            var elementText,
                encounterData = viewModes[vMode].encounter;
            if (typeof encounterData === 'function') {
                elementText = encounterData(data.Encounter);
            } else if (typeof encounterData === 'string') {
                elementText = parseActFormat(encounterData, data.Encounter);
            } else {
                console.log("updateEncounter: Could not update the encounter element due to invalid type.");
                return;
            }

            // テキスト設定
            if ( !useHTMLEncounterDefine ) {
                encounter.innerText = parseActFormat(encounterData, data.Encounter);
            } else {
                encounter.innerHTML = parseActFormat(encounterData, data.Encounter);
            }
        }

        // ヘッダを更新する
        function updateCombatantListHeader() {
            for (var i = 0; i < headerDefine.length; i++) {
                var cell = document.createElement("div");
                dpsMeterHeader.appendChild(cell);
                cell.className = "cell";
                // テキスト設定
                if (typeof headerDefine[i].text !== 'undefined') {
                    cell.textContent = headerDefine[i].text;
                } else if (typeof headerDefine[i].html !== 'undefined') {
                    cell.innerHTML = headerDefine[i].html;
                }
                if ( typeof(headerDefine[i].class) !== 'undefined' ) {
                    cell.className += ' ' + headerDefine[i].class;
                }
                // 幅設定
                cell.style.width = headerDefine[i].width;
                cell.style.maxWidth = headerDefine[i].width;
                // 横結合数設定
                if (typeof headerDefine[i].span !== 'undefined') {
                    cell.colSpan = headerDefine[i].span;
                }
                // 行揃え設定
                if (typeof headerDefine[i].align !== 'undefined') {
                    cell.style["textAlign"] = headerDefine[i].align;
                }
            }
            dpsMeter.style.display = 'block';
        }


        // プレイヤーリストを更新する
        function updateCombatantList(data) {
            // 要素取得＆作成
            var newBody = document.createElement("div");
            newBody.id = "dpsMeterBody";
            newBody.className = "dpsMeterBody";

            // tbody の内容を作成
            var combatantIndex = 0,
                barRef = 0,
                kMode;

            if ( vMode === "healing" ) kMode = "healed";
            else if ( vMode === "tanking" ) kMode = "damagetaken";
            else kMode = "damage";

            var CbtSorted = Object.keys(data.Combatant).sort(function(a, b) {
                    if ( +data.Combatant[a][kMode] < +data.Combatant[b][kMode] ) return 1;
                    if ( +data.Combatant[a][kMode] > +data.Combatant[b][kMode] ) return -1;
                    if ( a > b ) return 1;
                    if ( a < b ) return -1;
                    return 0;
                });

            if ( !CbtSorted.length ) return;

            barRef = +data.Combatant[CbtSorted[0]][kMode];

            for ( var c = 0; c < CbtSorted.length; c++ ) {
                var combatantName = CbtSorted[c];
                var combatant = data.Combatant[combatantName],
                    body = viewModes[vMode].body,
                    row = document.createElement('div');

                newBody.appendChild(row);
                row.className = 'row ' + (combatant.Job !== '' ? combatant.Job.toLowerCase() : 'jobless') + (combatantName === "YOU" ? " you" : "");

                for ( var i = 0; i <= body.length; i++ ) {
                    var cell = document.createElement('div');
                    row.appendChild(cell);
                    cell.className = 'cell';

                    if ( i === body.length ) {
                        if ( !showDpsBar ) continue;
                        var bar = document.createElement("div");
                        cell.appendChild(bar);
                        cell.className = "bar-container";
                        var width = Math.round(combatant[kMode] * 1 / barRef * 100 * 10) / 10;
                        if ( width ) {
                            bar.style.width = width + "%";
                            bar.className += "bar";
                        } else {
                            bar.className += "hide";
                        }
                        break;
                    }

                    var type = typeof body[i].text !== 'undefined' ? 'text' : 'html';

                    // テキスト設定
                    if ( typeof body[i][type] !== 'undefined' ) {
                        var content;
                        if ( typeof body[i][type] === 'function' ) {
                            content = body[i][type](combatant, combatantIndex);
                        } else {
                            content = parseActFormat(body[i][type], combatant);
                        }
                        if ( body[i].autohide && ((typeof content === "string" && content[0] === "0") || content === 0) ) {
                            cell.style.display = "none";
                        } else if ( type === 'text' ) {
                            cell.textContent = content;
                        }
                        else {
                            cell.innerHTML = content;
                        }
                    }

                    if ( typeof(body[i].class) !== 'undefined' ) {
                        cell.className += ' ' + body[i].class;
                    }

                }

                if ( maxCombatantsShown && ++combatantIndex === maxCombatantsShown ) {
                    break;
                }
            }

            // tbody が既に存在していたら置換、そうでないならテーブルに追加
            dpsMeter.replaceChild(newBody, dpsMeterBody);
            dpsMeterBody = newBody;
        }
        // Miniparse フォーマット文字列を解析し、表示文字列を取得する
        function parseActFormat(str, dictionary)
        {
            var result = "";
            var currentIndex = 0;
            do {
                var openBraceIndex = str.indexOf('{', currentIndex);
                if (openBraceIndex < 0) {
                    result += str.slice(currentIndex);
                    break;
                }
                else {
                    result += str.slice(currentIndex, openBraceIndex);
                    var closeBraceIndex = str.indexOf('}', openBraceIndex);
                    if (closeBraceIndex < 0) {
                        // parse error!
                        console.log("parseActFormat: Parse error: missing close-brace for " + openBraceIndex.toString() + ".");
                        return "ERROR";
                    }
                    else {
                        var tag = str.slice(openBraceIndex + 1, closeBraceIndex);
                        switch ( tag ) {
                            case "ENCDTPS":
                                var encdtps = +dictionary["damagetaken"] / +dictionary["DURATION"];
                                if ( isNaN(encdtps) ) encdtps = 0;
                                else if ( encdtps === Infinity ) encdtps = +dictionary["damagetaken"] / +data.Encounter["DURATION"];
                                result += Math.round(encdtps);
                                break;
                            case "encdps":
                            case "ENCDPS":
                                if ( dictionary[tag][0] === "+" ) {
                                    result += "---";
                                } else {
                                    result += dictionary[tag];
                                }
                                break;
                            case 'icon':
                                var icon = '';
                                if ( dictionary.Job ) {
                                    icon = dictionary.Job;
                                } else if ( typeof dictionary.name === "undefined" ) {
                                    console.log(tag);
                                } else if ( dictionary.name.indexOf('Limit Break') === 0 ) {
                                    icon = 'Limit Break';
                                } else if ( dictionary.name.indexOf('Eos (') === 0 ) {
                                    icon = 'Eos';
                                } else if ( dictionary.name.indexOf('Selene (') === 0 ) {
                                    icon = 'Selene';
                                } else if ( dictionary.name.indexOf('Garuda-Egi (') === 0 ) {
                                    icon = 'Garuda';
                                } else if ( dictionary.name.indexOf('Ifrit-Egi (') === 0 ) {
                                    icon = 'Ifrit';
                                } else if ( dictionary.name.indexOf('Titan-Egi (') === 0 ) {
                                    icon = 'Titan';
                                } else if ( dictionary.name.indexOf(' (') !== -1 ) {
                                    icon = 'Chocobo';
                                }

                                if ( icon ) {
                                    result += '<img src="images/glow/' + icon.toLowerCase() + '.png" onerror="$(this).attr(\"src\", \"images/error.png\");" />';
                                }
                                break;
                            case 'name':
                                var o;
                                if ( displayName && dictionary[tag] === "YOU" ) {
                                    result += displayName;
                                } else if ( nameDisplayType !== "FN" && (o = dictionary[tag].indexOf(' ')) !== -1 && dictionary[tag] !== 'Limit Break' ) {
                                    if ( nameDisplayType == "F" ) {
                                        result += dictionary[tag].substr(0, o);
                                    } else if ( nameDisplayType == "S" ) {
                                        result += dictionary[tag].substr(o);
                                    } else if ( nameDisplayType == "SA" ) {
                                        result += dictionary[tag].substr(0, o + 2) + ".";
                                    } else if ( nameDisplayType == "FA" ) {
                                        result += dictionary[tag].substr(0, 1) + ". " + dictionary[tag].substr(o + 1);
                                    }
                                } else {
                                    result += dictionary[tag];
                                }
                                break;
                            case 'maxhit':
                                if ( dictionary[tag] !== '' ) {
                                    result += parseInt(dictionary[tag].substr(dictionary[tag].lastIndexOf('-') + 1)) || '---';
                                } else {
                                    result += '---';
                                }
                                break;
                            case 'misses':
                                if ( dictionary[tag] !== "0" ) {
                                    result += dictionary[tag];
                                }
                                break;
                            default:
                                if ( typeof dictionary[tag] !== 'undefined' ) {
                                    result += dictionary[tag];
                                } else {
                                    console.log("parseActFormat: Unknown tag: " + tag);
                                    result += "ERROR";
                                }

                        }
                        currentIndex = closeBraceIndex + 1;
                    }
                }
            } while (currentIndex < str.length);

            return result;
        }
