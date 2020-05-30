import React from "react";
import Error from "./Error";

import { TimeboxList, EditableTimebox } from "./remaining-components";

function App() {
    return (
        <div className="App">
            <Error message="Coś nie działa w całej aplikacji">
                <TimeboxList />
                <Error message="Coś nie działa">
                    <EditableTimebox />
                </Error>
            </Error>
        </div>
    )
}

export default App;