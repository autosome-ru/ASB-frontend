import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change app-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "Dan",
        url: "dan",
        date: "2021.02.12",
        recent: true,
        version: "v3.0.0",
        api: "v3",
        gtrdExpsPath: "ADASTRA_GTRD_exps.dan.tsv",
        badMapsPath: "BADmaps.dan.zip",
        ucscFileName: 'ADASTRA_SNPs.dan.bb',
        notes: ""
    },
    {
        name: "Ford",
        url: "ford",
        date: "2020.11.02",
        recent: false,
        version: "v2.1.6",
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
        date: "2020.06.22",
        recent: false,
        version: "v1.6.10",
        api: "v1",
        gtrdExpsPath: "ADASTRA_GTRD_exps.soos.tsv",
        badMapsPath: "BADmaps.soos.zip",
        ucscFileName: 'ADASTRA_SNPs.soos.bb',
    },
    {
        name: "Beta",
        url: "beta",
        date: "2021.02.12",
        recent: false,
        version: "v3.1.0",
        api: "v3",
        gtrdExpsPath: "ADASTRA_GTRD_exps.dan.tsv",
        badMapsPath: "BADmaps.dan.zip",
        notes: "For development usage only.",
        ucscFileName: 'ADASTRA_SNPs.dan.bb',
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0];
