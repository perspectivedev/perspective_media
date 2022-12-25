

const {
  Widget,
} = require('assets/js/modules/widget.js');

const body = Widget.getBody();


{
  // widget container
  const container = Widget.div('widget-wrapper');



  // widget header
  const headerSection = Widget.div('header-section');


  const header = Widget.div('header-widget');
  header.setInnerHtml(`
  <h1 class="title">Hello World</h1>
  <p class="close-widget">&times;</p>
  `);
  headerSection.addChild(header);

  container.addChild(headerSection);



  // widget body
  const mainSection = Widget.div('widget-main-section');
  const main = new Widget('main', 'main-widget');
  mainSection.addChild(main);//This is fine

  main.addChild('p', 'content-widget');
  main.setText('This is simply a bit of dummy text to hold this place and...')

  const fname = new Widget('input', 'first-name');
  fname.setAttr('id')

  // main.setInnerHtml(`      
  // <p id="widget-content" class="content-widget">Lorem ipsum dolor,
  //     sit amet consectetur adipisicing elit. Vitae ab ut minus esse, nulla dolorem earum temporibus dolor!
  //     Ipsum, sit molestiae. Dolorem sequi,<span id="read-more" class="more"> nam minus consequuntur placeat labore minima velit.
  //     A quo rerum excepturi voluptatibus obcaecati animi repellat neque quasi. Quasi ex rerum,
  //     minus dignissimos hic ducimus laudantium officiis velit, atque sequi eligendi placeat a labore,
  //     quibusdam aperiam excepturi eveniet.</span>
  // </p>`);

  container.addChild(mainSection);


  // widget footer
  const footerSection = Widget.div('widget-footer-section');
  {
    const footer = new Widget('footer', 'footer-widget');
    footer.setInnerHtml(`
    <p id="footer-content" class="content-footer-widget">
    Copyright &COPY; <span class="company">
    Perspective
    </span> Media
    </p>
    `);
    footerSection.addChild(footer);
  }

  container.addChild(footerSection);


  //Add the container

  body.addChild(container);
}


const TESTING_STRING_CHILDREN = true;
if (TESTING_STRING_CHILDREN) {
  //body.setInnerHtml('');
  //This is a string, widget, string, widget, string example.

  const BLUE_STYLE = {
    'background': 'blue',
    'color': 'black'
  };
  const RED_STYLE = {
    'color': 'black',
    'background': 'red'
  };

  const textTest = new Widget('div');

  const redText = new Widget('span');
  redText.setText('This text is red!');
  redText.setStyle(RED_STYLE);
  redText.setAttr('id', 'ThisIsRed');

  textTest.addChild('This is adding ', redText, ' and ', new Widget('span', {
    id: 'Testing',
    attrs: {
      name: 'testing',
      id: 'OverrideID'
    },
    style: BLUE_STYLE,
    text: 'This is blue text'
  }), ', this is handy for some things... ', new Widget('span', {
    innerHtml: '&times;'
  }));


  body.addChild(textTest);
}



