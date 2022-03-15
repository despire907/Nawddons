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
    
    function removeDecimal(decimal) {
        const decimalIndex = decimal.toString().lastIndexOf('.');
        return decimal.toString().substring(0, decimalIndex);
    }
    
    function actualiseFromTime(box) {
        const askTime = $(`#timer${box}`).val();
        const unitTime = $(`#tempsUnite${box}`).text();
    
        const unitTimeinS = removeUnit(unitTime);
        const askTimeinS = SecondConvert(askTime);
    
        const toCraft = askTimeinS / unitTimeinS;
    
        const toCraftNoDecimal = removeDecimal(toCraft);
        const convertInApple = removeDecimal(toCraft * $(`#ressource${box}`).text());
    
        $(`#pondreUnite${box}`).val(toCraftNoDecimal);
        $(`#apple${box}`).val(convertInApple);
    }
    
    function actualiseFromApple(box) {
        const askApple = $(`#apple${box}`).val();
        const unitApple = $(`#ressource${box}`).text();
    
        const toCraft = askApple / unitApple
        $(`#pondreUnite${box}`).val(toCraft);
    }

    function placeBoxByUnit(count) {
        const tempsUnite = `#tempsUnite${count}`;
        const resource = `#ressource${count}`;

        const timer = `timer${count}`;
        const apple = `apple${count}`;

        const pondreUniteId = `pondreUnite${count}`;

        const Otimer = $(tempsUnite).text();
        const AppleTimer = $(resource).text();

        const position = `#sectionUniteCout${count}`;

        $(`#${pondreUniteId}`).val(1);

        $(position).after(`
            <div class="img--container">
                <img src="./public/images/time.png" class="image-1 iconecss" alt="Temps"> temps (m, h, j, M)
                <input id="${timer}" class="form-control ecriture" value="${Otimer}" />
            </div>
            <div class="img--container">
                <img class=" image-1 iconecss" src="./public/images/1ressource.png" alt="Nourriture"> pommes
                <input id="${apple}" class="form-control ecriture" value="${AppleTimer}" />
            </div>
            <style>
                .img--container {
                    border: 3px solid #62441D;
                    border-radius: 8px;
                    background: #9C723A;
                    margin-bottom: inherit;
                }
                .image-1 {
                    object-position: 50% 50%;
                }
            </style>
        `);
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
      $(`#apple${i}`).on("change keyup paste", function() {
            console.log("Ouvri : modif nb pommes");
           actualiseFromApple(i);
       })
      $(`#timer${i}`).on("change keyup paste", function() {
            console.log("Ouvri : modif timer");
            actualiseFromTime(i);
        })
       $(`#pondreUnite${i}`).on("change keyup paste", function() {
            console.log("Ouvri : modif nb to craft");
        })
    }
}

export default checkInit(['/reine'], [], resourcesTime);