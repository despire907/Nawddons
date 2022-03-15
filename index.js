import chatAlliance from "./src/chatAlliance";
import convoiMembre from "./src/convoiMembre";
import maxOuvri from "./src/maxOuvri";
import totalArmee from "./src/totalArmee";
import tmpBatiments from "./src/tmpBatiments";
import copyFlood from "./src/copyFlood";
import ressourcesTime from "./src/ressourcesTime"
import boxAlliance from "./src/boxAlliance"

chatAlliance();
convoiMembre();
maxOuvri();
totalArmee();
tmpBatiments();
copyFlood();
ressourcesTime();
//boxAlliance();

function SecondConvert(askTime) {
    let askTimeInSecond;

    if (askTime.lastIndexOf('m') !== -1) {
        askTime = removeUnit(askTime, 'm')
        askTimeInSecond = askTime * 60;
    } else if (askTime.lastIndexOf('h') !== -1) {
        askTime = removeUnit(askTime, 'h')
        askTimeInSecond = askTime * 60 * 60;
    } else if (askTime.lastIndexOf('j') !== -1) {
        askTime = removeUnit(askTime, 'j')
        askTimeInSecond = askTime * 60 * 60 * 24;
    } else if (askTime.lastIndexOf('M') !== -1) {
        askTime = removeUnit(askTime, 'M')
        askTimeInSecond = askTime * 60 * 60 * 24 * 30;
    } else
        console.log(askTime);
    return askTimeInSecond;
}

function removeUnit(time, toRemove) {
    var tab = time.split('');
    const find = tab.findIndex(e => e === toRemove);

    if (find == undefined)
        return time;

    tab.splice(find, 1);
    const result = tab.join('');

    return result;
}

function actualiseFromTime(box) {
    const askTime = $(`#timer${box}`).val();
    const unitTime = $(`#tempsUnite${box}`).text();

    const unitTimeinS = removeUnit(unitTime);
    const askTimeinS = SecondConvert(askTime);

    const toCraft = askTimeinS / unitTimeinS;

    const decimalIndex = toCraft.toString().lastIndexOf('.');
    const toCraftNoDecimal = toCraft.toString().substring(0, decimalIndex);
    $(`#pondreUnite${box}`).val(toCraftNoDecimal);
}

function actualiseFromApple(box) {
    const askApple = $(`#apple${box}`).val();
    const unitApple = $(`#ressource${box}`).text();

    const toCraft = askApple / unitApple
    $(`#pondreUnite${box}`).val(toCraft);
}

$("#apple1").on("change keyup paste", function() {
    console.log("Ouvri : modif nb pommes");
    actualiseFromApple(1);
})

$("#timer1").on("change keyup paste", function() {
    console.log("Ouvri : modif timer");
    actualiseFromTime(1);
})

$("#pondreUnite1").on("change keyup paste", function() {
    console.log("Ouvri : modif nb to craft");
})