export interface ReleaseModel {
    name: string;
    date: string;
    url: string;
    version: string;
    majorVersion: number;
    recent: boolean;
    api: string;
    size: string;
    releaseLink: string;
    gtrdExpsPath: string;
    badMapsPath: string;
    ucscFileName: string;
    notes?: string;
    notesPath: string;
    defaultFdrThreshold: string;
}
