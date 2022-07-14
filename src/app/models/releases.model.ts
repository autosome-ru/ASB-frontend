export interface ReleaseModel {
    name: string;
    date: string;
    url: string;
    version: string;
    majorVersion: number;
    releaseType: 'recent' | 'deprecated' | 'legacy';
    api: string;
    size: string;
    releaseLink: string;
    gtrdExpsPath: string;
    badMapsPath: string;
    ucscFileName: string;
    notes?: string;
    notesPath: string;
    defaultFdrThreshold: string;
    tfClArchive?: string;
}
