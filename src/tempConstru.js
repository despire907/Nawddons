import $ from 'jquery';
import checkInit from "./checkInit";

const tmpConstru = () => {
    function removeExtraSpace(str){
        str = str.replace(/[\s]{1,}/g,"");
        return str;
    }

    function tmpRessources() {
        if (window.location.pathname === "/ressources") {
            let i = 1;
            while(i < 7) {
                needPomme = 0;
                needBois = 0;
                needEau = 0;
                if (document.getElementById("sectionUniteCout" + i.toString()).children[0].children[0].title === "Nourriture" && document.getElementById("sectionUniteCout" + i.toString()).children[0].children[4].title === "Bois" && document.getElementById("sectionUniteCout" + i.toString()).children[0].children[8].title === "Eau") {
                    needPomme = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[1].innerText;
                    needBois = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[5].innerText;
                    needEau = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[9].innerText;
                    console.log("needPomme " + i.toString() + ": " + needPomme);
                    console.log("needBois " + i.toString() + ": " + needBois);
                    console.log("needEau " + i.toString() + ": " + needEau);
                } else if (document.getElementById("sectionUniteCout" + i.toString()).children[0].children[0].title === "Bois" && document.getElementById("sectionUniteCout" + i.toString()).children[0].children[4].title === "Eau") {
                    needBois = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[1].innerText;
                    needEau = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[5].innerText;
                    console.log("needBois " + i.toString() + ": " + needBois);
                    console.log("needEau " + i.toString() + ": " + needEau);
                } else if (document.getElementById("sectionUniteCout" + i.toString()).children[0].children[0].title === "Bois") {
                    needBois = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[1].innerText;
                    console.log("needBois " + i.toString() + ": " + needBois);
                }
                i += 1;
            }
        }
    }

    function tmpInstallations() {
        if (window.location.pathname === "/installations") {
            let i = 7;
            while(i < 19) {
                needPomme = 0;
                needBois = 0;
                needEau = 0;
                if (document.getElementById("sectionUniteCout" + i.toString()).children[0].children[0].title === "Nourriture" && document.getElementById("sectionUniteCout" + i.toString()).children[0].children[4].title === "Bois" && document.getElementById("sectionUniteCout" + i.toString()).children[0].children[8].title === "Eau") {
                    needPomme = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[1].innerText;
                    needBois = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[5].innerText;
                    needEau = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[9].innerText;
                    console.log("needPomme " + i.toString() + ": " + needPomme);
                    console.log("needBois " + i.toString() + ": " + needBois);
                    console.log("needEau " + i.toString() + ": " + needEau);
                }else if (document.getElementById("sectionUniteCout" + i.toString()).children[0].children[0].title === "Bois") {
                    needBois = document.getElementById("sectionUniteCout" + i.toString()).children[0].children[1].innerText;
                    console.log("needBois " + i.toString() + ": " + needBois);
                }
                if (i === 9) {
                    i = 12;
                } else if (i === 14) {
                    i = 17;
                }
                i += 1;
            }
        }
    }

    let script = document.getElementsByTagName("script")[document.getElementsByTagName("script").length - 1].innerHTML;
    let tabScript = script.replace(/\n|\r| /g, "").split(/;|=/);
    let needPomme = 0;
    let needBois = 0;
    let needEau = 0;
    let gainPommeSec = tabScript[1];
    let gainBoisSec = tabScript[3];
    let gainEauSec = tabScript[5];
    let stockPomme = tabScript[7];
    let stockBois = tabScript[9];
    let stockEau = tabScript[11];
    let ressourcePomme = removeExtraSpace(document.getElementsByName("dynamise3")[0].innerHTML);
    let ressourceBois = removeExtraSpace(document.getElementsByName("dynamise4")[0].innerHTML);
    let ressourceEau = removeExtraSpace(document.getElementsByName("dynamise5")[0].innerHTML);
    console.log(tabScript);
    tmpRessources();
    tmpInstallations();
}

tmpConstru();

export default checkInit(['/ressources', '/installations', '/recherches'], [], );