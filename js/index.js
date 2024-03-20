/* 
upon the page loading, show the first 50 monsters.
each monster should be shown with: name, age, and description.
a create monster button, when clicked the monster should be added to the list and saved in the api
at the end of the 50 monsters show a button, when clicked the button will load the next 50 monsters

*/
document.addEventListener('DOMContentLoaded', function() {
    const monsterContainer = document.getElementById('monster-container');
    const createMonsterForm = document.getElementById('new-monster');
    const createMonsterButton = document.getElementById('button');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    let page = 1;
  
    // Function to fetch monsters from the API
    function fetchMonsters() {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=50`)
        .then(response => response.json())
        .then(monsters => {

          monsterData = monsters;

          monsters.forEach(monster => {
            displayMonster(monster);
          });
        });
    }
  
    // Function to display a single monster
    function displayMonster(monster) {
      const monsterDiv = document.createElement('div');
      monsterDiv.innerHTML = `
        <h3>${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterDiv);
    }
  
    // Function to handle form submission and create a new monster
    createMonsterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const newName = document.getElementById('new-name').value;
      const newAge = document.getElementById('new-age').value;
      const newDescription = document.getElementById('new-description').value;
  
      const newMonster = {
        name: newName,
        age: newAge,
        description: newDescription
      };
  
      // You'll need to implement the logic to save the new monster to the API
      // This is just a placeholder
      fetch('http://localhost:3000/monsters', {
        method: "POST",
        body: JSON.stringify(newMonster),
        headers: {
          "content-type": "application/json",
          Accept: "application/json"
        }
      })
      .then((response) => response.json())

      
  
      displayMonster(newMonster);
  
      createMonsterForm.reset();
    });
  
    // Function to load the next 50 monsters
    forwardButton.addEventListener('click', function() {
      page++;
      monsterContainer.innerHTML = ''; // Clear previous monsters
      fetchMonsters();
    });
  
    // Function to load the previous 50 monsters (if any)
    backButton.addEventListener('click', function() {
      if (page > 1) {
        page--;
        monsterContainer.innerHTML = ''; // Clear previous monsters
        fetchMonsters();
      }
    });
  
    // Initial loading of monsters
    fetchMonsters();
  });
  