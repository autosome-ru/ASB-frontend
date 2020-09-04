import {ReleaseModel} from "../../models/releases.model";
// All available releases. First one is the most recent
export const releasesList: ReleaseModel[] = [
    {
        name: "Soos",
        url: "soos",
        date: "22.06.2020",
        recent: true,
        version: "v1.4.7",
        api: 'v1',
        gtrdExpsPath: 'ADASTRA_GTRD_exps.tsv',
        badMapsPath: 'BADmaps.zip'
    },
    {
        name: "Beta",
        url: "beta",
        date: "22.06.2020",
        recent: false,
        version: "v1.5.0",
        api: 'v1',
        gtrdExpsPath: 'ADASTRA_GTRD_exps.tsv',
        badMapsPath: 'BADmaps.zip',
        notes: 'For development usage only.'
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0]
