import $ from 'jquery'
import checkInit from './checkInit'

function addAlliance(name, link, tdc) {
    const unit = `
    <tr>
        <td>
            <a href="${link}">${name} - </a>
        </td>       
        <td style="text-align :left">
            ${tdc}
        </td>
    </tr>`;
    
    $('#boxAlliance').append(unit);

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

    addAlliance("OFC", "https://www.natureatwar.fr/descriptionalliance-OFC", "tdc");
    addAlliance("LN", "https://www.natureatwar.fr/descriptionalliance-LN", "tdc");
}

export default checkInit([], [], boxAlliance);



