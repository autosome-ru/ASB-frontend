import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change app-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "Soos",
        url: "soos",
        date: "22.06.2020",
        recent: true,
        version: "v1.6.9",
        api: "v1",
        gtrdExpsPath: "ADASTRA_GTRD_exps.tsv",
        badMapsPath: "BADmaps.zip",
        ucscFileName: 'ADASTra_SNPs.soos.bb',
    },
    {
        name: "Ford",
        url: "ford",
        date: "11.02.2020",
        recent: false,
        version: "v2.0.0",
        api: "v2",
        gtrdExpsPath: "ADASTRA_GTRD_exps.tsv",
        badMapsPath: "BADmaps.zip",
        ucscFileName: 'ADASTra_SNPs.soos.bb',
        notes: "Number of experimental data sets increased from 7668 to YY, based on " +
            " GTRD v20.06."
    },
    {
        name: "Beta",
        url: "beta",
        date: "11.02.2020",
        recent: false,
        version: "v2.0.1",
        api: "v2",
        gtrdExpsPath: "ADASTRA_GTRD_exps.tsv",
        badMapsPath: "BADmaps.zip",
        notes: "For development usage only.",
        ucscFileName: 'ADASTra_SNPs.soos.bb',
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0];
