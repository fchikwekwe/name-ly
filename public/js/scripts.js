const jwt = require('jsonwebtoken');

if (document.querySelector('#edit-user')) {
    document.querySelector('#edit-user').addEventListener('submit', (e) => {
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        const form = document.getElementById('edit-user');
        const user = new FormData(form);

        const decoded = jwt.verify(document.cookie, process.env.SECRET);
        console.log(decoded);
        // Assign the multipart/form-data headers to axios does a proper post
        axios.post(`/users/${decoded._id}/profileUpdate`, user, {
            headers: {
                'Content-Type': 'multipart/form-data;',
            },
        })
            .then((response) => {
                window.location.replace(`/users/${response.data.user._id}`);
            })
            .catch((error) => {
                const alert = document.getElementById('alert');
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving this profile update. Please check your information and try again.';
                alert.style.display = 'block';
                setTimeout(() => {
                    alert.style.display = 'none';
                    alert.classList.remove('alert-warning');
                }, 3000);
            });
    });
} else {
    console.log('What????');
}
