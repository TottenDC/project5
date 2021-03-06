const $gallery = $('#gallery');
fetch('https://randomuser.me/api/?results=12&nat=us,nz,gb,au')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    $.each(data.results, function(index, person) {
      let contactHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name-${index}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}</p>
            </div>
        </div>`;
      $gallery.append(contactHTML);
    }); // end $.each
    $('#gallery .card').click(function(event){
      let selIndex = parseInt($(this).find('h3').attr('id').substring(5));
      let selection = data.results[selIndex];
      let dob = selection.dob.date.split('-');
      let location = selection.location;
      let modelHTML = `
      <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${selection.picture.large}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${selection.name.first} ${selection.name.last}</h3>
                  <p class="modal-text">${selection.email}</p>
                  <p class="modal-text cap">${selection.location.city}</p>
                  <hr>
                  <p class="modal-text">${selection.cell}</p>
                  <p class="modal-text cap">${location.street}, ${location.city}, ${location.state} ${location.postcode}</p>
                  <p class="modal-text">Birthday: ${dob[1]}/${dob[2].slice(0, 2)}/${dob[0]}</p>
              </div>
          </div>
        </div>
      `;
      $gallery.append(modelHTML);
      $('#modal-close-btn').click(function() {
        $('.modal-container').remove();
      }); // end btn click
    }); // end click

  });
