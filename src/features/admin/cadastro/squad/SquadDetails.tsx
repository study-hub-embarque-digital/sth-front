import React from "react";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import SquadOrganogram from "./components/SquadOrganogram";

export default function SquadDetails() {

    return (
        <>
            <SectionGroup sections={[
                {
                    title: 'Squad',
                    content: <SquadOrganogram />
                }
            ]} />
        </>
    )
}