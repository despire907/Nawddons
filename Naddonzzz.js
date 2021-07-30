'use strict';

var jq = jQuery.noConflict();

console.log(jq.fn.jQuery)

const allianceChat = () => {
    let msgDiv;
    let dom;

    const updateChat = () => {
        $.post('index.php?ajaxchatalliance',
            {
                Rafraichir : $(this).attr('name'),
                LastMessage : document.getElementById("LastMessage").value
            });
    }

    const getMessages = () => {
        jq.ajax({url: "https://www.natureatwar.fr/chatalliance",
            success: (data) => {
                dom = jq(data);
                const target = jq('#allianceMessages');
                dom.find('#messagess').each((idx, msg) => {
                    target.append(msg);
                }).css('padding-left', '2px');
                setInterval(updateChat, 10000);
            }
        });
    }

    const init = () => {

        const msgDivCSS = {
            'overflow-x': 'hidden',
            'background-color': 'khaki',
            right: '0px',
            position: 'fixed',
            'border-left': '2px black solid',
            'overflow-y': 'scroll',
            height: '100%',
            'background-image': 'none'
        };

        jq('.sideRight').before('<div id="allianceMessages"></div>').remove();
        msgDiv = jq("#allianceMessages").attr('class', 'sideRight');
        msgDiv.css(msgDivCSS);
        msgDiv.append('<h4 style="text-align: center;">Chat d\'alliance</h4><input type="text" id="messageInput"><div id="allianceMessages"></div>');
        getMessages();
        //jq('#messageInput').css({width: '99%', 'margin-left': '2px'}).keypress((e) => {
        //    if (e.keyCode === 13) {
        //        envoiChat();
        //    }
        //});
        setInterval(updateChat, 10000)
    }
    init();
}

allianceChat()