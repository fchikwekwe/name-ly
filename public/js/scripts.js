if (document.querySelector('#edit-user')) {
    document.querySelector('#edit-user').addEventListener('submit', (e) => {
        e.preventDefault();
        // Use FormData to grab everything now that we have files mixed in with text
        var form = document.getElementById("edit-user");
        var user = new FormData(form);

        // Assign the multipart/form-data headers to axios does a proper post
        axios.post('/users/update', user, {
            headers: {
                'Content-Type': 'multipart/form-data;',
            }
        })
            .then(function (response) {
                window.location.replace(`/users/${response.data.user._id}`);
            })
            .catch(function (error) {
                const alert = document.getElementById('alert')
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving this profile update. Please check your information and try again.';
                alert.style.display = 'block';
                setTimeout(() => {
                    alert.style.display = 'none';
                    alert.classList.remove('alert-warning');
                }, 3000)
            });
    });
}
