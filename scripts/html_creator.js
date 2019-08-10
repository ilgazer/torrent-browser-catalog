function HtmlCreator() {
    const getProgressColor = function (a) {
        let r = Math.floor(a * 117 + (1 - a) * 255),
            g = Math.floor(a * 117 + (1 - a) * 15),
            b = Math.floor(a * 117 + (1 - a) * 15);
        return "#" +
            ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2);
    };

    const getFileLink = function (folder) {
        if (folder.isFile && folder.progress === 1) {
            return `<a href="torrents/${folder.path}">${folder.name}</a>`
        } else {
            return folder.name;
        }
    };

    const getSubfolder = function (folder) {
        if (folder.children.length > 0) {
            return `<div class="subfolder">
                ${folder.children.map((file) => getFolderDiv(file)).reduce((a, b) => a + b)}
            </div>`;
        } else {
            return "";
        }
    };

    const getFolderDiv = function (folder) {
        return `<div class="folder" style="color:${getProgressColor(folder.progress)}">
            <i class="material-icons ${folder.isFile ? "hidden_icon" : ""}">folder</i>
            ${getFileLink(folder)}
            ${getSubfolder(folder)}
        </div>`;
    };

    const makeCard = value => {
        return `
<div class="mdl-card mdl-shadow--2dp demo-card-square mdl-cell mdl-cell--2-col" tabindex="0">
        <figure class="mdl-card__media mdl-card--expand mdl-color--white">
            <img src="images/${value.img}" alt="${value.title}"/>
        </figure>
        <div class="folder-container mdl-card--expand mdl-card__supporting-text">
            <h4 class="folders-title">Files</h4>
            <div class="folders" id=${value.info_hash}></div>
        </div>
        <div class="mdl-card__title mdl-color--primary-dark">
            <h2 class="mdl-card__title-text">${value.title}</h2>
        </div>
    </div>`;
    };


    return {
        makeCard: makeCard,
        makeFolders: getFolderDiv
    }
}