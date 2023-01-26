(function () {
    function toHTML(card) {
        const node = document.createElement('div');
        node.classList.add('content-card');
        node.innerHTML = `
            <div id="${card.nid}">
                <div class="employee-intro">
                    <img src="${card.image}" id="img-employee" class="employee-img" alt="${card.name}">
                    <h3 class="employee-name">${card.name}</h3>
                    <p class="title">${card.title}</p>
                    <p>${card.company}</p>
                </div>
            </div>
            <div class="personal-links">
                <div class="fab">
                    <a href="${card.links.facebook}"><span class="link-facebook fa-facebook-square"></span></a>
                    <a href="${card.links.messenger}"><span class="link-messenger fa-facebook-messenger"></span></a>
                    <a href="${card.links.linkedin}"><span class="link-linkedin fa-linkedin"></span></a>
                    <a href="${card.links.github}"><span class="link-github fa-github-square"></span></a>
                    <a href="${card.links.instagram}"><span class="link-instagram fa-instagram-square"></span></a>
                    <a href="${card.links.youtube}"><span class="link-youtube fa-youtube-square"></span></a>
                    <a href="${card.links.twitter}"><span class="link-twitter fa-twitter-square"></span></a>
                </div>
            </div>
            <div class="employee-info">
                <div><p class="mission-statement">${card.mission}</p></div>
                <div><p class="about-employee">${card.about}</p></div>
            </div>
        </div>`;

        return node;
    }

    function newLinks(_default, fb, msg, inst, linked, git, yt) {
        const get = (arg) => {
            return arg === null || arg === undefined ? _default : arg;
        };
        return {
            facebook: get(fb),
            messenger: get(msg),
            instagram: get(inst),
            linkedin: get(linked),
            github: get(git),
            youtube: get(yt)
        };
    }

    function newCard(name, image, title, company, mission, about, links = null) {
        const nid = name.split(' ').join('_').toLowerCase();
        if (links === null) {
            links = newLinks('#', nid);
        }
        return {
            nid: nid,
            name: name,
            image: image,
            title: title,
            company: company,
            mission: mission,
            about: about,
            links: links
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
            here to create for you.`
        ),
        newCard(
            'Melissa Knight',
            'assets/images/employee.jpg',
            'Vice President',
            'Perspective Media',
            'Our mission is to assist you in expressing your social message.',
            `The talents and skills we have individually and collectively are
            here to create for you.`
        ),
        newCard(
            'P. N. Knight',
            'assets/images/item-4.jpg',
            'Graphic Designer',
            'Perspective Media',
            'Our mission is to assist you in expressing your social message.',
            `The talents and skills we have individually and collectively are
            here to create for you.`
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