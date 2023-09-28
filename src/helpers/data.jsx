import firebase from "../components/Firebase";
import { getDatabase, ref, child, push } from "firebase/database";
// global variables
const database = getDatabase(firebase);
const dbRef = ref(database);
const allUserRunsRef = ref(database, `/userRuns`);

// guid = globally unique identifier
let guid = localStorage.getItem("guid");
let userRunsRef;

if (guid) {
  userRunsRef = child(allUserRunsRef, guid);
} else {
  userRunsRef = push(allUserRunsRef);
  localStorage.setItem("guid", userRunsRef.key);
}

export { userRunsRef };
