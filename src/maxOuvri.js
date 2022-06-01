import $ from 'jquery';
import checkInit from "./checkInit";
import { getUsername } from './utils';

async function getOuvri() {
    const requestOptions = {
        method: 'GET',
    };
    getUsername()
    await fetch(` https://nadonz.herokuapp.com/userInfo/${getUsername()}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            if (result) {
                const json = JSON.parse(result);

                var tdc = json.Tdc
                var O = json.Unite.O;
                var OE = json.Unite.OE;
                
                let OtoCraft = 0;
                let OEtoCraft = 0;

                if ((OE * 1000) > tdc)
                    OEtoCraft = tdc / 1000
                else if ((O + (OE * 1000)) < tdc ) {
                        OtoCraft = O;
                        OEtoCraft = OE;
                } else if ((OE * 1000) < tdc) {
                    OtoCraft = tdc - (OE * 1000);
                    OEtoCraft = OE;
                } else {
                    console.log("Je suis perdue");
                }
                
                // console.log(tdc);
                // console.log(O);
                // console.log(OE);

                // console.log(OtoCraft);
                // console.log(OEtoCraft);
                $('#infoOuvriRecolte').attr("value", OtoCraft);
                $('#infoOuvriEliteRecolte').attr("value", OEtoCraft);
            }
        })
        .catch(error => console.error('API error : ', error))
}

function setValue() {
    // console.log(Number($('#terrain').val()));

    // const O = 0;
    // const OE = 100;

    // console.log(O);
    // console.log(OE);

    // $('#infoOuvriRecolte').attr("value", O);
    // $('#infoOuvriEliteRecolte').attr("value", OE);
    // $('button[type=submit]').click();
    getOuvri();
}

function maxOuvri() {
    $('form').before('<button id="setMax">Max</button>');
    $('#setMax').click(() => setValue());
}

export default checkInit(['/recolte'], [], maxOuvri);