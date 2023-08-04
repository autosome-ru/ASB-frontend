import {ReleaseModel} from "../../models/releases.model";
// All available releases. Don't forget to change adastra asb-routing module
export const releasesList: ReleaseModel[] = [
    {
        name: "IceKing",
        url: "IceKing",
        majorVersion: 5,
        date: "2023.06.13",
        releaseType: 'recent',
        version: "v1.0.3",
        size: '800MB',
        api: "v5",
        defaultFdrThreshold: '0.05',
        releaseLink: 'https://disk.yandex.ru/d/8Shsn1-OgDuwzQ',
        gtrdExpsPath: "https://disk.yandex.ru/d/FUZENtbaGaxcrQ",
        badMapsPath: "https://disk.yandex.ru/d/DmTPsMQ_bA9eKQ",
        ucscFileName: 'ADASTRA_SNPs.bill_cipher.bb',
        // notes: "Increased recall of diploid regions. Please find the details in readme.",
        notesPath: 'readme.iceking.txt',
        // tfClArchive: 'adastra.cltf.bill_cipher.zip'
    },
];

export const recentRelease: ReleaseModel = releasesList.filter(s => s.releaseType === 'recent')[0];
export const ananastraRelease: ReleaseModel = recentRelease;  // releasesList.filter(s => s.name === 'Bill Cipher')[0]
