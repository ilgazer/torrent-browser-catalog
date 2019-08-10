'use strict';

function PageScript() {
    this.BASE_URL = "json";
    this.htmlCreator = new HtmlCreator();
    this.grid = document.getElementById("top-grid");

    fetch(this.BASE_URL + "/torrents")
        .then(resp => resp.json())
        .then(values => {
            console.log(values);
            values.forEach(value => {
                this.grid.innerHTML += this.htmlCreator.makeCard(value)
            });

            window.setInterval(this.refreshFolders.bind(this), 10000);
            this.refreshFolders();

            Array.from(document.getElementsByClassName("demo-card-square"))
                .forEach(card => {
                    console.log(card);
                    card.addEventListener('focusin', this.onCardFocused);
                    card.addEventListener('focusout', this.onCardBlurred)
                });
        });
}

PageScript.prototype.refreshFolders = function () {
    Array.from(document.getElementsByClassName("folders"))
        .forEach(val => {
            fetch(this.BASE_URL+"/torrent_files/"+val.id)
                .then(response=>response.json())
                .then(json=>{
                    console.log(json);
                    val.innerHTML=this.htmlCreator.makeFolders(json.result);
                })
        })
};

PageScript.prototype.onCardFocused = function () {
    this.classList.replace("mdl-cell--2-col", "mdl-cell--4-col")
};
PageScript.prototype.onCardBlurred = function () {
    this.classList.replace("mdl-cell--4-col", "mdl-cell--2-col")
};

window.onload = function () {
    window.PageScript = new PageScript();
};