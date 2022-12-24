

const {
  Widget,
} = require('assets/js/modules/widget.js');

// const helloWorld = new Widget('span');
// helloWorld.setStyle({
//   'font-size': '40px',
//   'color': 'red',
//   'border': '3px solid #333',
// });
// helloWorld.setText('Hello World!');


// widget header
{
  const container = Widget.div('widget-wrapper');
  container.setStyle({
    'border': '3px solid #333',
    'border-radius': '8px',
    'background-color': '#aed8e6',
    'color': '#282973',
    'width': '100%',
    'height': 'auto',
  });
  const headerSection = Widget.div('header-section');
  headerSection.setStyle({
    'background': '#282973',
    'color': '#aed836',
  });

  const header = Widget.div('header-widget');
  header.setInnerHtml(`<h1 class="title">Hello World</h1>`);
  headerSection.addChild(header);

  container.addChild(headerSection);

  Widget.getBody().addChild(container);
}
// widget body
{

} 

// widget footer
{

}

Widget.getBody().addChild();




{/* 
  <div class="widget-main-section">
    <main id="widget-main" class="main-widget">
      <p id="widget-content" class="content-widget">Lorem ipsum dolor,
        sit amet consectetur adipisicing elit. Vitae ab ut minus esse, nulla dolorem earum temporibus dolor!
        Ipsum, sit molestiae. Dolorem sequi,<span id="read-more" class="more"> nam minus consequuntur placeat labore minima velit.
          A quo rerum excepturi voluptatibus obcaecati animi repellat neque quasi. Quasi ex rerum,
          minus dignissimos hic ducimus laudantium officiis velit, atque sequi eligendi placeat a labore,
          quibusdam aperiam excepturi eveniet.</span>
      </p>
    </main>
  </div>
  <div class="widget-footer-section">
    <footer id="widget-footer" class="footer-widget">
      <p id="footer-content" class="content-footer-widget">
        Copyright &COPY; <span class="company">
          Perspective
        </span> Media
      </p>
    </footer>
  </div>
</div> */}
