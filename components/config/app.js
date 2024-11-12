// Verifica si el navegador soporta service workers
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js") // Aquí usas la ruta correcta a tu service worker
      .then(function (registration) {
        console.log("Service worker registration succeeded:", registration);
      })
      .catch(function (error) {
        console.log("Service worker registration failed:", error);
      });
  } else {
    console.log("Service workers are not supported.");
  }
  
  // Aquí puedes continuar con el resto de tu lógica de la interfaz, como mostrar el contenido de cafés o usuarios
  const coffeeContainer = document.getElementById("coffee-container");
  const userContainer = document.getElementById("user-container");
  
  // Array de cafés para mostrar
  const coffees = [
    { name: "Perspiciatis", image: "images/coffee1.jpg" },
    { name: "Voluptatem", image: "images/coffee2.jpg" },
    { name: "Explicabo", image: "images/coffee3.jpg" },
    { name: "Rchitecto", image: "images/coffee4.jpg" },
    { name: "Beatae", image: "images/coffee5.jpg" },
    { name: "Vitae", image: "images/coffee6.jpg" },
    { name: "Inventore", image: "images/coffee7.jpg" },
    { name: "Veritatis", image: "images/coffee8.jpg" },
    { name: "Accusantium", image: "images/coffee9.jpg" },
  ];
  
  // Mostrar cafés
  const showCoffees = () => {
    let output = "";
    coffees.forEach(({ name, image }) => {
      output += `
        <div class="card">
          <img class="card--avatar" src="${image}" />
          <h1 class="card--title">${name}</h1>
          <a class="card--link" href="#">Taste</a>
        </div>
      `;
    });
    coffeeContainer.innerHTML = output; 
  };
  
  // Función para obtener usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users'); 
      const data = await response.json();
  
      // Mostrar los usuarios
      let output = "";
      data.data.forEach(user => {
        output += `
          <div class="card">
            <img class="card--avatar" src="${user.avatar}" />
            <h1 class="card--title">${user.first_name} ${user.last_name}</h1>
            <p>${user.email}</p>
          </div>
        `;
      });
      userContainer.innerHTML = output;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Ejecutar ambas funciones al cargar el DOM
  document.addEventListener("DOMContentLoaded", () => {
    showCoffees(); 
    fetchUsers();  
  });
  
  