
import { v4 as uuidv4 } from 'uuid';

function wait(ms = 1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}
const timeboxes = [
    { "id": 1, "title": "Uczę się o promises", "totalTimeInMinutes": 25 },
    { "id": 2, "title": "Poznaję REST API", "totalTimeInMinutes": 10 },
    { "id": 3, "title": "Ćwiczę async/await", "totalTimeInMinutes": 15 },
    { "id": 4, "title": "Uczę się fetch", "totalTimeInMinutes": 5 }
];
function findIndexByAnId(id) {
    const result = timeboxes.findIndex((timebox) => timebox.id === id)
    if (result < 0) {
        throw new Error("Timebox o podanym id nie istnieje");
    }

    return result;
}
const FakeTimeboxesAPI = {
    getAllTimeboxes: async function () {
        await wait(1000);
        console.log("GET all", timeboxes);
        return [...timeboxes];
    },
    addTimebox: async function (timeboxToAdd) {
        await wait(1000);
        const addedTimebox = { ...timeboxToAdd, id: uuidv4() };
        timeboxes.push(addedTimebox);
        console.log("POST", timeboxes);
        return addedTimebox;
    },

    replaceTimebox: async function (timeboxToReplace) {
        await wait(1000);
        if (!timeboxToReplace.id) {
            throw new Error("Cannot replace timebox without an id.")
        }
        const index = findIndexByAnId(timeboxToReplace.id);
        const replacedTimebox = { ...timeboxToReplace };
        console.log("PUT", timeboxes);
        timeboxes[index] = replacedTimebox;
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
        await wait(1000);
        if (!timeboxToRemove.id) {
            throw new Error("Cannot remove timebox without an id.")
        }
        const index = findIndexByAnId(timeboxToRemove.id)
        timeboxes.splice(index, 1);
        console.log("DELETE", timeboxes);
    }
}

export default FakeTimeboxesAPI;