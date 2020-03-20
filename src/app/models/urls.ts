const serverUrl = "http://localhost:5000" + "/api/v1";
export const snpsInfoUrl = serverUrl + "/snps";
export const searchOptionsUrl = (tfOrcl: "tf" | "cl") => serverUrl + "/search/" + tfOrcl + "/hint";
export const searchSnpsResultsUrl = serverUrl + "/search/snps";
