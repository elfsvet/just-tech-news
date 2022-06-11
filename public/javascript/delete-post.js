async function deleteHandler(event) {
    event.preventDefault();
    // capture the id of post in the url cutting it in parts.
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        // redirect user to dashboard if success
        document.location.replace('/dashboard/');
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteHandler);