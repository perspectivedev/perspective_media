let serviceSection = document.getElementById('services');

const services = [
{
  id: 1,
  title: 'Brand',
  img: 'url(/)',
  desc: 'We develop brand personas that empathize with your client, embodies their needs, and connects them with your brand.',
  prices: '0000.00'
},

{
  id: 2,
  title: 'Rebrand',
  img: 'url(/)',
  desc: 'We start with evaluating your brand message, then we craft personas that embody your client needs, and connects them to your brand.',
  prices: '0000.00'
},

{
  id: 3,
  title: 'Graphic Design',
  img: 'url(/)',
  desc: 'We have skilled artist to craft graphic designs that capture your graphic design ideas, and connect you with the audience you seek.',
  prices: '0000.00',
},

{
  id: 4,
  title: 'Site Maintenance',
  img: 'url(/)',
  desc: 'We have our technicians assess your site, then provide maintenance to boost your site performance, and connect you with your audience.',
  prices: '0000.00'
},

{
  id: 5,
  title: 'Software as a service',
  img: 'url(/)',
  desc: 'We establish what your software needs are, then we develop the software that you want to use to enrich your product.',
  prices: '0000.00',
},
]


// console.log(services.sort(service => `${service.id}`));



function displayServices(items){
  let displayItems = items.map(function(item) {
    return `
    <div id="services" class="services-section">
    <article id=${item.id} class="brand-article">
    
    <h3 class="service-title">${item.title}</h3>
    
    <p class="service-desc">${item.desc}</p>
    
    </article>
    </div>`;
  });
  displayItems = displayItems.join('');
  serviceSection.innerHTML = displayItems;
}

  displayServices(services);