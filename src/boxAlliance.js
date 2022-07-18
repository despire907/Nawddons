import $ from 'jquery';
import checkInit from './checkInit';
import initBox from './utils/initBox';
import { setCookie, getCookie } from './utils/manageCookies';

function insertAlliance(aliName, membre, totalTdc) {
    let Ali = {};
    Ali.Alliance = aliName;
    Ali.Data = [];

    let temp = {}
    temp.Date = new Date().toLocaleDateString("fr-FR");
    temp.Totaltdc = totalTdc;
    temp.Membre = membre
    Ali.Data.push(temp);

    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(Ali),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(` http://localhost:5000/allianceInfo/${aliName}`, requestOptions)
        .catch(error => console.error('API error : ', error))
}

function getTdc(name) {
    var requestOptions = {
        method: 'GET',
    };
    const parser = new DOMParser();

    fetch("https://www.natureatwar.fr/descriptionalliance-" + name, requestOptions)
        .then(response => response.text())
        .then(result => {
            const par = parser.parseFromString(result, "text/html");
            const tabs = par.getElementsByClassName("table-striped");


            const goodTabs = tabs.item(2);
            const goodCell = goodTabs.getElementsByTagName("tr")[2];
            const tdc = goodCell.getElementsByTagName("td")[2].innerText;
            setCookie(`${name}Tdc`, tdc, 1);

            console.log("PARSE MEMBRE : ")
            const memberTabs = tabs.item(1);
            const memberList = memberTabs.getElementsByTagName("tr");

            let skipFirst = true;
            let Data = [];
            for (let member of memberList) {
                if (skipFirst === true)
                    skipFirst = false
                else {
                    let memberToAdd = {};
                    const split = member.getElementsByTagName("td")

                    memberToAdd.tdc = split[0].innerText;
                    memberToAdd.grade = split[1].innerText;
                    memberToAdd.playerName = split[2].getElementsByTagName("a")[0].innerText.trim();
                    memberToAdd.coloName = split[3].getElementsByTagName("a")[0].innerText;
                    const coord = split[3].getElementsByTagName("a")[0].href;
                    memberToAdd.x = coord.substring(36, coord.lastIndexOf("-"));
                    memberToAdd.y = coord.substring(coord.lastIndexOf("-"));
                    memberToAdd.rangTotal = split[4].innerText;
                    memberToAdd.rangBatiment = split[5].innerText;
                    memberToAdd.rangRecherche = split[6].innerText;

                    Data.push(memberToAdd);
                }
            }
            insertAlliance(name, Data, tdc);
        })
        .catch(error => console.error('error : ', error))
}

function runAlliance(name) {
    const link = "https://www.natureatwar.fr/descriptionalliance-" + name;
    const tdc = getCookie(`${name}Tdc`);
    const unit = `
    <tr>
        <td>
            <a href="${link}">${name} - </a>
        </td>       
        <td style="text-align :left" id="tdc-${name}">${tdc}</td>
    </tr>`;

    $('#boxAlliance').append(unit);

    return unit;
}

function boxAlliance() {

    const pathname = window.location.pathname;
    const vueDensemble = "/vuedensemble";

    if (vueDensemble.includes(pathname)) {
        getTdc("OFC");
        getTdc("LN");
    }

    initBox("Box Alliance", "boxAlliance");
    runAlliance("OFC");
    runAlliance("LN");
}

export default checkInit([], [], boxAlliance);