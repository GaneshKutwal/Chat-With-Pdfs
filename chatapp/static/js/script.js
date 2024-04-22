async function uploadPDF() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length > 0) {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // File size limit (10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size exceeds the limit (10MB). Please select smaller files.');
                return;
            }

            // Validate file type (PDF)
            if (file.type !== 'application/pdf') {
                alert('Invalid file type. Please select PDF file(s).');
                return;
            }

            formData.append('pdf_files', file);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/upload-pdf', {
                method: 'POST',
                body: formData,
                // Add appropriate headers
                headers: {
                    'Accept': 'application/json',
                    'X-Frame-Options': 'DENY',                    
                    'Content-Security-Policy': "default-src 'self'",
                },
            });

            if (response.ok) {
                alert('PDF(s) uploaded successfully!');
            } else {
                alert('Failed to upload PDF(s). Please try again later.');
            }
        } catch (error) {
            alert('An error occurred while uploading PDF(s). Please try again later.');
        }
    } else {
        alert('Please select PDF file(s) to upload.');
    }
}


async function askQuestion() {
    console.log('askQuestion function called');
    const questionInput = document.getElementById('questionInput');
    const question = questionInput.value;
    if (question) {
        try {
            console.log('Sending request...');
            const response = await fetch('http://127.0.0.1:8000/question-answering', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add appropriate security headers
                    // Example: Content Security Policy
                    'Content-Security-Policy': "default-src 'self'",
                },
                body: JSON.stringify({ question }),
            });

            console.log('Full Response:', response);

            if (response.ok) {
                const data = await response.json();
                console.log('Data:', data);

                const responseText = data.answer;
                console.log('Response Text:', responseText);

                // Display the response on the frontend
                const responseDisplay = document.getElementById('responseDisplay');
                responseDisplay.innerText = responseText;
            } else {
                console.error('Failed to get a valid response.');
                alert('Failed to get a valid response. Please try again later.');
            }
        } catch (error) {
            console.error('Error asking the question:', error);
            alert('An error occurred while processing your request. Please try again later.');
        }
    } else {
        alert('Please enter a question.');
    }
}


