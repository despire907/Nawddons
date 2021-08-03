import $ from 'jquery';
import checkInit from "./checkInit";

function setValue() {
    $('#infoOuvriRecolte').attr("value", Number($('#terrain').val()));
    $('button[type=submit]').click();
}

function maxOuvri() {
    $('form').before('<button id="setMax">Max</button>');
    $('#setMax').click(() => setValue());
}

export default checkInit(['/recolte'], [], maxOuvri);