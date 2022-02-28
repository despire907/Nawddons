import $ from 'jquery'
import checkInit from './checkInit'

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

                $(`#tdc-${name}`).append(tdc);
        })
        .catch(error => console.error('error : ', error))
}

function addAlliance(name) {
    const link = "https://www.natureatwar.fr/descriptionalliance-" + name;
    const unit = `
    <tr>
        <td>
            <a href="${link}">${name} - </a>
        </td>       
        <td style="text-align :left" id="tdc-${name}"></td>
    </tr>`;
    
    $('#boxAlliance').append(unit);
    getTdc(name);

    return unit;
}

function initBox(){
    $('.sideLeft .contenunavleft').after(`
    <div class="contenusousnavleft">
        <div class="interieur">
            <center>Box Ali</center>
            <div>
                <table style="border-spacing: 2px;">
                    <tbody id="boxAlliance"></tbody>
                </table>
            </div>
        </div>
    </div>`);
}

function boxAlliance() {
    initBox();

    addAlliance("OFC");
    addAlliance("LN");
}

export default checkInit([], [], boxAlliance);



