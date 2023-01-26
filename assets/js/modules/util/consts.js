//

class Consts {

    static Company = {
        NUMBER: '(253)-555-5555',
        EMAIL: 'perspectivemedia@email.com',
        WEBSITE: 'www.perspectivemedia.com',
        COPYRIGHT_YEAR: 2023,
    };

    static getPage(path) {
        return `${location.origin}/${path}`;
    }

    static getHomePage() {
        return Consts.getPage('index.html');
    }

    static getCopyrightHtml() {
        return `&copy; 
            <a href="${Consts.getPage('about.html')}">
                <span style="color:var(--perspective-clr-1);">${Consts.Company.COPYRIGHT_YEAR} <span style="color: var(--perspective-aclr-1);">Perspective</span> Media</span>
            </a>
        `;
    }

    static getFooterHtml() {
        return `<footer class="footer-section">
                <div class="bottom-nav">
                    <ul class="footer-nav">
                        <li><a id="facebook" href="#facebook"><img src="/assets/images/links/facebook-square.svg" alt="social media link"></a>
                        </li>
                        <li><a id="instagram" href="#instagram"><img src="/assets/images/links/instagram.svg" alt="social media link"></a></li>
                        <li><a id="twitter" href="#twitter"><img src="/assets/images/links/twitter-square.svg" alt="social media link"></a>
                        </li>
                        <li><a id="youtube" href="#youtube"><img src="/assets/images/links/youtube-square.svg" alt="social media link"></a>
                        </li>
                        <li><a id="github" href="#github"><img src="/assets/images/links/github-square.svg" alt="social media link"></a></li>
                    </ul>
                </div>
                <article class="contact-info">
                    <p class="about-us">&copy; <span class="date"> ${Consts.Company.COPYRIGHT_YEAR}</span>
                        <span class="company">Perspective</span> Media
                    </p>
                </article>
            </footer>`
    }
}

module.exports = Consts;