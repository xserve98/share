/**
 * @author wulc
 * 严重性和可能性都有了值之后计算风险等级
 * @param possibility
 * @param serious
 * @returns {*}
 * @constructor
 */
function CountRiskLevel2(possibility, serious) {
    var riskLevel;
    if (parseInt(possibility) == 1 && parseInt(serious) <= 3) {
        riskLevel = 1;
    } else if (parseInt(possibility) == 1 && parseInt(serious) >= 4) {
        riskLevel = 2;
    }
    if (parseInt(possibility) == 2 && parseInt(serious) <= 2) {
        riskLevel = 1;
    } else if (parseInt(possibility) == 2 && parseInt(serious) == 5) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 2 && parseInt(serious) >= 3 && parseInt(serious) <= 4) {
        riskLevel = 2;
    }
    if (parseInt(possibility) == 3 && parseInt(serious) <= 1) {
        riskLevel = 1;

    } else if (parseInt(possibility) == 3 && parseInt(serious) <= 3 && parseInt(serious) >= 2) {
        riskLevel = 2;

    } else if (parseInt(possibility) == 3 && parseInt(serious) == 4) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 3 && parseInt(serious) == 5) {
        riskLevel = 4;
    }
    if (parseInt(possibility) == 4 && parseInt(serious) <= 2) {
        riskLevel = 2;
    } else if (parseInt(possibility) == 4 && (parseInt(serious) == 2 || parseInt(serious) == 3 || parseInt(serious) == 4)) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 4 && parseInt(serious) == 5) {
        riskLevel = 4;
    }
    if (parseInt(possibility) == 5 && parseInt(serious) <= 1) {
        riskLevel = 2;
    } else if (parseInt(possibility) == 5 && parseInt(serious) <= 3 && parseInt(serious) >= 2) {
        riskLevel = 3;
    } else if (parseInt(possibility) == 5 && parseInt(serious) >= 4) {
        riskLevel = 4;
    }
    return riskLevel
}

/**
 * 计算出风险等级之后更改颜色
 * @param riskLevel
 */
function changeColorForLevelCorbar(riskLevel) {
    var classArr = target.attr('class').split(' ');
    for (var i = 0; i < classArr.length; i++) {
        if (classArr[i].slice(0, -1) == 'drag-riskLevel') {
             //console.log(classArr);
            classArr.splice(i, 1);
             //console.log(classArr);
        }
    }
    classArr.push('drag-riskLevel' + riskLevel);
    target.attr("class", classArr.join(' '));
     //console.log(mini.get('riskPossShow'));
    mini.get('riskPossShow').setValue(riskLevel);
    mini.get('riskProgressbar').setValue(riskLevel * 25);
}

/**
 * 计算规则生效
 * @param rules
 * @returns {array}
 */
function computeLeveDeta(rules) {
    var ruleDeta = [];
    var levelDeta = 0;
    var possDeta = 0;
    var seriousDeta = 0;
    for (var i = 0; i < rules.length; i++) {
         //console.log(rules[i]);
        switch (rules[i]){
            case 1:
                levelDeta +=1;
                break;
            case 2:
                levelDeta -=1;
                break;
            case 3:
                possDeta +=1;
                break;
            case 4:
                possDeta -=1;
                break;
            case 5:
                seriousDeta +=1;
                break;
            case 6:
                seriousDeta -=1;
                break;
        }
    }
    ruleDeta.push(levelDeta);
    ruleDeta.push(possDeta);
    ruleDeta.push(seriousDeta);
    return ruleDeta;
}

/**
 * 根据可能性，严重性，所选的生效规则，重新计算风险等级,过期规则不会加入
 * @describe: 1:风险等级增加一级，2：风险等级降低一级 3：风险可能性增加一级 4：风险可能性降低一级 5：风险严重性增加一级 6：风险严重性降低一级
 * @param rules：生效规则（ruleAdd）
 */
var level_index = 0;
var poss_index = 1;
var serious_index = 2;

function computeLevelByRules(rules){
    var poss = mini.get('btnEditp').getValue();
    var serious = mini.get('btnEdits').getValue();
     //console.log('poss:',poss,'serious:',serious);
    if (poss == 0 || serious == 0) return;
    var risk_target = computeLeveDeta(rules);
    //逻辑待修改
    poss = parseInt(poss) + risk_target[poss_index];
    if (poss < 0) poss = 0;
    serious = parseInt(serious) + risk_target[serious_index];
    if (serious < 0) serious = 0;
    var riskLevel = CountRiskLevel2(poss, serious);
    riskLevel += risk_target[level_index];
    if (riskLevel < 0) riskLevel = 0;
    changeColorForLevelCorbar(riskLevel)
}


