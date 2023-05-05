import { createBrowserHistory, createHashHistory } from "history";
import { useEnv } from "@zero-song/hooks";
const { route = {} } = useEnv();
let history;
const { type = "Browser" } = route || {};
if (type && type == "Hash") {
    history = createHashHistory({ window });
}
else {
    history = createBrowserHistory({ window });
}
export { history };
