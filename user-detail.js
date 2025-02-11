document.addEventListener("DOMContentLoaded", async () => {
    const userDetail = document.getElementById("user-detail");
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    if (!userId) return;
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();
        userDetail.innerHTML = `
            <h2>${user.name} (${user.username})</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p>Company: ${user.company.name}</p>
            <div class="button-container">
                <button id="view-posts" class="view-posts-btn">ดูโพสต์ทั้งหมด</button>
            </div>
        `;
        
        document.getElementById("view-posts").addEventListener("click", () => {
            window.location.href = `user-posts.html?id=${userId}`;
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
});
