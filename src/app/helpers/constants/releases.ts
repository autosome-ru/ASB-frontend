import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change app-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "Soos",
        url: "soos",
        date: "22.06.2020",
        recent: true,
        version: "v1.6.8",
        api: "v1",
        gtrdExpsPath: "ADASTRA_GTRD_exps.tsv",
        badMapsPath: "BADmaps.zip"
    },
    {
        name: "Beta",
        url: "beta",
        date: "22.06.2020",
        recent: false,
        version: "v2.0.0",
        api: "v2",
        gtrdExpsPath: "ADASTRA_GTRD_exps.tsv",
        badMapsPath: "BADmaps.zip",
        notes: "For development usage only."
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0];
