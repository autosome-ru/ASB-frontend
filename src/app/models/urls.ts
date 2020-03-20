const serverUrl = "https://9f9715ad.ngrok.io" + "/api/v1";
export const snpsInfoUrl = serverUrl + "/snps";
export const searchOptionsUrl = (tfOrcl: "tf" | "cl") => serverUrl + "/search/" + tfOrcl + "/hint";
export const searchSnpsResultsUrl = serverUrl + "/search/snps";
