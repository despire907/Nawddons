import $ from 'jquery';
import checkInit from "./checkInit";

const resourcesTime = () => {

    function timeByUnit(count) {
        const tempsUnite = `#tempsUnite${count}`;
        const resource = `#ressource${count}`;

        const timer = `#timer${count}`;
        const apple = `#apple${count}`;

        const pondreUniteId = `pondreUnite${count}`;

        const Otimer = $(tempsUnite).text();
        const AppleTimer = $(resource).text();

        const position = `#sectionUniteCout${count}`;


        $(position).after(`<input id="${timer}" class="form-control ecriture" value="${Otimer}" />`);
        $(position).after(`<input id="${apple}" class="form-control ecriture" value="${AppleTimer}" />`);

        const actualize_apple = `<script>document.getElementById("${apple}").addEventListener("input", 
            function() {
                const price = parseInt("${AppleTimer}", 10);
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

        const actualize_time = `<script>document.getElementById("${timer}").addEventListener("input", 
            function() {
                var OToCraft = 0;
                const unitTime = "${Otimer}";
                const askTime = document.getElementById("${timer}").value.toString(); 
                var Ominute = 0;
                var Ohour = 0;
                
                if (unitTime.lastIndexOf('m') === -1) {
                    Ominute = 60 / parseFloat(unitTime);
                    Ominute = Ominute.toString();
                    if(Ominute.lastIndexOf('.') !== -1)
                        Ominute = parseInt(Ominute.substr(0, Ominute.lastIndexOf('.')), 10);
                    Ohour = 60 * Ominute
                } else
                    Ohour = 60 / parseFloat(unitTime);
                
                const Oday = 24 * Ohour;               
                const Omonth = 30 * Oday;
                const Oyear = 365 * Omonth;
                
                if (askTime.lastIndexOf('m') !== -1)
                    OToCraft = Ominute * askTime.substr(0, askTime.lastIndexOf('m'));
                else if (askTime.lastIndexOf('h') !== -1)
                    OToCraft = Ohour * askTime.substr(0, askTime.lastIndexOf('h'));
                else if (askTime.lastIndexOf('j') !== -1)
                    OToCraft = Oday * askTime.substr(0, askTime.lastIndexOf('j'));
                else if (askTime.lastIndexOf('M') !== -1)
                    OToCraft = Omonth * askTime.substr(0, askTime.lastIndexOf('M'));
                else if (askTime.lastIndexOf('A') !== -1)
                    OToCraft = Oyear * askTime.substr(0, askTime.lastIndexOf('A'));

                document.getElementById("${pondreUniteId}").value = OToCraft;
            })
        </script>`;

        $(resource).after(actualize_apple);
        $(resource).after(actualize_time);

        //$(tempsUnite).remove();
        //$(resource).remove();
    }

    const init = () => {
        var i = 0;
        while (i <= 23) {
            timeByUnit(i);
            i++;
        }
    }

    init();
}

export default checkInit(['/reine'], [], resourcesTime);