class Links {
    static FACEBOOK = 'facebook';
    static MESSENGER = 'messenger';
    static LINKEDIN = 'linkedin';
    static GITHUB = 'github';
    static INSTAGRAM = 'instagram';
    static YOUTUBE = 'youtube';
    static TWITTER = 'twitter';

    // Optional
    static EMAIL = 'email';
    static PHONE = 'phone';

    // Others
    static TELEGRAM = 'telegram';

    static SPEC_ICONS = dict(
        Links.MESSENGER, `${Links.FACEBOOK}-${Links.MESSENGER}`,
        Links.EMAIL, 'envelope',
        Links.LINKEDIN, `${Links.LINKEDIN}-in`,
        Links.TELEGRAM, `${Links.TELEGRAM}-plane`,
    );

    static TYPES = [
        Links.newType(Links.FACEBOOK),
        Links.newType(Links.MESSENGER),
        Links.newType(Links.LINKEDIN),
        Links.newType(Links.GITHUB),
        Links.newType(Links.INSTAGRAM),
        Links.newType(Links.YOUTUBE),
        Links.newType(Links.TWITTER),
        //Optional
        Links.newType(Links.EMAIL, true),
        Links.newType(Links.PHONE, true),
        Links.newType(Links.TELEGRAM, true),
    ];

    static TYPES_MAP = ((types) => {
        const map = {};
        for (const type of types) {
            map[type.name] = type;
        }
        return map;
    })(Links.TYPES);

    static getTypes(...names) {
        if (names.length === 0) {
            return [];
        }
        const types = [];
        if (names.length === 0) {
            return types;
        }
        for (const name of names) {
            if (typeof name !== 'string') {
                throw new Error('Type Name cannot be anything but a string');
            }
            const type = Links.TYPES_MAP[name];
            if (type === undefined) {
                throw new Error(`Type ${name} is undefined!`);
            }
            types.push(type);
        }
        return types;
    }

    static toHtml(links, types) {
        return types.map(type => {
            const link = links[type.name];
            const hasType = link !== undefined;
            if (!hasType && type.optional) {
                return '';
            }
            if (hasType) {
                return `<a href="${link}"><span class="link-${type.name} ${type.clazz}"></span></a>`;
            }
            return `<span class="disabled-link link-${type.name} ${type.clazz}"></span>`;
        }).join('');
    }

    static getIcon(name) {
        return `fa-${name}`;
    }

    static newType(name, optional = false) {
        const spec = Links.SPEC_ICONS[name];
        const clazz = `fa-${spec === undefined ? name : spec}`;
        return { name, clazz, optional };
    }
}
module.exports = Links;