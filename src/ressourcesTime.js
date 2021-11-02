import $ from 'jquery';
import checkInit from "./checkInit";

const resourcesTime = () => {

    function resource_calculate(apple) {
        //catch total apple
        const totalApple = $("<span name=dynamisme3>").text();
        console.log(`total apple= ${totalApple}`);
        //TODO test

        const OToCraft = 666;


        return (OToCraft);
    }

    function time_calculate(time) {
        //catch total time
        const OToCraft = 666;

        return (OToCraft);
    }

    function byUnit(count) {
        console.log("__START")
        //TODO check count
        const tempsUnite = `#tempsUnite${count}`
        const resource =`#ressource${count}`;

        const timer = `#timer${count}`;
        const apple = `#apple${count}`

        const pondreUnite = `#pondreUnite${count}`;

        const Otimer = $(tempsUnite).text();
        const AppleTimer = $(resource).text();

        $(tempsUnite).remove();
        $(resource).after(`<input id="${timer}" class="form-control ecriture" value="${Otimer}" >bouffe</input>`);

        $(resource).before(`<input id="${apple}" class="form-control ecriture" value="${AppleTimer}" >bouffe</input>`)
        $(resource).remove()

        //TODO calculate value

        // $(timer).val()

        const TimeProduction = time_calculate(AppleTimer);
        const AppleProduction = resource_calculate(AppleTimer);

        const OtoCraft = TimeProduction === 0 ? AppleProduction : TimeProduction;

        console.log(`OtoCraft: ${OtoCraft}`);
        $(pondreUnite).attr("value", OtoCraft);


        //TODO actualise on change
        $(timer).on("change", function (elem) {
            console.log("change detected");
        })

        console.log("__END");
    }

    const init = () => {
        byUnit(1);
    }

    init();
}

export default checkInit(['/reine'], ['/ressourcesTime'], resourcesTime());