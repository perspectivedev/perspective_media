//

class Consts {

    static Company = {
        NUMBER: '(253)-555-5555',
        EMAIL: 'perspectivemedia@email.com',
        WEBSITE: 'www.perspectivemedia.com',
        COPYRIGHT_YEAR: 2023,
    };

    static getHomePage() {
        return `${location.origin}/index.html`;
    }

    static getCopyrightHtml() {
        return `&copy; 
            <span class="date"> ${Consts.Company.COPYRIGHT_YEAR}</span> 
            <a href="${Consts.getHomePage()}">
                <span style="color:var(--perspective-clr-1);"><span style="color: var(--perspective-aclr-1);">Perspective</span> Media</span>
            </a>
        `;
    }
}

module.exports = Consts;