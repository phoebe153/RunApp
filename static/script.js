const knownRunners = [
    { name: "Eliud Kipchoge", pace: "2:52" },
    { name: "Paula Radcliffe", pace: "3:15" },
    { name: "Kenenisa Bekele", pace: "2:58" },
    { name: "Haile Gebrselassie", pace: "3:01" },
    { name: "Abebe Bikila", pace: "2:44" },
    { name: "Konstanze Klosterhalfen", pace: "3:20" }
  ];
  
  // Hilfsfunktion: Pace (min:ss) in Geschwindigkeit (km/h) umwandeln
  function paceToSpeed(pace) {
    const parts = pace.split(':');
    if(parts.length !== 2) return null;
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);
    if(isNaN(minutes) || isNaN(seconds)) return null;
    const totalMinutes = minutes + seconds / 60;
    if(totalMinutes === 0) return null;
    return 60 / totalMinutes;
  }
  
  // Geschwindigkeit (km/h) in Pace (min:ss) umwandeln
  function speedToPace(speed) {
    if(speed === 0) return null;
    const totalMinutes = 60 / speed;
    const minutes = Math.floor(totalMinutes);
    const seconds = Math.round((totalMinutes - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Läufer auswählen und Pace/Geschwindigkeit setzen
  function selectRunner() {
    const select = document.getElementById('runnerSelect');
    const runnerName = select.value;
    if (!runnerName) return;
  
    const runner = knownRunners.find(r => r.name === runnerName);
    if (!runner) return;
  
    document.getElementById('pace').value = runner.pace;
    const speed = paceToSpeed(runner.pace);
    if (speed !== null) {
      document.getElementById('speed').value = speed.toFixed(2);
    }
  
    calculateStandardDistances();
  }
  
  // Pace und Geschwindigkeit umrechnen (manuelle Eingabe)
  function convert() {
    const paceInput = document.getElementById('pace').value.trim();
    const speedInput = document.getElementById('speed').value.trim();
    let speed;
  
    if(paceInput !== '') {
      speed = paceToSpeed(paceInput);
      if(speed === null) {
        alert("Bitte gib den Pace im Format mm:ss ein.");
        return;
      }
      document.getElementById('speed').value = speed.toFixed(2);
    } else if(speedInput !== '') {
      speed = parseFloat(speedInput);
      if(isNaN(speed) || speed <= 0) {
        alert("Bitte gib eine gültige Geschwindigkeit ein.");
        return;
      }
      const pace = speedToPace(speed);
      document.getElementById('pace').value = pace;
    } else {
      alert("Bitte gib entweder Pace oder Geschwindigkeit ein.");
    }
  }
  
  // Zeit für benutzerdefinierte Strecke berechnen
  function calculateCustomDistance() {
    const distanceInput = document.getElementById('distance').value.trim();
    const speedInput = document.getElementById('speed').value.trim();
  
    if(distanceInput === '' || speedInput === '') {
      alert("Bitte gib eine Strecke und eine Geschwindigkeit ein.");
      return;
    }
  
    const distance = parseFloat(distanceInput);
    const speed = parseFloat(speedInput);
  
    if(isNaN(distance) || distance <= 0) {
      alert("Bitte gib eine gültige Strecke ein.");
      return;
    }
    if(isNaN(speed) || speed <= 0) {
      alert("Bitte gib eine gültige Geschwindigkeit ein.");
      return;
    }
  
    const timeInHours = distance / speed;
    const hours = Math.floor(timeInHours);
    const minutes = Math.floor((timeInHours - hours) * 60);
    const seconds = Math.round((((timeInHours - hours) * 60) - minutes) * 60);
  
    const resultDiv = document.getElementById('customResult');
    resultDiv.innerHTML = `<p>Zeit für ${distance} km: ${hours}h ${minutes}min ${seconds}s</p>`;
  }
  
  // Zeiten für Standardstrecken berechnen
  function calculateStandardDistances() {
    const speedInput = document.getElementById('speed').value.trim();
  
    if(speedInput === '') {
      alert("Bitte gib eine Geschwindigkeit ein.");
      return;
    }
  
    const speed = parseFloat(speedInput);
    if(isNaN(speed) || speed <= 0) {
      alert("Bitte gib eine gültige Geschwindigkeit ein.");
      return;
    }
  
    const standardDistances = [
      { name: "5 km", value: 5 },
      { name: "10 km", value: 10 },
      { name: "Halbmarathon", value: 21.0975 },
      { name: "Marathon", value: 42.195 }
    ];
  
    const standardResults = document.getElementById('standardResults');
    standardResults.innerHTML = "<h3>Zeiten für Standardstrecken:</h3><ul>";
  
    standardDistances.forEach(dist => {
      const timeInHours = dist.value / speed;
      const hours = Math.floor(timeInHours);
      const minutes = Math.floor((timeInHours - hours) * 60);
      const seconds = Math.round((((timeInHours - hours) * 60) - minutes) * 60);
  
      standardResults.innerHTML += `<li>${dist.name}: ${hours}h ${minutes}min ${seconds}s</li>`;
    });
  
    standardResults.innerHTML += "</ul>";
  }