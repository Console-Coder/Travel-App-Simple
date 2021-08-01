import '../sass/styles.scss';
import {
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
} from './funcs';


savebtn.addEventListener('click', postThenGetToAddTrip);
donotsavebtn.addEventListener('click', doNotSave);
addbtn.addEventListener('click', () => {
    inputdiv.style.display = "block"
});

module.exports = {
    dest:dest,
    travel_date:travel_date,
    donotsavebtn:donotsavebtn,
    inputdiv:inputdiv,
    addbtn:addbtn,
    addedTripsContainer:inputdiv,
    savebtn:inputdiv
};