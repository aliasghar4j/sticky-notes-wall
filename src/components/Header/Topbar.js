import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'

export default function Topbar() {
    const [time, setTime] = useState();
    useEffect(() => {
        setInterval(
            () => {
                setTime(dayjs().format("MMMM DD YYYY hh:mm:ss A"));
            }, 1000
        )
    }, [])

    return (
        <header>
            <p className="text-center mb-0 bg-info py-1">
                {time}
            </p>
        </header>
    )
}
