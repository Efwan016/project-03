import local from "./local";
import remote from "./remote";

// Toggle this to switch data source
const useRemote = false;

const api = useRemote ? remote : local;
export default api;
