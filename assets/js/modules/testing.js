
function test_article(short, long, author) {
    return {
        _titleShort: short,
        _titleLong: long,
        _author: author
    };
}

const articles = [
    test_article('Hello World', 'Hello World from Digital Design', 'Marvis Knight'),
    test_article('SinSay', 'SinSay says Hello Expanded', 'SinSay'),
    test_article('Chappers for life!', 'Chappers program offers success in Digital Design', 'Chappy')
];



const list = document.querySelector('.left-side-panel');

function article_node(article, expanded) {
    const node = document.createElement('div');
    node.classList.add('article-item');
    if (expanded) {
        node.classList.add('expanded');
    }

    const text = document.createElement('p');

    const title = expanded ? article._titleLong : article._titleShort;

    node.innerHTML = `${title} by <b>${article._author}</b>`;
    node.appendChild(text);
    article._node = node;
    node._article = article;
    return node;
}
let expanded = true;
for (const article of articles) {
    list.appendChild(article_node(article, expanded));
    expanded = false;
}

function formatTitle(title, author) {
    return `${title} by <b>${author}</b>`;
}

//Below is a firefox / acceptable path type method
function getPath(node) {
    const path = [];
    for (let p = node; p !== null; p = p.parentElement) {
        path.push(p);
    }
    return path;
}

list.addEventListener('click', e => {
    const target = e.target;

    let element = target;

    if (element._article === undefined) {
        //Trace through the parents for the true article item
        const path = getPath(target);
        for (const elem of path) {
            if (elem._article !== undefined) {
                element = elem;
                break;
            }
        }
    }
    if (element._article !== undefined) {
        if (element.classList.contains('expanded')) {
            //Dont click already expanded.
            return;
        }
        const expanded = document.querySelector('.article-item.expanded');
        expanded.innerHTML = formatTitle(expanded._article._titleShort, expanded._article._author);
        expanded.classList.remove('expanded');
        element.innerHTML = formatTitle(element._article._titleLong, element._article._author);
        element.classList.add('expanded');

    }
});

