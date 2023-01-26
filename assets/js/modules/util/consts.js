//
const Links = require('assets/js/modules/util/links.js');
class Consts {

    static Company = {
        NUMBER: '(253)-555-5555',
        EMAIL: 'perspectivemedia@email.com',
        WEBSITE: 'www.perspectivemedia.com',
        COPYRIGHT_YEAR: 2023,
    };

    static getEmailHtml() {
        return `<a class="company-link" href="mailto:${Consts.Company.EMAIL}">${Consts.Company.EMAIL}</a>`;
    }


    static getPhoneHtml() {
        return `<a class="company-link" href="tel:${Consts.Company.NUMBER}">${Consts.Company.NUMBER}</a>`;
    }

    static getEmailSuffix() {
        return 'perspectivemedia.com';
    }

    static getPage(path) {
        return `${location.origin}/${path}`;
    }

    static getHomePage() {
        return Consts.getPage('index.html');
    }

    static getCopyrightHtml() {
        return `<span style="color:var(--perspective-clr-1);">&copy;
            <a class="company-link-invert2" href="${Consts.getPage('about.html')}">
                <span style="color:var(--perspective-clr-1);">${Consts.Company.COPYRIGHT_YEAR} <span style="color: var(--perspective-aclr-1);">Perspective</span> Media</span>
            </a>
        </span>`;
    }

    static getSiteNavHtml() {
        return `
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="blog.html">Blog</a>
            <a href="services.html">Services</a>
            <a id="register-button" href="registration.html">Register</a>
            <span id="login-btn" class="login">Login</span>
        `;
    }

    static newFooterLink(name, link) {
        return { name, link };
    }

    static FOOTER_LINKS = [
        Consts.newFooterLink(Links.FACEBOOK, '#facebook'),
        Consts.newFooterLink(Links.INSTAGRAM, '#instagram'),
        Consts.newFooterLink(Links.TWITTER, '#twitter'),
        Consts.newFooterLink(Links.YOUTUBE, '#youtube'),
        Consts.newFooterLink(Links.GITHUB, '#github'),
    ];

    static FOOTER_LINKS = dict(
        Links.FACEBOOK, '#facebook',
        Links.INSTAGRAM, '#instagram',
        Links.GITHUB, '#github',
        Links.TWITTER, '#twitter',
        Links.YOUTUBE, '#youtube',
    );

    static getFooterLinksHtml() {
        const names = Object.keys(Consts.FOOTER_LINKS);
        return Links.toHtml(this.FOOTER_LINKS, Links.getTypes(...names));
    }

    static getFooterHtml() {
        return `
        <footer class="footer-section">
            <div class="footer-links">
                ${Consts.getFooterLinksHtml()}
            </div>
            <div class="contact-info">
                ${Consts.getCopyrightHtml()}
            </div>
        </footer>`;
    }
}

module.exports = Consts;