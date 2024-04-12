function checkFiles(files) {
    console.log(files);

    if (files.length !== 1) {
        alert("Bitte genau eine Datei hochladen.");
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview Image
    if (file && file.type.startsWith('image')) {
        preview.src = URL.createObjectURL(file);
    } else {
        alert("Bitte ein Bild hochladen.");
        return;
    }

    // Upload
    const formData = new FormData();
    formData.append('0', file); // Ensure you're appending the file correctly

    fetch('/analyze', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.json(); // Parse JSON data from the response
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(data => {
        console.log(data);
        answer.innerHTML = '';
        data.forEach(item => {
            answer.innerHTML += `${item.label} (${item.probability})<br>`; // Display each item as a new line
        });
    }).catch(error => {
        console.log('There has been a problem with your fetch operation:', error);
        alert('Fehler beim Hochladen oder Verarbeiten der Datei.');
    });
}