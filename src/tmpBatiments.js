import checkInit from "./checkInit";

const tmpBatiments = () => {

    function removeExtraSpace(str){
        str = str.replace(/[\s]{1,}/g,"");
        return str;
    }
    function decimaleFormat(nombre) {
	    if(nombre < 10) {
		    return '0' + nombre;
	    }
	    return nombre;
    }
    function timeFormat(second) {
        if(second != null) {
            if (second > 0) {
                let annee = Math.floor(second / 60 / 60 / 24 / 365);
                let jour = Math.floor(second / 60 / 60 / 24 % 365);
                let heure = Math.floor(second / 60 / 60 % 24);
                let minute = Math.floor(second / 60 % 60);
                let seconde = Math.floor(second % 60);
                let temps = "";
                if (Math.floor(annee) > 0) {
                    temps += decimaleFormat(Math.floor(annee)) + "A ";
                }
                if (Math.floor(jour) > 0) {
                    temps += decimaleFormat(Math.floor(jour)) + "J ";
                }
                if (Math.floor(heure) > 0) {
                    temps += decimaleFormat(Math.floor(heure)) + "h ";
                }
                if (Math.floor(minute) > 0) {
                    temps += decimaleFormat(Math.floor(minute)) + "m ";
                }
                if (Math.floor(seconde) > 0) {
                    temps += decimaleFormat(Math.floor(seconde)) + "s ";
                }
                return temps;
            }
        }
    }

    function _need(div) {
        needPomme = 0;
        needBois = 0;
        needEau = 0;
        for (let j = 0; j < div.children[0].children.length; j++) {
            switch (div.children[0].children[j].title) {
                case "Nourriture":
                    needPomme = removeExtraSpace(div.children[0].children[j + 1].innerText);
                    break;
                case "Bois":
                    needBois = removeExtraSpace(div.children[0].children[j + 1].innerText);
                    break;
                case "Eau":
                    needEau = removeExtraSpace(div.children[0].children[j + 1].innerText);
                    break;
                default:
                    break;
            }
        }
    }

    function putText(i, temps, color) {
        let span = document.createElement('span');
        let br = document.createElement('br');
        if (document.getElementById("myspan" + i.toString()) !== null) {
            document.getElementById("myspan" + i.toString()).innerText = "⏲️ " + temps;
            document.getElementById("myspan" + i.toString()).style.color = color;
        } else {
            span.id = "myspan" + i.toString();
            span.textContent = "⏲️ " + temps;
            span.style.color = color;
            document.getElementById("tempsUnite" + i.toString()).after(span);
            document.getElementById("tempsUnite" + i.toString()).after(br);
        }
    }

    function _display(i, ressourcePomme, ressourceBois, ressourceEau) {
        let temps;
        if (parseFloat(needPomme) > parseFloat(stockPomme) || parseFloat(needBois) > parseFloat(stockBois) || parseFloat(needEau) > parseFloat(stockEau)) {
            temps = "Stock up";
            putText(i, temps, "red");
        } else if (parseFloat(needPomme) < parseFloat(ressourcePomme) && parseFloat(needBois) < parseFloat(ressourceBois) && parseFloat(needEau) < parseFloat(ressourceEau)) {
            temps = "Good";
            putText(i, temps, "green");
        } else {
            if (timePomme > timeBois && timePomme > timeEau) {
                temps = timeFormat(timePomme);
                putText(i, temps, "chocolate");
            } else if (timeBois > timePomme && timeBois > timeEau) {
                temps = timeFormat(timeBois);
                putText(i, temps, "chocolate");
            } else if (timeEau > timePomme && timeEau > timeBois) {
                temps = timeFormat(timeEau);
                putText(i, temps, "chocolate");
            }
        }
    }

    function _calc(ressourcePomme, ressourceBois, ressourceEau) {
        timePomme = 0;
        timeBois = 0;
        timeEau = 0;
        if (needPomme !== 0) {
            timePomme = ((parseFloat(needPomme) - parseFloat(ressourcePomme)) / parseFloat(gainPommeSec));
        } if (needBois !== 0) {
            timeBois = ((parseFloat(needBois) - parseFloat(ressourceBois)) / parseFloat(gainBoisSec));
        } if (needEau !== 0) {
            timeEau = ((parseFloat(needEau) - parseFloat(ressourceEau)) / parseFloat(gainEauSec));
        }
    }

    function loop() {
        let ressourcePomme = removeExtraSpace(document.getElementsByName("dynamise3")[0].innerHTML);
        let ressourceBois = removeExtraSpace(document.getElementsByName("dynamise4")[0].innerHTML);
        let ressourceEau = removeExtraSpace(document.getElementsByName("dynamise5")[0].innerHTML);
        let div;
        let i = 0;
        while (i < 19) {
            div = document.getElementById("sectionUniteCout" + i.toString());
            if (div !== null) {
                _need(div);
                _calc(ressourcePomme, ressourceBois, ressourceEau);
                if (timePomme !== 0 || timeBois !== 0 || timeEau !== 0) {
                    _display(i, ressourcePomme, ressourceBois, ressourceEau);
                }
            }
            i += 1;
        }
        setTimeout(loop, 1000);
    }

    let script = document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1].innerHTML;
    let tabScript = script.replace(/\n|\r| /g, "").split(/;|=/);
    let needPomme = 0;
    let needBois = 0;
    let needEau = 0;
    let timePomme = 0;
    let timeBois = 0;
    let timeEau = 0;
    let gainPommeSec = tabScript[1];
    let gainBoisSec = tabScript[3];
    let gainEauSec = tabScript[5];
    let stockPomme = tabScript[7];
    let stockBois = tabScript[9];
    let stockEau = tabScript[11];
    loop();
}

export default checkInit(['/installations', '/recherches', '/ressources'], [], tmpBatiments);