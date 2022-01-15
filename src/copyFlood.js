import checkInit from "./checkInit";

const copyFunctions = {
    'Convois ouvrière': tr => `${tr.children[0].innerText}`,
    'Attaquer Terrain': tr => `${tr.children[3].children[0].innerText}\n${tr.children[0].innerText}`,
    'Chasser' : tr => `${tr.children[0].innerText}\n${tr.children[1].innerText}`
};

const copyFlood = () => {
    $('#sectionArmee tbody').children().each((idx, tr) => {
        if (idx === 0) {
            $(tr).append('<td></td>');
        } else {
            const btnId = `copy${idx}`;
            $(tr).append(`<td><button id="${btnId}">Copier</button></td>`);
            $(`#${btnId}`).click(() => {
                const type = tr.children[1].innerText.split(' -- ')[0];
                var content;
                if (type.substr(0, 7) === "Chasser")
                    content = [new ClipboardItem({"text/plain": new Blob([copyFunctions['Chasser'](tr)], {type: "text/plain"})})];
                else
                    content = [new ClipboardItem({"text/plain": new Blob([copyFunctions[type](tr)], {type: "text/plain"})})];
                navigator.clipboard.write(content);
            });
        }
    });
}

export default checkInit([], [], copyFlood)