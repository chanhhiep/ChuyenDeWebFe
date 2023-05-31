import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
    const [featuredLocation, setFeaturedLocation] = useState("Dong Nai");
    const currentDate = new Date();
    const onNextDate = new Date(new Date().setDate(currentDate.getDate() + 1));

    const defaultFrom = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate()
    };

    const onDefaultTo = {
        year: onNextDate.getFullYear(),
        month: onNextDate.getMonth() + 1,
        day: onNextDate.getDate()
    };

    const defaultRange = {
        from: defaultFrom,
        to: onDefaultTo,
    };

    const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);
    const [selectedDay, setSelectedDay] = useState(defaultFrom);
    const [home, setHome] = useState({
        room: 1,
        adults: 1,
        child: 0
    });

    function onChangePeople(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (value < 0) {
            if (name === "child") {
                value = 0;
            } else {
                value = 1;
            }
        }

        setHome((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function setRoomValue(value) {
        if (value < 1) {
            value = 1;
        }
        setHome((prev) => {
            return {
                ...prev,
                "room": value
            }
        })
    }

    function setAdultsValue(value) {
        if (value < 1) {
            value = 1;
        }
        setHome((prev) => {
            return {
                ...prev,
                "adults": value
            }
        })
    }

    function setChildValue(value) {
        if (value < 0) {
            value = 0;
        }
        setHome((prev) => {
            return {
                ...prev,
                "child": value
            }
        })
    }

    const [showOverlay, setShowOverlay] = useState(false);
    const [country, setCountry] = useState("");

    return (
        <AppContext.Provider value={{
            featuredLocation,
            selectedDayRange,
            selectedDay,
            home,
            setFeaturedLocation,
            setSelectedDayRange,
            setSelectedDay,
            setHome,
            showOverlay,
            setShowOverlay,
            country,
            setCountry,
            onChangePeople,
            setRoomValue,
            setAdultsValue,
            setChildValue
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;