// ==UserScript==
// @name         Twitch Auto Export
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to make life simpler
// @author       MTG
// @match        https://dashboard.twitch.tv/u/*/content/video-producer
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        none
// ==/UserScript==

(function() {
    //Date of export
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
    const today = `${day}/${month}/${year}`;

    setTimeout(function() {
        const firstVideo = document.querySelector('.Layout-sc-1xcs6mc-0.iqUbUe');

        if (firstVideo) {
            const publishDateElement = firstVideo.querySelector('[data-test-selector="video-card-publish-date-selector"]');
            const publishDateText = publishDateElement ? publishDateElement.textContent.trim() : '';
            //Optional for title (formats to DD/MM) for easier titles
            const publishDate = new Date(publishDateText);
            const formattedDate = publishDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
            console.log(formattedDate);
            var title = `Tampermonkey Script export (${today}) \nDate of Stream ${formattedDate}`;

            const toggleButton = firstVideo.querySelector('button[data-a-target="video-card-menu-toggle-button"]');

            if (toggleButton) {
                toggleButton.click();

                setTimeout(function() {
                    const exportButton = document.querySelector('button[data-test-selector="video-card-main-menu-export"]');

                    if (exportButton) {
                        exportButton.click();

                        setTimeout(function() {
                            const descriptionInput = document.getElementById('ye-description');

                            if (descriptionInput) {
                                descriptionInput.value = title;
                            } else {
                                console.error("Description input not found");
                            }
                        }, 1000);
                    } else {
                        console.error("Export Button not found within the dropdown");
                    }
                }, 1000);
            } else {
                console.error("Toggle Button not found within the video");
            }
        } else {
            console.error("Video not found");
        }
    }, 5000);
})();