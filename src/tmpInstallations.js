import checkInit from "./checkInit";

const tmpInstallations = () => {
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
    function tmp() {
        let ressourcePomme = removeExtraSpace(document.getElementsByName("dynamise3")[0].innerHTML);
        let ressourceBois = removeExtraSpace(document.getElementsByName("dynamise4")[0].innerHTML);
        let ressourceEau = removeExtraSpace(document.getElementsByName("dynamise5")[0].innerHTML);
        let span = document.createElement('span');
        let br = document.createElement('br');
        let temps = 0;
        let i = 7;
        while(i < 19) {
            needPomme = 0;
            needBois = 0;
            needEau = 0;
            if (document.getElementById("sectionUniteCout" + i.toString()).children[0].children[0].title === "Nourriture" && document.getElementById("sectionUniteCout" + i.toString()).children[0].children[4].title === "Bois" && document.getElementById("sectionUniteCout" + i.toString()).children[0].children[8].title === "Eau") {
                needPomme = removeExtraSpace(document.getElementById("sectionUniteCout" + i.toString()).children[0].children[1].innerText);
                needBois = removeExtraSpace(document.getElementById("sectionUniteCout" + i.toString()).children[0].children[5].innerText);
                needEau = removeExtraSpace(document.getElementById("sectionUniteCout" + i.toString()).children[0].children[9].innerText);
                if (parseFloat(needPomme) > parseFloat(stockPomme) || parseFloat(needBois) > parseFloat(stockBois) || parseFloat(needEau) > parseFloat(stockEau)) {
                    if (document.getElementById("myspan" + i.toString()) !== null) {
                        document.getElementById("myspan" + i.toString()).innerText = "⏲️ Améliore le stock";
                    } else {
                        span.id = "myspan" + i.toString();
                        span.textContent = "⏲️ Améliore le stock";
                        document.getElementById("tempsUnite" + i.toString()).after(span);
                        document.getElementById("tempsUnite" + i.toString()).after(br);
                    }
                } else if (parseFloat(needPomme) < parseFloat(ressourcePomme) && parseFloat(needBois) < parseFloat(ressourceBois) && parseFloat(needEau) < parseFloat(ressourceEau)) {
                    if (document.getElementById("myspan" + i.toString()) !== null) {
                        document.getElementById("myspan" + i.toString()).innerText = "⏲️ Tu peux améliorer";
                    } else {
                        span.id = "myspan" + i.toString();
                        span.textContent = "⏲️ Tu peux améliorer";
                        document.getElementById("tempsUnite" + i.toString()).after(span);
                        document.getElementById("tempsUnite" + i.toString()).after(br);
                    }
                } else {
                    timePomme = ((parseFloat(needPomme) - parseFloat(ressourcePomme)) / parseFloat(gainPommeSec));
                    timeBois = ((parseFloat(needBois) - parseFloat(ressourceBois)) / parseFloat(gainBoisSec));
                    timeEau = ((parseFloat(needEau) - parseFloat(ressourceEau)) / parseFloat(gainEauSec));
                    if (timePomme > timeBois && timePomme > timeEau) {
                        temps = timeFormat(timePomme);
                        if (document.getElementById("myspan" + i.toString()) !== null) {
                            document.getElementById("myspan" + i.toString()).innerText = "⏲️ " + temps;
                        } else {
                            span.id = "myspan" + i.toString();
                            span.textContent = "⏲️ " + temps;
                            document.getElementById("tempsUnite" + i.toString()).after(span);
                            document.getElementById("tempsUnite" + i.toString()).after(br);
                        }
                        temps = 0;
                    } else if (timeBois > timePomme && timeBois > timeEau) {
                        temps = timeFormat(timeBois);
                        if (document.getElementById("myspan" + i.toString()) !== null) {
                            document.getElementById("myspan" + i.toString()).innerText = "⏲️ " + temps;
                        } else {
                            span.id = "myspan" + i.toString();
                            span.textContent = "⏲️ " + temps;
                            document.getElementById("tempsUnite" + i.toString()).after(span);
                            document.getElementById("tempsUnite" + i.toString()).after(br);
                        }
                        temps = 0;
                    } else if (timeEau > timePomme && timeEau > timeBois) {
                        let temps = timeFormat(timeEau);
                        if (document.getElementById("myspan" + i.toString()) !== null) {
                            document.getElementById("myspan" + i.toString()).innerText = "⏲️ " + temps;
                        } else {
                            span.id = "myspan" + i.toString();
                            span.textContent = "⏲️ " + temps;
                            document.getElementById("tempsUnite" + i.toString()).after(span);
                            document.getElementById("tempsUnite" + i.toString()).after(br);
                        }
                        temps = 0;
                    }
                }
            } else if (document.getElementById("sectionUniteCout" + i.toString()).children[0].children[0].title === "Bois") {
                needBois = removeExtraSpace(document.getElementById("sectionUniteCout" + i.toString()).children[0].children[1].innerText);
                if (parseFloat(needBois) > parseFloat(stockBois)) {
                    if (document.getElementById("myspan" + i.toString()) !== null) {
                        document.getElementById("myspan" + i.toString()).innerText = "⏲️ Améliore le stock";
                    } else {
                        span.id = "myspan" + i.toString();
                        span.textContent = "⏲️ Améliore le stock";
                        document.getElementById("tempsUnite" + i.toString()).after(span);
                        document.getElementById("tempsUnite" + i.toString()).after(br);
                    }
                } else if (parseFloat(needBois) < parseFloat(ressourceBois)) {
                    if (document.getElementById("myspan" + i.toString()) !== null) {
                        document.getElementById("myspan" + i.toString()).innerText = "⏲️ Tu peux améliorer";
                    } else {
                        span.id = "myspan" + i.toString();
                        span.textContent = "⏲️ Tu peux améliorer";
                        document.getElementById("tempsUnite" + i.toString()).after(span);
                        document.getElementById("tempsUnite" + i.toString()).after(br);
                    }
                } else {
                    timeBois = ((parseFloat(needBois) - parseFloat(ressourceBois)) / parseFloat(gainBoisSec));
                    temps = timeFormat(timeBois);
                    if (document.getElementById("myspan" + i.toString()) !== null) {
                        document.getElementById("myspan" + i.toString()).innerText = "⏲️ " + temps;
                    } else {
                        span.id = "myspan" + i.toString();
                        span.textContent = "⏲️ " + temps;
                        document.getElementById("tempsUnite" + i.toString()).after(span);
                        document.getElementById("tempsUnite" + i.toString()).after(br);
                    }
                    temps = 0;
                }
            }
            if (i === 9) {
                i = 12;
            } else if (i === 14) {
                i = 17;
            } else {
                i += 1;
            }
        }
        setTimeout(tmpInstallations, 1000);
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
    tmp();
}

tmpInstallations();

export default checkInit(['/installations'], [], );