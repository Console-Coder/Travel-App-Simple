import {
    dest,
    travel_date,
    donotsavebtn,
    inputdiv,
    addbtn,
    addedTripsContainer,
    savebtn
} from './vars';
const createCard = (imgUrl, paragraphHTML) => {
    const divElement = document.createElement('div');
    divElement.classList.add('card');
    const image = document.createElement('img');
    image.setAttribute("src", imgUrl);
    if (imgUrl == false) image.setAttribute("alt", "No Image found for your place");;
    image.style.maxWidth = "98%";
    image.style.minWidth = image.style.minHeight = "200px";
    const paragraph = document.createElement('p');
    paragraph.innerHTML = paragraphHTML;
    const removeButton = document.createElement('button');
    removeButton.type = "button";
    removeButton.textContent = "Remove trip";
    removeButton.classList.add('rm-btn');
    removeButton.addEventListener('click', () => {
        divElement.remove()
    });
    const imgdiv = document.createElement('div');
    const otherdiv = document.createElement('div');
    imgdiv.appendChild(image);
    otherdiv.appendChild(paragraph);
    otherdiv.appendChild(removeButton);
    divElement.appendChild(imgdiv);
    divElement.appendChild(otherdiv);

    return divElement;
};
const doNotSave = () => {
    dest.value = travel_date.value = "";
    inputdiv.style.display = "none";
};

async function postThenGetToAddTrip() {
    if (dest.value == "" || travel_date.value == "") {
        alert('Fill all details please!');
        return;
    }
    try {
        const rsltData = await fetch("http://localhost:3000", {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    tripLocale: dest.value,
                    travelDate: travel_date.value
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await rsltData.json().then((objData) => {
            if (objData.error) {
                alert('Server side error, Is your input correct?');
            } else if (!objData.error) {
                addedTripsContainer.appendChild(createCard(objData.imgUrl, objData.weather));
            }
        });
        doNotSave();

    } catch (e) {
        alert('Error getting trip info, Is your input correct? Is the server online?');
        console.log(e);
    }

}

module.exports = {
    createCard,
    doNotSave,
    postThenGetToAddTrip,
    dest,
    travel_date,
    donotsavebtn,
    inputdiv,
    addbtn,
    addedTripsContainer,
    savebtn
};