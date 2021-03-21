import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change app-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "Dan",
        url: "dan",
        majorVersion: 3,
        date: "2021.02.12",
        recent: true,
        version: "v3.0.0",
        size: '1.54GB',
        api: "v3",
        releaseLink: 'https://disk.yandex.ru/d/UW24pTfb8cPr2Q',
        gtrdExpsPath: "ADASTRA_GTRD_exps.dan.tsv",
        badMapsPath: "BADmaps.dan.zip",
        ucscFileName: 'ADASTRA_SNPs.dan.bb',
        notes: "Number of experimental data sets increased from 7668 to 15931, based on " +
            "GTRD v20.06."
    },
    {
        name: "Soos",
        url: "soos",
        date: "2020.06.22",
        majorVersion: 1,
        recent: false,
        releaseLink: 'https://disk.yandex.ru/d/8iaZCprOYNLQsQ',
        size: '870,5 МБ',
        version: "v1.6.10",
        api: "v1",
        gtrdExpsPath: "ADASTRA_GTRD_exps.soos.tsv",
        badMapsPath: "BADmaps.soos.zip",
        ucscFileName: 'ADASTRA_SNPs.soos.bb',
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0];
