
document.addEventListener('DOMContentLoaded', () => {

    const kontaktFormular = document.getElementById('contactForm');
    const nameEingabe = document.getElementById('nameEingabe');
    const emailEingabe = document.getElementById('emailEingabe');
    const nachrichtEingabe = document.getElementById('nachrichtEingabe');
    const empfaengerNameInput = document.getElementById('empfaengerNameInput'); 
    const sendeButton = document.getElementById('sendeButton');
    const statusMeldung = document.getElementById('statusMeldung');

  
    const azureFunctionUrl = 'https://kheder-contact-func-dev.azurewebsites.net/api/ContactFormFunction';

    
    if (kontaktFormular) {
       
        kontaktFormular.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            sendeButton.disabled = true;
            statusMeldung.textContent = 'Nachricht wird gesendet...';
            statusMeldung.style.color = '#030e12'; 

          
            const formData = {
                recipientsName: empfaengerNameInput.value, 
                name: nameEingabe.value,                 
                email: emailEingabe.value,              
                message: nachrichtEingabe.value          
            };

         
            try {
                const response = await fetch(azureFunctionUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData) 
                });

                
                const responseText = await response.text();

                if (response.ok) { 
                    statusMeldung.textContent = 'Nachricht erfolgreich gesendet! ' + responseText;
                    statusMeldung.style.color = 'green'; 
                    kontaktFormular.reset(); 
                } else { 
                    statusMeldung.textContent = `Fehler beim Senden: ${response.status} (${response.statusText}). Antwort: ${responseText}`;
                    statusMeldung.style.color = 'red'; 
                }

            } catch (error) { 
                console.error('Fehler beim Senden des Formulars:', error);
                
                statusMeldung.textContent = 'Ein Fehler ist aufgetreten (Netzwerk oder Skript). Bitte prüfe die Konsole (F12) oder versuche es später erneut.';
                statusMeldung.style.color = 'red'; 
            } finally { 
                
                sendeButton.disabled = false;
            }
        });
    } else {
     
        console.warn('Kontaktformular mit ID "contactForm" nicht auf dieser Seite gefunden.');
    }
    

});