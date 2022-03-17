import $ from 'jquery';
import checkInit from './checkInit';
import initBox from './utils/initBox';
import { setCookie, getCookie } from './utils/manageCookies';

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
    
    if (vueDensemble.includes(pathname))
    {
        getTdc("OFC");
        getTdc("LN");
    }

    initBox("Box Alliance", "boxAlliance");
    runAlliance("OFC");
    runAlliance("LN");
}

export default checkInit([], [], boxAlliance);



