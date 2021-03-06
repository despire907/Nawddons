import $ from 'jquery';
import checkInit from "./checkInit";

const calcTerrain = () => {
    var result = 0;
    let i = 6;
    while(i < 72) {
        result += Number($(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
        i += 5;
    }
    return result;
}

const calcDome = () => {
    var result = 0;
    let i = 7;
    while(i < 73) {
        result += Number($(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
        i += 5;
    }
    return result;
}

const calcLoge = () => {
    var result = 0;
    let i = 8;
    while(i < 74) {
        result += Number($(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
        i += 5;
    }
    return result;
}

const calcTotal = () => {
    var result = 0;
    let i = 9;
    while(i < 75) {
        result += Number($(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
        i += 5;
    }
    return result;
}

const totalArmee = () => {
    let tr = document.createElement("tr");
    $(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr")[20].after(tr);
    $(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr")[21].id = "AT";
    $('#AT').append("<td><div class=\"vu-mobile\">π</div><div class=\"vu-pc\">ArmΓ©e Totale</div></td><td id=\"TT\">π 0</td><td id=\"TD\">π 0</td><td id=\"TL\">π 0</td><td><div id=\"TG\">π 0</div></td>");
    document.getElementById('TT').innerHTML = "π " + calcTerrain().toString();
    document.getElementById('TD').innerHTML = "π " + calcDome().toString();
    document.getElementById('TL').innerHTML = "π " + calcLoge().toString();
    document.getElementById('TG').innerHTML = "π " + calcTotal().toString();
}

export default checkInit(['/armee'], [], totalArmee)