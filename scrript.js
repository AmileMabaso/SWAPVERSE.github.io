/* ================================
   SWAPVERSE – JS FEATURES
   ================================ */

// ---- Save Sign Up Data ---- //
function signupUser(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const newUser = { fullName, email, password };

    localStorage.setItem("swapverseUser", JSON.stringify(newUser));
    alert("Account created successfully! You may now log in.");

    window.location.href = "login.html";
}

// ---- Login ---- //
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("swapverseUser"));

    if (!savedUser) {
        alert("You don't have an account yet. Please sign up first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        alert("Login successful!");
        window.location.href = "listing.html";
    } else {
        alert("Incorrect email or password.");
    }
}

// ---- Listing Submission ---- //
function submitListing(event) {
    event.preventDefault();

    const type = document.getElementById("listingType").value;
    const title = document.getElementById("listingTitle").value;
    const price = document.getElementById("listingPrice").value;
    const description = document.getElementById("listingDescription").value;

    const newListing = { type, title, price, description };

    let listings = JSON.parse(localStorage.getItem("swapverseListings")) || [];
    listings.push(newListing);

    localStorage.setItem("swapverseListings", JSON.stringify(listings));
    alert("Listing successfully added!");

    // Reset form
    document.getElementById("listingForm").reset();
}

// ---- Display Listings ---- //
function displayListings() {
    const container = document.getElementById("displayArea");

    if (!container) return;

    const listings = JSON.parse(localStorage.getItem("swapverseListings")) || [];

    if (listings.length === 0) {
        container.innerHTML = "<p>No listings yet. Be the first!</p>";
        return;
    }

    container.innerHTML = "";

    listings.forEach(list => {
        container.innerHTML += `
            <div class="card">
                <h3>${list.title}</h3>
                <p><strong>Type:</strong> ${list.type}</p>
                <p><strong>Price:</strong> R${list.price}</p>
                <p>${list.description}</p>
            </div>
        `;
    });
}
