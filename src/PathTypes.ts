import {EPath} from "./EPath";

export enum EPathTypes {
    PRIVATE = "private",
    PUBLIC = "public"
}

const privatePath = [EPath.PROFILE];

export function isCurrentPathPrivate(): boolean {
    return isPrivatePath(window.location.pathname);
}

export function isPrivatePath(path: string): boolean {
    privatePath.forEach(value => {

    })
    return true
}