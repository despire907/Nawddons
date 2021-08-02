import checkInit from "./checkInit";

function convoiMembre() {
    const nodes = document.querySelectorAll('.cadreDescription table tbody tr');

    nodes.forEach((tr, idx) => {
        if (idx) {
            const b = tr.children[3].querySelector('b')
            const a = b.querySelector('a');
            const name = a.querySelector('b').innerHTML;
            const atk = a.getAttribute('href');
            const convoi = atk.replace('attaques', 'convois');

            b.innerHTML = (`${name}  <a href="${atk}">⚔️</a>  <a href="${convoi}">🍎</a>`);
        }
    });
}

export default checkInit(['/membre'], [], convoiMembre);