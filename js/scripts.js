let contactHTML = '';
fetch('https://randomuser.me/api/?results=12&nat=us,nz,gb,au')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    $.each(data.results, function(index, person) {
      let contactHTMLCard = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>`;
      contactHTML += contactHTMLCard;
    }); // end $.each
    $('#gallery').html(contactHTML);
  });
