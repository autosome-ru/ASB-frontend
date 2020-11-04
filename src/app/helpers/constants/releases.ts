import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change app-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "Ford",
        url: "ford",
        date: "11.02.2020",
        recent: true,
        version: "v2.1.0",
        api: "v2",
        gtrdExpsPath: "ADASTRA_GTRD_exps.ford.tsv",
        badMapsPath: "BADmaps.ford.zip",
        ucscFileName: 'ADASTRA_SNPs.ford.bb',
        notes: "Number of experimental data sets increased from 7668 to 15931, based on " +
            "GTRD v20.06."
    },
    {
        name: "Soos",
        url: "soos",
        date: "22.06.2020",
        recent: false,
        version: "v1.6.9",
        api: "v1",
        gtrdExpsPath: "ADASTRA_GTRD_exps.soos.tsv",
        badMapsPath: "BADmaps.soos.zip",
        ucscFileName: 'ADASTRA_SNPs.soos.bb',
    },
    {
        name: "Beta",
        url: "beta",
        date: "11.02.2020",
        recent: false,
        version: "v2.1.1",
        api: "v2",
        gtrdExpsPath: "ADASTRA_GTRD_exps.ford.tsv",
        badMapsPath: "BADmaps.ford.zip",
        notes: "For development usage only.",
        ucscFileName: 'ADASTRA_SNPs.ford.bb',
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0];
