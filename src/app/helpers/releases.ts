import {ReleaseModel} from "../models/releases.model";
// All available releases. First one is the most recent
export const releasesList: ReleaseModel[] = [
    {
        name: "Soos",
        url: "soos",
        date: "22.06.2020",
        recent: true,
        version: "v1.4.6",
        api: 'v1'
    },
    {
        name: "Test",
        url: "test",
        date: "22.06.2020",
        recent: false,
        version: "v1.5.0 beta",
        api: 'v1'
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0]
