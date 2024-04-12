function fetchDogDetails(id) {
    fetch(`${imageUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((dog) => {
            document.getElementById("card-title").innerText = dog.title;
            document.getElementById("card-image").src = dog.image;

            const heart = document.getElementById("like-button");
            heart.addEventListener("click", () => {
                const dogLikes = document.getElementById("like-count");
                dog.likes += 1;
                dogLikes.innerText = `${dog.likes} likes`;
            });
        })
        .catch(error => {
            console.error('Error fetching dog details:', error);
        });
}

function fetchDogComments() {
    fetch(commentsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comments => {
            const commentsList = document.getElementById("comments-list");
            commentsList.innerHTML = comments.map(comment => `<li>${comment.content}</li>`).join("");
        })
        .catch(error => {
            console.error('Error fetching dog comments:', error);
        });
}

function createNewComment() {
    const commentForm = document.getElementById("comment-form");

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newCommentDescription = document.getElementById("comment").value.trim();

        if (newCommentDescription !== "") {
            const newComment = document.createElement("li");
            newComment.textContent = newCommentDescription;

            appendNewComment(newComment);
            commentForm.reset();

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-button";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                deleteComment(newComment);
            });
            newComment.appendChild(deleteBtn);
        } else {
            alert("Please enter a valid comment.");
        }
    });
}

function appendNewComment(comment) {
    const commentsList = document.getElementById("comments-list");
    commentsList.appendChild(comment);
}

function deleteComment(comment) {
    comment.remove();
}

function getDogImage() {
    const dogTitle = document.getElementById("card-title");
    const dogImage = document.getElementById("card-image");

    dogTitle.addEventListener("click", () => {
        dogImage.style.display = dogImage.style.display === "none" ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchDogDetails(1);
    fetchDogComments();
    createNewComment();
    getDogImage();
});
