export interface AsbAppNavigationLink {
    caption: string;
    url: string;
    icon?: string;
}
export interface AsbAppNavigationGroup {
    caption: string;
    children: AsbAppNavigationLink[];
}

export type AsbAppNavigationModel = (AsbAppNavigationLink | AsbAppNavigationGroup)[];
