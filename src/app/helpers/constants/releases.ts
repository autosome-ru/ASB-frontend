import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change app-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "Susan",
        url: "susan",
        majorVersion: 3,
        date: "2021.04.11",
        recent: true,
        version: "v3.5.0",
        size: '727.5MB',
        api: "v3",
        releaseLink: 'https://disk.yandex.ru/d/YKOdzHeHFVa0Hw?w=1',
        gtrdExpsPath: "ADASTRA_GTRD_exps.susan.tsv",
        badMapsPath: "BADmaps.susan.zip",
        ucscFileName: 'ADASTRA_SNPs.susan.bb',
        notes: "Number of experimental data sets increased from 7668 to 15931, based on " +
            "GTRD v20.06.",
        notesPath: 'readme.susan.txt',
    },
    {
        name: "Soos",
        url: "soos",
        date: "2020.06.22",
        majorVersion: 1,
        recent: false,
        releaseLink: 'https://disk.yandex.ru/d/8iaZCprOYNLQsQ',
        size: '870,5 МБ',
        version: "v1.6.11",
        api: "v1",
        gtrdExpsPath: "ADASTRA_GTRD_exps.soos.tsv",
        badMapsPath: "BADmaps.soos.zip",
        ucscFileName: 'ADASTRA_SNPs.soos.bb',
        notesPath: 'readme.soos.txt',
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.recent)[0];
