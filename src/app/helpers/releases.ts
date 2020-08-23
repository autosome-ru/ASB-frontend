import {ReleaseModel} from "../models/releases.model";
// All available releases. First one is the most recent
export const releasesList: ReleaseModel[] = [
    {
        name: "Soos",
        url: "soos",
        date: "22.06.2020",
        recent: true,
        version: "v1.4.5",
        api: 'v1'
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0]
