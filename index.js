import chatAlliance from "./src/chatAlliance";
import convoiMembre from "./src/convoiMembre";
import maxOuvri from "./src/maxOuvri";
import totalArmee from "./src/totalArmee";
import tmpBatiments from "./src/tmpBatiments";
import copyFlood from "./src/copyFlood";
import ressourcesTime from "./src/ressourcesTime"
import boxAlliance from "./src/boxAlliance"

chatAlliance();
convoiMembre();
maxOuvri();
totalArmee();
tmpBatiments();
copyFlood();
ressourcesTime();
boxAlliance();

function actualiseFromTime(box) {
    const askTime = $(`#timer${box}`).val();
    const unitTime = $(`#tempsUnite${box}`).text();

    console.log(askTime);
    console.log(unitTime);
}

$("#apple1").on("change keyup paste", function(){
    console.log("Ouvri : modif nb pommes");
})

$("#timer1").on("change keyup paste", function(){
    console.log("Ouvri : modif timer");
    actualiseFromTime(1);
})

$("#pondreUnite1").on("change keyup paste", function(){
    console.log("Ouvri : modif nb to craft");
})