import {environment} from "../../environments/environment";

const serverUrl = "" + "api/v1";
export const snpsInfoUrl = serverUrl + "/snps";
export const searchOptionsUrl = (tfOrcl: "tf" | "cl") => serverUrl + "/search/" + tfOrcl + "/hint";
export const searchSnpsResultsUrl = serverUrl + "/search/snps";
