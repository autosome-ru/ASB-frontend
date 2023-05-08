import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change adastra asb-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "BMO",
        url: "bmo",
        majorVersion: 5,
        date: "2023.05.07",
        releaseType: 'recent',
        version: "v1.0",
        size: '0MB',
        api: "v5",
        defaultFdrThreshold: '0.05',
        releaseLink: 'https://disk.yandex.ru/d/LQYSni42Lk0wtg',
        gtrdExpsPath: "ADASTRA_GTRD_exps.bill_cipher.tsv",
        badMapsPath: "BADmaps.bill_cipher.zip",
        ucscFileName: 'ADASTRA_SNPs.bill_cipher.bb',
        notes: "Increased recall of diploid regions. Please find the details in readme.",
        notesPath: 'readme.bill_cipher.txt',
        tfClArchive: 'adastra.cltf.bill_cipher.zip'
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.releaseType === 'recent')[0];
export const ananastraRelease: ReleaseModel = recentRelease //releasesList.filter(s => s.name === 'Bill Cipher')[0]
