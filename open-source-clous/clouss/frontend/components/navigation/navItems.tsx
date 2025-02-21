"use client";

import ActionTooltip from "../actions/action-tooltip";


interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
};

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    return (
        <ActionTooltip
        side="right"
        align="center"
        label={name}
        >

        </ActionTooltip>
    )
}