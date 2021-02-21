export interface ReleaseModel {
    name: string;
    date: string;
    url: string;
    version: string;
    majorVersion: number;
    recent: boolean;
    api: string;
    gtrdExpsPath: string;
    badMapsPath: string;
    ucscFileName: string;
    notes?: string;
}
