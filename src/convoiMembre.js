import checkInit from "./checkInit";
import { getActualTdc, formatNumberFromHtml, getUsername } from './utils';

function convoiMembre() {
    const nodes = document.querySelectorAll('.cadreDescription table tbody tr');
    const actualTdc = getActualTdc();

    nodes.forEach((tr, idx) => {
        if (idx && tr.children[2].querySelector('b').innerText !== getUsername()) {
            const tdc = formatNumberFromHtml(tr.children[0].innerText);
            const b = tr.children[3].querySelector('b')
            const a = b.querySelector('a');
            const name = a.querySelector('b').innerHTML;
            const atk = a.getAttribute('href');
            const convoi = atk.replace('attaques', 'convois');

            let html = name;
            if (tdc * 2 >= actualTdc) {
                html += `  <a href="${atk}">⚔️</a>`;
            }
            html += `  <a href="${convoi}">🍎</a>`;
            b.innerHTML = html;
        }
    });
}

export default checkInit(['/membre'], [], convoiMembre);
