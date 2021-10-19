import $ from 'jquery';
import checkInit from "./checkInit";

const ressourcesTime = () => {

    function byUnit(count) {
        console.log("__START")
        //TODO check count
        const tempsUnite = '#tempsUnite' + `${count}`;
        const ressource = '#ressource' + `${count}`;
        const timer = '#timer' + `${count}`;
        const pondreUnite = '#timer' + `${count}`;

        const Otimer = $(tempsUnite).text();

        $(tempsUnite).remove();
        $(ressource).after(`<input id="${timer}" value="66" class="form-control ecriture" value="${Otimer}" >bouffe</input>`);

        const OtoCraft = $(timer).val();

        $(pondreUnite).attr("value", OtoCraft);

        //TODO actualise on change
        $(timer).on("change", function (elem) {
            console.log("change detected");
        })

        console.log("__END")
    }

    const init = () => {
        byUnit(1);
    }

    init();
}

export default checkInit([], ['/ressourcesTime'], ressourcesTime());