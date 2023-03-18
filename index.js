import {giftData} from './data.js'

const radios = document.getElementById("radios");
const generateBtn = document.getElementById("generate-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.getElementById("modal");
const modalInner = document.getElementById("modal-inner");

radios.addEventListener('click', highlightRadio);
closeBtn.addEventListener('click', closeModal);
generateBtn.addEventListener('click', renderModal);
function closeModal() {
    modal.style.display = "none";
}

function highlightRadio(e) {
    const radios = document.getElementsByClassName("radio");
    for (let radio of radios) {
        radio.classList.remove("highlight");
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function generateGiftArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const checkedRecipient = document.querySelector('input[type="radio"]:checked').value;
        const giftsArray = giftData.filter(function(gift) {
            return gift.recepientTags.includes(checkedRecipient);
        })
        return giftsArray;
    }
}

function selectGiftFromArray() {
    const giftArray = generateGiftArray();
    if (giftArray.length === 1) {
        return giftArray[0];
    } else {
        const randIndex = Math.floor(Math.random() * giftArray.length);
        return giftArray[randIndex];
    }

}
function renderModal() {
    const gift = selectGiftFromArray();
    modalInner.innerHTML = `
            <div class="modal-gift-img">
                <img src="images/${gift.image}" alt="${gift.alt}">
            </div>
            <h3 class="modal-gift-name">${gift.name}</h3>
    `
    modal.style.display = "flex";
}

function getRecipients() {
    let recipients = [];
    for (let gift of giftData) {
        for (let recipient of gift.recepientTags) {
            if(!recipients.includes(recipient)) {
                recipients.push(recipient);
            }
        }
    }
    return recipients;
}

function renderRadios() {
    let radioItems = ``;
    const recipients = getRecipients();
    for (let recipient of recipients) {
        radioItems += `
                <div class="radio">
                    <label for="${recipient}">${recipient}</label>
                    <input type="radio" id="${recipient}" value="${recipient}" name="gift-receiver">
                </div>`
    }
    radios.innerHTML = radioItems;
}

renderRadios();