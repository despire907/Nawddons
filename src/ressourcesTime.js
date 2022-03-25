import $ from 'jquery';
import checkInit from "./checkInit";

const resourcesTime = () => {

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
        }

        return askTimeInSecond;
    }
    
    function removeUnit(time, toRemove) {
        var tab = time.split('');
        const find = tab.findIndex(e => e === toRemove);
    
        if (find === undefined)
            return time;
    
        tab.splice(find, 1);
        const result = tab.join('');
    
        return result;
    }
    
    function removeDecimal(decimal) {
        const decimalIndex = decimal.toString().lastIndexOf('.');
        if (decimalIndex === -1)
            return decimal;
        return decimal.toString().substring(0, decimalIndex);
    }
    
    function actualiseFromTime(box) {
        const askTime = $(`#tempsUnites${box}`).val();
        const unitTime = $(`#tempsUnite${box}`).text();
    
        const unitTimeinS = removeUnit(unitTime);
        const askTimeinS = SecondConvert(askTime);
    
        const toCraft = askTimeinS / unitTimeinS;
    
        const toCraftNoDecimal = removeDecimal(toCraft);
        const convertInApple = removeDecimal(toCraft * $(`#ressource${box}`).text());
    
        $(`#pondreUnite${box}`).val(toCraftNoDecimal);
        $(`#ressources${box}`).val(convertInApple);
    }
    
    function actualiseFromApple(box) {
        const askApple = $(`#ressources${box}`).val();
        const unitApple = $(`#ressource${box}`).text();
    
        const toCraft = askApple / unitApple;
        const toCraftNoDecimal = removeDecimal(toCraft);
        $(`#pondreUnite${box}`).val(toCraftNoDecimal);
    }

    function placeBoxByUnit(count) {
        const tempsUnite = `#tempsUnite${count}`;
        const resource = `#ressource${count}`;
        const pondreUniteId = `pondreUnite${count}`;

        const Otimer = $(tempsUnite).text();
        const AppleTimer = $(resource).text();
        $(resource).after(`<input id="ressources${count}" value="${AppleTimer}" style="background-color: rgba(255, 255, 128, 0);border-color: rgba(255, 255, 128, 0);width: 80%;"></input>`);
        $(resource).hide();
        $(tempsUnite).after(`<input id="tempsUnites${count}" value="${Otimer}" style="background-color: rgba(255, 255, 128, 0);border-color: rgba(255, 255, 128, 0);width: 80%;"></input>`);
        $(tempsUnite).hide();
        $(`#${pondreUniteId}`).val(1);
    }

    const init = () => {
        var i = 0;
        while (i <= 23) {
            placeBoxByUnit(i);
            i++;
        }
    }

    init();

    for (let i = 0; i < 24; i++) {   
      $(`#ressources${i}`).on("change keyup paste", () => actualiseFromApple(i))
      $(`#tempsUnites${i}`).on("change keyup paste", () => actualiseFromTime(i))
    }
}

export default checkInit(['/reine'], [], resourcesTime);