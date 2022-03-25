import checkInit from "./checkInit";
import initBox from "./utils/initBox";
import { getActualTdc, getUsername } from './utils';

const boxPlayer = () => {
    const _requestOptions = {
        method: 'GET',
    };
    var _data = {
        User: "",
        UpdateDate: "",
        Alliance: "",
        Tdc: 0,
        Tdp: 0,
        X: 0,
        Y: 0,
        Unite: {
            O: 0,
            OE: 0,
            OC: 0,
            Esclave: 0,
            MaitreEsclave: 0,
            JeuneSoldate: 0,
            Soldate: 0,
            SoldateElite: 0,
            Gardienne: 0,
            GardienneElite: 0,
            Tirailleuse: 0,
            TirailleuseElite: 0,
            JeuneLegionnaire: 0,
            Legionnaire: 0,
            LegionnaireElite: 0,
            JeuneTank: 0,
            Tank: 0,
            TankElite: 0
        },
        Batiment: {
            ChambreImperial: 0,
            Atelier: 0,
            Caserne: 0,
            Laboratoire: 0,
            Dome: 0,
            Loge: 0,
            SalleEntrainement: 0,
            Erudidtion: 0
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
        _data.Tdp = tdp;
    }

    async function getProfilInfo() {
        const parser = new DOMParser();
        await fetch("https://www.natureatwar.fr/profil", _requestOptions)
            .then(response => response.text())
            .then(result => {
                const par = parser.parseFromString(result, "text/html")
                const tabs = par.getElementsByClassName("ecriturepagetitre");
                const line = tabs[0].innerHTML;
                const index = line.indexOf('>')
                const alliance = line.substring(index + 1, line.lastIndexOf('<'), index);

                const tabsCoord = par.getElementsByClassName("table-striped");
                const lineCoord = tabsCoord[2];
                const cellCoord = lineCoord.children[0].children[1].children[1].innerHTML;

                const x = cellCoord.slice(cellCoord.indexOf('[') + 1, cellCoord.indexOf(':'));
                const y = cellCoord.slice(cellCoord.indexOf(':') + 1, cellCoord.indexOf(']'));

                _data.Alliance = alliance;
                _data.X = x;
                _data.Y = y;
            })
            .catch(error => console.error('error : ', error))
    }

    async function getRecherche() {
        const parser = new DOMParser();
        await fetch("https://www.natureatwar.fr/recherches", _requestOptions)
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

    async function getBat() {
        const parser = new DOMParser();
        await fetch("https://www.natureatwar.fr/installations", _requestOptions)
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

    async function getUnite() {
        const parser = new DOMParser();
        await fetch("https://www.natureatwar.fr/reine", _requestOptions)
            .then(response => response.text())
            .then(result => {
                const par = parser.parseFromString(result, "text/html");
                const tabs = par.getElementsByClassName("titreNombreUnite");
                _data.Unite.O = tabs[0].innerHTML.substring(0, tabs[0].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.OE = tabs[1].innerHTML.substring(0, tabs[1].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.OC = tabs[2].innerHTML.substring(0, tabs[2].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.Esclave = tabs[3].innerHTML.substring(0, tabs[3].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.MaitreEsclave = tabs[4].innerHTML.substring(0, tabs[4].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.JeuneSoldate = tabs[5].innerHTML.substring(0, tabs[5].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.Soldate = tabs[6].innerHTML.substring(0, tabs[6].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.SoldateElite = tabs[7].innerHTML.substring(0, tabs[7].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.Gardienne = tabs[8].innerHTML.substring(0, tabs[8].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.GardienneElite = tabs[9].innerHTML.substring(0, tabs[9].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.Tirailleuse = tabs[10].innerHTML.substring(0, tabs[10].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.TirailleuseElite = tabs[11].innerHTML.substring(0, tabs[11].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.JeuneLegionnaire = tabs[12].innerHTML.substring(0, tabs[12].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.Legionnaire = tabs[13].innerHTML.substring(0, tabs[13].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.LegionnaireElite = tabs[14].innerHTML.substring(0, tabs[14].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.JeuneTank = tabs[15].innerHTML.substring(0, tabs[15].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.Tank = tabs[16].innerHTML.substring(0, tabs[16].innerHTML.indexOf("unit")).replaceAll(" ", "");
                _data.Unite.TankElite = tabs[17].innerHTML.substring(0, tabs[17].innerHTML.indexOf("unit")).replaceAll(" ", "");
            })
            .catch(error => console.error('error : ', error))
    }

    async function uploadInfo() {
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(_data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await fetch(` https://nadonz.herokuapp.com/userInfo`, requestOptions)
            .catch(error => console.error('API error : ', error))
    }

    async function catchInfo() {
        const requestOptions = {
            method: 'GET',
        };
        await fetch(` https://nadonz.herokuapp.com/userInfo/${getUsername()}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result) {
                    const json = JSON.parse(result);
                    _data.User = json.User;
                    _data.Alliance = json.Alliance;
                    _data.Tdp = json.Tdp;
                    _data.Tdc = json.Tdc;

                    $("#tdp").html(`${_data.Tdp}`);
                    $("#ali").html(`${_data.Alliance}`);
                }
            })
            .catch(error => console.error('API error : ', error))
    }

    async function onClick() {
        _data.User = getUsername();
        _data.Tdc = getActualTdc();
        await getBat();
        await getRecherche();
        await getUnite();
        await getProfilInfo();
        _data.UpdateDate = Date.now();

        await uploadInfo();
        catchInfo()
    }

    async function init() {
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
            <td>tdp: </td>
            <td id="tdp"></td>
        </tr>
        <tr>
            <td>ali: </td>
            <td id="ali"></td>
        </tr>
        `);
        await catchInfo();
    }

    init();
    $('#boxPlayerRefresh').after().on("click", () => onClick());
}
export default checkInit([], [], boxPlayer);