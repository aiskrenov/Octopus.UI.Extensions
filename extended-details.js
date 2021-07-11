const TeamCitySearchUrl = 'https://teamcity/searchResults.html?query=';
const GithubRepoTagUrl = 'https://github.com/repo/releases/tag/';
const GithubRepoCommitUrl = 'https://github.com/repo/commit/';

class ExtendedDetails {
    #containerClass = '';
    #detailClass = '';
    #rawDetails = '';
    #deployDate = '';

    #buildNumber = '';
    #buildType = '';
    #branchName = '';
    #commitHash = '';

    constructor(detailsContainer) {
        this.#containerClass = detailsContainer.className;
        this.#rawDetails = detailsContainer.childNodes[0].innerText;
        this.#detailClass = detailsContainer.childNodes[1].className;
        this.#deployDate = detailsContainer.childNodes[1].innerText;

        this.#buildNumber = this.extractDetail(this.#rawDetails, /([0-9]+\.[0-9]+\.[0-9]+)/);
        this.#buildType = this.extractDetail(this.#rawDetails, /(?<=[0-9]+\.[0-9]+\.[0-9]{3,}-)(rls|dev)/);
        this.#branchName = this.extractDetail(this.#rawDetails, /(?<=[0-9]+\.[0-9]+\.[0-9]{3,}-(rls|dev)-)(.*)(?=-[a-f|0-9]{7})/);
        this.#commitHash = this.extractDetail(this.#rawDetails, /([a-f|0-9]{7})$/);
    }

    buildDetails() {
        var container = this.buildDetailsContainer();

        container.appendChild(this.buildBuildNumber());
        container.appendChild(this.buildDeployDate());
        container.appendChild(this.buildBranchName());
        container.appendChild(this.buildCommitHash());

        return container;
    }

    buildDetailsContainer() {
        var container = document.createElement('div');
        container.className = this.#containerClass;
        container.style.lineHeight = 0;
        return container;
    }

    buildBuildNumber() {
        var detailText = 'Build: ' + this.#buildNumber + ' / ' + this.#buildType;
        var detailUrl = TeamCitySearchUrl + this.#buildNumber;

        return this.buildLinkDetail(detailText, detailUrl);
    }

    buildDeployDate() {
        return this.buildDetail(this.#deployDate);
    }

    buildBranchName() {
        var detailText = 'Branch: ' + this.#branchName;
        var detailUrl = GithubRepoTagUrl + this.#rawDetails;

        return this.buildLinkDetail(detailText, detailUrl);
    }

    buildCommitHash() {
        var detailText = 'Commit: ' + this.#commitHash;
        var detailUrl = GithubRepoCommitUrl + this.#commitHash;

        return this.buildLinkDetail(detailText, detailUrl);
    }

    buildLinkDetail(detailText, detailUrl) {
        var detail = document.createElement('span');
        detail.className = this.#detailClass;
        detail.setAttribute('title', detailText);

        var detailLink = document.createElement('a');
        var detailLinkText = document.createTextNode(detailText);
        detailLink.appendChild(detailLinkText);
        detailLink.title = detailText;
        detailLink.href = detailUrl;
        detailLink.target = '_blank';

        detail.appendChild(detailLink);

        return detail;
    }

    buildDetail(detailText) {
        var detail = document.createElement('span');
        detail.className = this.#detailClass;
        detail.setAttribute('title', detailText);
        detail.innerText = detailText;

        return detail;
    }

    extractDetail(text, regex) {
        var result = text.match(regex);

        if (result) {
            return result[0];
        }

        return '';
    }
}