import $ from 'jquery';
import checkInit from "./checkInit";

const resourcesTime = () => {

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
                <img src="./public/images/time.png" class="image-1 iconecss" alt="Temps"> temps
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
        //$(position).remove()
    }

    const init = () => {
        var i = 0;
        while (i <= 23) {
            placeBoxByUnit(i);
            i++;
        }
    }

    init();
}

export default checkInit(['/reine'], [], resourcesTime);