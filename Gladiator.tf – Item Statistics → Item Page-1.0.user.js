// ==UserScript==
// @name         Gladiator.tf – Item Statistics → Item Page
// @namespace    gladiator-Item Statistics-Item
// @version      1.0
// @description  Allows you to click on the item name in the item statistics window to open the Items tab; additionally, Ctrl+click opens the backpack.tf page.
// @match        https://gladiator.tf/manage/*/statistics*
// @grant        none
// @author       mrTranzister+GPT
// ==/UserScript==

(function () {
    'use strict';

    const botMatch = location.pathname.match(/manage\/([^/]+)\/statistics/);
    if (!botMatch) return;
    const BOT_ID = botMatch[1];

    function linkItems() {
        const rows = document.querySelectorAll('#DataTables_Table_0 tbody tr');

        rows.forEach(row => {
            const cell = row.querySelector('td:first-child');
            if (!cell || cell.querySelector('a')) return;

            const itemName = cell.textContent.trim();
            if (!itemName) return;

            const gladiatorUrl = `/manage/${BOT_ID}/item/${encodeURIComponent(itemName)}`;
            const backpackUrl  = `https://gladiator.tf/bp/${encodeURIComponent(itemName)}`;

            const a = document.createElement('a');
            a.textContent = itemName;
            a.href = gladiatorUrl;


            a.style.color = 'inherit';
            a.style.textDecoration = 'none';
            a.style.cursor = 'pointer';

            a.addEventListener('mouseenter', () => {
                a.style.textDecoration = 'underline';
            });
            a.addEventListener('mouseleave', () => {
                a.style.textDecoration = 'none';
            });


            a.addEventListener('click', (e) => {
                e.preventDefault();

                if (e.ctrlKey) {
                    window.open(backpackUrl, '_blank');
                } else {
                    window.open(gladiatorUrl, '_blank');
                }
            });

            cell.textContent = '';
            cell.appendChild(a);
        });
    }

    const tbody = document.querySelector('#DataTables_Table_0 tbody');
    if (tbody) {
        new MutationObserver(linkItems).observe(tbody, {
            childList: true,
            subtree: true
        });
    }

    linkItems();
})();
