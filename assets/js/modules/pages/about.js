(function () {
    const Links = require('assets/js/modules/util/links.js');
    const Consts = require('assets/js/modules/util/consts.js');

    function toExpandedString(arr) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return '';
        }
        let result = '';
        for (const item of arr) {
            result += item;
        }
        return result;
    }
    function toHTML(card) {
        const node = document.createElement('div');
        node.classList.add('content-card');
        const links = Links.toHtml(card.links, Links.TYPES);

        node.innerHTML = `
            <div id="${card.id}">
                <div class="employee-intro">
                    <img src="${card.image}" id="img-employee" class="employee-img" alt="${card.name}">
                    <h3 class="employee-name">${card.name}</h3>
                    <p class="title">${card.title}</p>
                    <p>${card.company}</p>
                </div>
            </div>
            <div class="personal-links fa">
                ${links}
            </div>
            <div class="employee-info">
                <div><p class="mission-statement">${card.mission}</p></div>
                <div><p class="about-employee">${card.about}</p></div>
            </div>
        </div>`;
        return node;
    }

    function newCard(name, image, title, company, mission, about, links = {}) {
        const id = name.split(' ').join('_').toLowerCase();
        return {
            id,
            name,
            image,
            title,
            company,
            mission,
            about,
            links
        };
    }



    const cards = [
        newCard(
            'Marvis Knight',
            'assets/images/userImg.jpg',
            'CEO & Founder',
            'Perspective Media',
            'Our mission is to assist you in expressing your social message.',
            `The talents and skills we have individually and collectively are
            here to create for you.`,
            dict(
                Links.FACEBOOK, 'http://facebook.com/wherever',
                Links.EMAIL, `mailto:mknight@${Consts.getEmailSuffix()}`,
                // Links.PHONE, 'tel:555-555-5555'
            )
        ),
        newCard(
            'Melissa Knight',
            'assets/images/employee.jpg',
            'Vice President',
            'Perspective Media',
            'Our mission is to assist you in expressing your social message.',
            `The talents and skills we have individually and collectively are
            here to create for you.`,
            dict(

            )
        ),
        newCard(
            'P. N. Knight',
            'assets/images/item-4.jpg',
            'Graphic Designer',
            'Perspective Media',
            'Our mission is to assist you in expressing your social message.',
            `The talents and skills we have individually and collectively are
            here to create for you.`,
            dict(

            )
        ),
    ];

    const container = document.querySelector('#employee-cards');
    if (container === null) {
        throw new Error('Employee Card Injection Point is missing');
    }
    for (const card of cards) {
        container.appendChild(toHTML(card));
    }


})();