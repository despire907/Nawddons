'use strict';

var jq = jQuery.noConflict();

const totalArme = () => {
    const calcTerrain = () => {
        var result = 0;
        let i = 6;
        while(i < 72) {
            result += Number(jq(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
            i += 5;
        }
        return result;
    }

    const calcDome = () => {
        var result = 0;
        let i = 7;
        while(i < 73) {
            result += Number(jq(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
            i += 5;
        }
        return result;
    }

    const calcLoge = () => {
        var result = 0;
        let i = 8;
        while(i < 74) {
            result += Number(jq(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
            i += 5;
        }
        return result;
    }

    const calcTotal = () => {
        var result = 0;
        let i = 9;
        while(i < 75) {
            result += Number(jq(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr").children("td")[i].innerText.replace(/\s/g, ''));
            i += 5;
        }
        return result;
    }

    const init = () => {
        let tr = document.createElement("tr");
        jq(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr")[20].after(tr);
        jq(".table-striped.col-xs-12.col-sm-12.col-md-12.col-lg-12").children("tbody").children("tr")[21].id = "AT";
        jq('#AT').append("<td><div class=\"vu-mobile\">🐜</div><div class=\"vu-pc\">Armée Totale</div></td><td id=\"TT\">🐜 0</td><td id=\"TD\">🐜 0</td><td id=\"TL\">🐜 0</td><td><div id=\"TG\">🐜 0</div></td>");
        document.getElementById('TT').innerHTML = "🐜 " + calcTerrain().toString();
        document.getElementById('TD').innerHTML = "🐜 " + calcDome().toString();
        document.getElementById('TL').innerHTML = "🐜 " + calcLoge().toString();
        document.getElementById('TG').innerHTML = "🐜 " + calcTotal().toString();
    }
    init();
}

const allianceChat = () => {
    let msgDiv;
    let dom;

    const getMessages = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const parser = new DOMParser();

        fetch("https://www.natureatwar.fr/chatalliance", requestOptions)
            .then(response => response.text())
            .then(result => {
                const par = parser.parseFromString(result, "text/html");
                const target = jQuery('#allianceMessagess');
                target.append(par.getElementsByClassName("cadreTresGrand"));
                document.getElementById("allianceMessagess").children[0].classList.remove("cadreTresGrand");
                target.append("<script>var activite_detectee = false;var intervalle = 10000;var temps_inactivite = 0;var inactivite_persistante = true;var lastExec = 0;function testActivite() {if(activite_detectee) {activite_detectee = false;temps_inactivite = 0;inactivite_persistante = false;}else {if(inactivite_persistante) {temps_inactivite += intervalle;if(temps_inactivite >= 600000){document.getElementById(\"actualiser_auto\").checked = false;document.getElementById(\"Rafraichir\").style.display = \"inline-block\";}}else{inactivite_persistante = true;}}setTimeout('testActivite();', intervalle);}function switchButtonRefresh(){if(document.getElementById(\"actualiser_auto\").checked){document.getElementById(\"Rafraichir\").style.display = \"none\";}else{document.getElementById(\"Rafraichir\").style.display = \"inline-block\";}}$(function() {document.getElementById(\"comment\").focus();testActivite();});$(document).ready(function() { $(\"#comment\").keypress(function (e) {if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {creerMessage ();return false;}});});function actualiserChat (type = 1){if(document.getElementById(\"actualiser_auto\").checked | type == 2){$.post('index.php?ajaxchatalliance',{Rafraichir : $(this).attr('name'),LastMessage : document.getElementById(\"LastMessage\").value},function(data, status){var obj = jQuery.parseJSON(data);if(document.getElementById(\"LastMessage\").value < obj.LastMessage){document.getElementById(\"messagess\").insertAdjacentHTML('afterbegin', obj.courant);if(obj.LastMessage != \"\"){document.getElementById(\"LastMessage\").value = obj.LastMessage;}}});}}setInterval(actualiserChat, 2000);$(document).on(\"click\",\".Envois\",creerMessage);function creerMessage (){$.post('index.php?ajaxchatalliance',{envois : $(this).attr('name'),textChat : $( '.commenter').val(),LastMessage : document.getElementById(\"LastMessage\").value},function(data, status){var obj = jQuery.parseJSON(data);$('.commenter').val('');timeExec = Date.now();if(timeExec - lastExec > 500){lastExec = timeExec;actualiserChat(2);}});}$(document).on(\"click\",\".EnvoyerSignalement\",EnvoyerSignalement);function EnvoyerSignalement(){$.post('index.php?ajaxchat',{EnvoyerSignalement : $(this).attr('name'),raison : $( '.raison').val(),question : $( '.question').val(),idAjax : $( '.IdAjax').val()},function(data, status){var obj = jQuery.parseJSON(data);});}</script>");
            })
            .catch(error => console.log('error', error));
    }

    const init = () => {

        const msgDivCSS = {
            'overflow-x': 'hidden',
            'background-color': 'khaki',
            width: '350px',
            right: '0px',
            position: 'fixed',
            'border-left': '2px black solid',
            height: '100%',
            'background-image': 'none',
            'font-height': 'none',
            'overflow-y': 'scroll',
            'padding-top': '0px'
        };

        jq('.sideRight').before('<div id="allianceMessages"></div>').remove();
        msgDiv = jq("#allianceMessages").attr('class', 'sideRight');
        msgDiv.css(msgDivCSS);
        msgDiv.append('<div id="allianceMessagess"></div>');
        getMessages();
    }
    init();
}

if ((window.location.pathname !== "/chatalliance" && window.location.pathname !== "/chatgeneral" && window.location.pathname !== "/armee") || window.location.search.length > 0) {
    allianceChat();
} else if (window.location.pathname === "/armee" || window.location.search.length > 0) {
    allianceChat();
    totalArme();
}