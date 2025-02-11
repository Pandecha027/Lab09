document.addEventListener("DOMContentLoaded", async () => {
    const postsList = document.getElementById("posts-list");
    const userName = document.getElementById("user-name");
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    if (!userId) return;
    
    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        userName.textContent = user.name;
        
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await postsResponse.json();
        postsList.innerHTML = posts.map(post => `
            <div class="post-item">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="toggle-comments" data-post-id="${post.id}">ดูความคิดเห็น</button>
                <div class="comments" id="comments-${post.id}" style="display: none;"></div>
            </div>
        `).join("");
        
        document.querySelectorAll(".toggle-comments").forEach(button => {
            button.addEventListener("click", async (e) => {
                const postId = e.target.dataset.postId;
                const commentsDiv = document.getElementById(`comments-${postId}`);
                
                if (commentsDiv.style.display === "none") {
                    try {
                        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                        const comments = await commentsResponse.json();
                        commentsDiv.innerHTML = comments.map(comment => `
                            <p><strong>${comment.name}:</strong> ${comment.body}</p>
                        `).join("");
                        commentsDiv.style.display = "block";
                        e.target.textContent = "ซ่อนความคิดเห็น";
                    } catch (error) {
                        console.error("Error fetching comments:", error);
                    }
                } else {
                    commentsDiv.style.display = "none";
                    e.target.textContent = "ดูความคิดเห็น";
                }
            });
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});