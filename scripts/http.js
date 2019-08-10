function Http() {
    this.BASE_URL = "http://192.168.0.26/gallery/json"
}

Http.prototype.getTorrentList = function () {
    return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const torrentList = JSON.parse(this.responseText);
                        resolve(torrentList);
                    } else {
                        reject(`Failed with and HTTP status ${this.status}`);
                    }
                }
            };
            xmlhttp.open("GET", this.BASE_URL + "/torrents", true);
            xmlhttp.send();
        }
    )
}