
import { photos } from "./support.js";

const gallery = document.querySelector(".containerGalerie");
const modal = document.querySelector(".photoModal");
const modalImage = document.querySelector(".modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalClose = document.querySelector(".modalClose");

function openModal(photo) {
    modalImage.src = photo.image;
    modalImage.alt = photo.title;
    modalTitle.textContent = photo.title;
    modal.hidden = false;
    document.body.classList.add("modalOpen");
    modalClose.focus();
}

function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modalOpen");
}

photos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "photoCard";
    card.innerHTML = `
        <div class="photoFrame" role="button" tabindex="0" aria-label="Agrandir : ${photo.title}">
            <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            <span class="photoNumber">0${index + 1}</span>
        </div>
        <div class="photoInfo">
            <h2>${photo.title}</h2>
            <p>${photo.description}</p>
        </div>
    `;
    gallery.appendChild(card);

    const photoFrame = card.querySelector(".photoFrame");
    photoFrame.addEventListener("click", () => openModal(photo));
    photoFrame.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(photo);
        }
    });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
        closeModal();
    }
});