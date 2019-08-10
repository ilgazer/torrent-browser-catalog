'use strict';

function PageScript() {
    console.log("asd");
    this.grid = document.getElementById("top-grid");
    this.http = new Http();
    window.addEventListener("click",this.contractAll);

    this.http.getTorrentList().then(values => {
        console.log(values);
        values.forEach(value => {
            let card = `
<div class="mdl-card mdl-shadow--2dp demo-card-square mdl-cell mdl-cell--2-col" tabindex="0">
        <figure class="mdl-card__media mdl-card--expand mdl-color--white">
            <img src="images/${value.img}" alt="${value.title}"/>
        </figure>
        <div class="folders mdl-card--expand">
            <div class='mdl-card__supporting-text '>
                <h4 class="folders-title">Files</h4>
                ${this.getFolderText(value.files_tree)}
            </div>
        </div>
        <div class="mdl-card__title mdl-color--primary-dark">
            <h2 class="mdl-card__title-text">${value.title}</h2>
        </div>
    </div>`;
            this.grid.innerHTML += card;
        });

        this.cards = document.getElementsByClassName("demo-card-square");
        Array.from(this.cards).forEach(card => {
            console.log(card);
            card.addEventListener('click', this.onCardClick, true);
        });
    });
}

PageScript.prototype.contractAll = function () {
    Array.from(document.getElementsByClassName("mdl-cell--4-col"))
        .forEach(element => element.classList.replace("mdl-cell--4-col", "mdl-cell--2-col"))
};
PageScript.prototype.onCardClick = function () {
    this.contractAll();
    console.log(this);
    this.classList.replace("mdl-cell--2-col", "mdl-cell--4-col")
};

PageScript.prototype.getFolderText = function (folder) {
    return `
<div class="folder">
    <i class="material-icons ${folder.isFile ? "hidden_icon" : ""}">folder</i>
    ${folder.isFile ? `<a href="torrents/${folder.path}">${folder.name}</a>` : folder.name}
    ${folder.children.length > 0 ?
        `<div class="subfolder">
            ${folder.children.map((file) => this.getFolderText(file)).reduce((a, b) => a + b)}
        </div>` : ""}
</div>`;
};

window.onload = function () {
    window.PageScript = new PageScript();
};