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

        $(position).remove()

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

                if (input === "000") {
                    OToCraft = 0;
                }
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
                    console.log("Second unit");
                    var temp = parseFloat(unitTime) 
                    console.log(temp);
                    Ominute = 60 / temp;
                    Ominute = Ominute.toString();
                    console.log(temp);
                    if(Ominute.lastIndexOf('.') !== -1)
                        Ominute = parseInt(Ominute.substr(0, Ominute.lastIndexOf('.')), 10);
                    Ohour = 60 * Ominute
                } else {
                    console.log("Minute unit");
                    Ohour = 60 / parseFloat(unitTime);
                }
                console.log("Ohour = ");
                console.log(Ohour);
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

        const placement = `#${pondreUniteId}`;
        $(placement).after(actualize_apple);
        $(placement).after(actualize_time);
        $(placement).val(1);
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