fetch('https://randomuser.me/api/?results=12&nat=us,nz,gb,au')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
