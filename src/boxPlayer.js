import checkInit from "./checkInit";
import initBox from "./utils/initBox";

const boxPlayer = () => {
    var _requestOptions = {
        method: 'GET',
    };
    var _data = {
        Batiment: {
            ChambreImperial: 0,
            Atelier: 0,
            Caserne: 0,
            Laboratoire: 0,
            Dome: 0,
            Loge: 0,
            SalleEntrainement: 0,
            Erudidtion: 0,
        },
        Recherche: {
            Thermique: 0,
            Analyseur: 0,
            Pheromone: 0,
            Mandibule: 0,
            Carapace: 0,
            Satisfaction: 0,
            VA: 0,
            VConvoi: 0,
            VTraque: 0,
            Pillage: 0,
            ArdDeLaGuerre: 0,
            Genetique: 0,
            Toxique: 0,
            Colonisation: 0
        }
    }

    function actualiseTdp() {
        const tdp = _data.Batiment.ChambreImperial + _data.Batiment.Laboratoire + _data.Recherche.Thermique;
        $('#tdp').html(`${tdp}`);
    }

    function getRecherche() {
        const parser = new DOMParser();
        fetch("https://www.natureatwar.fr/recherches", _requestOptions)
            .then(response => response.text())
            .then(result => {
                const par = parser.parseFromString(result, "text/html");
                const tabs = par.getElementsByClassName("titreNombreUnite");
                _data.Recherche.Thermique = parseInt(tabs[0].innerHTML.substring(6, 9));
                _data.Recherche.Analyseur = parseInt(tabs[1].innerHTML.substring(6, 9));
                _data.Recherche.Pheromone = parseInt(tabs[2].innerHTML.substring(6, 9));
                _data.Recherche.Mandibule = parseInt(tabs[3].innerHTML.substring(6, 9));
                _data.Recherche.Carapace = parseInt(tabs[4].innerHTML.substring(6, 9));
                _data.Recherche.Satisfaction = parseInt(tabs[5].innerHTML.substring(6, 9));
                _data.Recherche.VA = parseInt(tabs[6].innerHTML.substring(6, 9));
                _data.Recherche.VConvoi = parseInt(tabs[7].innerHTML.substring(6, 9));
                _data.Recherche.VTraque = parseInt(tabs[8].innerHTML.substring(6, 9));
                _data.Recherche.Pillage = parseInt(tabs[9].innerHTML.substring(6, 9));
                _data.Recherche.ArdDeLaGuerre = parseInt(tabs[10].innerHTML.substring(6, 9));
                _data.Recherche.Genetique = parseInt(tabs[11].innerHTML.substring(6, 9));
                _data.Recherche.Toxique = parseInt(tabs[12].innerHTML.substring(6, 9));
                _data.Recherche.Colonisation = parseInt(tabs[13].innerHTML.substring(6, 9));
                actualiseTdp();
            })
            .catch(error => console.error('error : ', error))
    }

    function getBat() {
        const parser = new DOMParser();
        fetch("https://www.natureatwar.fr/installations", _requestOptions)
            .then(response => response.text())
            .then(result => {
                const par = parser.parseFromString(result, "text/html");
                const tabs = par.getElementsByClassName("titreNombreUnite");
                _data.Batiment.ChambreImperial = parseInt(tabs[0].innerHTML.substring(6, 9));
                _data.Batiment.Atelier = parseInt(tabs[1].innerHTML.substring(6, 9));
                _data.Batiment.Caserne = parseInt(tabs[2].innerHTML.substring(6, 9));
                _data.Batiment.Laboratoire = parseInt(tabs[3].innerHTML.substring(6, 9));
                _data.Batiment.Dome = parseInt(tabs[4].innerHTML.substring(6, 9));
                _data.Batiment.Loge = parseInt(tabs[5].innerHTML.substring(6, 9));
                _data.Batiment.SalleEntrainement = parseInt(tabs[6].innerHTML.substring(6, 9));
                _data.Batiment.Erudidtion = parseInt(tabs[7].innerHTML.substring(6, 9));
            })
            .catch(error => console.error('error : ', error))
    }

    function onClick() {
        getBat();
        getRecherche();
    }

    function init() {
        const button = `<tr id="boxPlayerTab"><td><button class="playerinfo" id="boxPlayerRefresh">Player info</button></td></tr>`;
        const cssButton = `
        <style>
            .playerinfo {
                background: rgb(224, 170, 99);
                border: 3px solid #62441D;
                border-radius: 5px;
                color: #62441D;
            }
        </style>
        `;


        initBox(`${button}`, "boxPlayer");
        $("#boxPlayer").after(cssButton);
        $('#boxPlayer').append(`
        <tr>
            <td>tdc: </td>
            <td id="tdp"></td>
        </tr>
        `);
        
    }

    init();
    $('#boxPlayerRefresh').after().on("click", () => onClick());
}
export default checkInit([], [], boxPlayer);