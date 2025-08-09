import { App } from "../../@types/apps/app";
import actions from "./actions";

const googleSheetsApp: App = {
    key: "GOOGLE_SHEETS",
    name: "Google Sheets",
    actions,
};

export default googleSheetsApp;
