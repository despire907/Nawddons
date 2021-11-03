import $ from 'jquery';
import checkInit from "./checkInit";

const resourcesTime = () => {

    function byUnit(count) {
        console.log("__START");
        const tempsUnite = `#tempsUnite${count}`;
        const resource = `#ressource${count}`;

        const timer = `#timer${count}`;
        const apple = `#apple${count}`;

        const pondreUnite = `#pondreUnite${count}`;
        const pondreUniteId = `pondreUnite${count}`;

        const Otimer = $(tempsUnite).text();
        const AppleTimer = $(resource).text();

        $(resource).after(`<input id="${timer}" class="form-control ecriture" value="${Otimer}" >temp</input>`);
        $(resource).before(`<input id="${apple}" class="form-control ecriture" value="${AppleTimer}" >bouffe</input>`);

        const actualize_apple = `<script>document.getElementById("${apple}").addEventListener("input", 
            function() {
                const price = ${AppleTimer};
                const input = document.getElementById("${apple}").value;
                //TODO check spaces in input
                
                //TODO check maximum capacity
                //const stockPomme = removeExtraSpace(document.getElementsByName("dynamise3")[0].innerHTML);
                //const maxToCraft = stockPomme / price;

                var OToCraft = input / price;
                OToCraft = OToCraft.toString();
                
                if (OToCraft.lastIndexOf('.') !== -1)
                    OToCraft = OToCraft.substr(0, OToCraft.lastIndexOf('.'))               

                document.getElementById("${pondreUniteId}").value = OToCraft;
                
            })
        </script>`;

        $(resource).after(actualize_apple);

        $(tempsUnite).remove();
        $(resource).remove();
        console.log("__END");
    }

    const init = () => {
        var i = 0;
        while (i <= 23) {
            byUnit(i);
            i++;
        }
    }

    init();
}

export default checkInit(['/reine'], ['/ressourcesTime'], resourcesTime());