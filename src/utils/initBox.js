import $ from 'jquery';

export default function initBox(name, id){
    $('.sideLeft .contenunavleft').after(`
    <div class="contenusousnavleft">
        <div class="interieur">
            <center>${name}</center>
            <div>
                <table style="border-spacing: 2px;">
                    <tbody id="${id}"></tbody>
                </table>
            </div>
        </div>
    </div>`);
}
